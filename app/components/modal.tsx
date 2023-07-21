import { IDataProducts, products } from "@/dummy-data/products";
import { ResultCost } from "@/interface";
import { getListCity, postPriceCourier } from "@/services/frontend-services";
import { useStoreContext } from "@/store";
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import Select, { SingleValue } from 'react-select';
import Swal from "sweetalert2";

interface IModal {
  setVisible: Dispatch<SetStateAction<boolean>>
  visible: boolean,
  typeModal: 'address' | 'invoice',
  titleModal: 'Set Address' | 'Bill',
  selectedProduct: IDataProducts
}

interface IDataProvince {
  label: string,
  value: string
}

interface NewCourier extends ResultCost {
  label: string,
  value: string
}

const Modal:FC<IModal> = ({ setVisible, visible, titleModal, typeModal, selectedProduct }) => {
  const storeContext = useStoreContext()

  const [dataProvince, setDataProvince] = useState<Array<IDataProvince>>([])
  const [dataCity, setDataCity] = useState<Array<IDataProvince>>([])
  const [selectedProvince, setSelectedProvince] = useState<Partial<IDataProvince>>({})
  const [selectedCity, setSelectedCity] = useState<Partial<IDataProvince>>({})
  const [dataCourier, setDataCourier] = useState<Array<NewCourier>>([])
  const [priceOngkir, setPriceOngkir] = useState(0)
  const [selectedCourier, setSelectedCourier] = useState<NewCourier>()

  const handleSelectedProvince = (selectedOption: SingleValue<IDataProvince>) => {
    setSelectedProvince(selectedOption as IDataProvince)
    storeContext.dispatch({
      selectedProvince: selectedOption?.value ?? ''
    })
  }

  const handleSelectedCity = (selectedOption: SingleValue<IDataProvince>) => {
    setSelectedCity(selectedOption as IDataProvince)
    storeContext.dispatch({
      selectedCity: selectedOption?.value ?? ''
    })
  }

  const handleSelectCourier = (selectedOption: SingleValue<NewCourier>) => {
    setPriceOngkir(selectedOption?.cost[0].value as number)
    setSelectedCourier(selectedOption as NewCourier)
  }

  const getCity = async () => {
    try {
      const { data } = await getListCity(selectedProvince.value as string)
      const temp = data.rajaongkir.results.map(x => ({
        label: x.city_name,
        value: x.city_id
      }))
      setDataCity(temp)
    } catch (err) {
      console.log(err, 'ini err')
    }
  };

  useEffect(() => {
    const temp:IDataProvince[] = storeContext.state.dataProvince.map((x) => {
      return {
        value: x.province_id,
        label: x.province
      }
    })

    setDataProvince(temp)
    
  }, [storeContext.state.dataProvince])

  useEffect(() => {
    if(selectedProvince && Object.keys(selectedProvince).length > 0) {
      getCity()
    }
  }, [selectedProvince])

  const getCost = async () => {
    const { data } = await postPriceCourier({
      courier: 'jne',
      destination: storeContext.state.selectedCity as string,
      origin: selectedProduct.city_id,
      weight: selectedProduct.berat
    })
    if (data.rajaongkir.results.length > 0) {
      const temp = data.rajaongkir.results[0].costs.map((dataMap) => {
        return {
          ...dataMap,
          label: `${dataMap.description}-${dataMap.service}`,
          value: dataMap.service
        }
      })
      setDataCourier(temp)
    }
    data.rajaongkir.results
  }

  useEffect(() => {
    if (typeModal === 'invoice' && storeContext.state.selectedCity && storeContext.state.selectedProvince) {
      getCost()
    }
  }, [storeContext.state.selectedCity, storeContext.state.selectedProvince, typeModal])

  const handleBuyNow = () => {
    if (!selectedCourier) {
      Swal.fire({
        title: 'Error!',
        text: 'Anda belum memilih courier',
        icon: 'error',
        confirmButtonText: 'Close'
      })
    } else {
      Swal.fire({
        title: 'Success!',
        text: 'Selamat Berhasil Membeli Barang!',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
      setVisible(false)
    }
  }

  return (
    <>
      {visible ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {titleModal}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setVisible(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto min-w-[500px]">
                  {
                    typeModal === 'address' ? 
                      <div className="my-4 text-slate-500 text-lg leading-relaxed w-[300px]">
                        <div className="mt-5">
                          <label>Select Province</label>
                          <Select
                            value={selectedProvince}
                            onChange={(x) => handleSelectedProvince(x as SingleValue<IDataProvince>)}
                            options={dataProvince}
                          />
                        </div>
                        <div className="mt-5">
                          <label>Select City</label>
                          <Select
                            value={selectedCity}
                            onChange={(x) => handleSelectedCity(x as SingleValue<IDataProvince>)}
                            options={dataCity}
                          />
                        </div>
                      </div>
                    :
                    <div className="flex flex-col">
                      <div className="flex flex-row justify-between">
                        <p>Nama</p>
                        <p>{selectedProduct?.nama}</p>
                      </div>
                      <div className="flex flex-row justify-between">
                        <p>Weight</p>
                        <p>{selectedProduct?.berat}kg</p>
                      </div>
                      <div className="flex flex-row justify-between">
                        <p>Price</p>
                        <p>Rp{selectedProduct?.price.toLocaleString('id-ID')}</p>
                      </div>
                      <div className="flex flex-row justify-between">
                        <p>Price Ongkir</p>
                        <p>Rp{priceOngkir.toLocaleString('id-ID')}</p>
                      </div>
                      <div className="flex flex-row justify-between mt-5">
                        <p>Total Price</p>
                        <p>Rp{(priceOngkir + selectedProduct?.price).toLocaleString('id-ID')}</p>
                      </div>

                      <div className="mt-5">
                        <label>Select Courier</label>
                        <Select
                          value={selectedCourier}
                          onChange={handleSelectCourier}
                          options={dataCourier}
                        />
                      </div>
                    </div>
                  }
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setVisible(false)}
                  >
                    Close
                  </button>
                  {
                    typeModal === 'invoice' &&
                    <button
                      className="text-white rounded-md bg-blue-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </button>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default Modal;
