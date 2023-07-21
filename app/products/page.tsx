"use client"

import { getListProvince } from '@/services/frontend-services'
import React, { useEffect, useState } from 'react'
import Card from '../components/card'
import { IDataProducts, products } from '@/dummy-data/products'
import Modal from '../components/modal'
import Header from '../components/header'
import Button from '../components/button'
import { useStoreContext } from '@/store'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'

export default function Products() {
  const storeContext = useStoreContext()
  const router = useRouter()

  const [visible, setVisible] = useState(false)
  const [typeModal, setTypeModal] = useState<'address' | 'invoice'>('address')
  const [titleModal, setTitleModal] = useState<'Set Address' | 'Bill'>('Set Address')
  const [selectedProduct, setSelectedProduct] = useState<IDataProducts[]>([])

  const init = async () => {
    const { data } = await getListProvince()
    storeContext.dispatch({
      dataProvince: data.rajaongkir.results
    })
  }

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    if (!storeContext.state.isLogin) {
      router.push('/login')
    }
  }, [storeContext.state.isLogin])

  const handleClick = (id: number) => {
    if (!storeContext.state.selectedProvince) {
      Swal.fire({
        title: 'Error!',
        text: 'Anda belum memilih provinsi',
        icon: 'error',
        confirmButtonText: 'Close'
      })
    } else if (!storeContext.state.selectedCity) {
      Swal.fire({
        title: 'Error!',
        text: 'Anda belum memilih kota',
        icon: 'error',
        confirmButtonText: 'Close'
      })
    } else {
      setSelectedProduct(products.filter((x) => x.id === id))
      setTypeModal('invoice')
      setTitleModal('Bill')
      setVisible(true)
    }
  }

  const openModalAddress = () => {
    setTypeModal('address')
    setTitleModal('Set Address')
    setVisible(true)
  }

  return (
    <div className='mx-auto max-w-xxl h-screen'>
      <Header />
      <div className='flex flex-row justify-between my-8 px-10 flex-wrap gap-3'>
        <p className='font-extrabold text-xl mb-2'>
          Products Grid
        </p>
        <div>
          <Button
            onClick={openModalAddress}
            type='button'
            text='Set Address'
            className=' bg-blue-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-[220px]'
          />
        </div>
      </div>
      <div className='flex flex-row gap-3 flex-wrap justify-around'>
        {
          products.map(({ nama, imgSrc, id }, idx) => (
            <Card
              title={nama}
              imgSrc={imgSrc}
              key={idx}
              handleClick={handleClick}
              id={id}
            />
            ))
          }
      </div>
      <Modal
        visible={visible}
        setVisible={setVisible}
        typeModal={typeModal}
        titleModal={titleModal}
        selectedProduct={selectedProduct[0]}
      />
    </div>
  )
}
