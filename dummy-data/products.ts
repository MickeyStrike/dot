export interface IDataProducts {
  id: number,
  nama: string,
  berat: number,
  imgSrc: string,
  price: number,
  city_id: string,
  province_id: string
}

export const products:Array<IDataProducts> = [
  {
    id: 1,
    nama: 'Iphone 14 Pro Max',
    berat: 1,
    imgSrc: '/image/iphone_14_pro_max.png',
    price: 21000000,
    city_id: "151", // jakpus
    province_id: "6" // jakarta
  },
  {
    id: 2,
    nama: 'Samsung S23 Ultra',
    berat: 1,
    imgSrc: '/image/samsung_s23_ultra.png',
    price: 17000000,
    city_id: "151", // jakpus
    province_id: "6" // jakarta
  },
  {
    id: 3,
    nama: 'Samsung Galaxy Z Flip 4',
    berat: 1,
    imgSrc: '/image/samsung_galaxy_z_flip_4.webp',
    price: 12000000,
    city_id: "151", // jakpus
    province_id: "6" // jakarta
  },
  {
    id: 4,
    nama: 'Asus Rog Phone 5',
    berat: 1,
    imgSrc: '/image/asus_rog_phone_5.jpeg',
    price: 15000000,
    city_id: "151", // jakpus
    province_id: "6" // jakarta
  },
  {
    id: 5,
    nama: 'Xiaomi Black Shark 3 Pro',
    berat: 1,
    imgSrc: '/image/xiaomi_black_shark_3_pro.jpeg',
    price: 10000000,
    city_id: "151", // jakpus
    province_id: "6" // jakarta
  },
  {
    id: 6,
    nama: 'Lenovo Legion Phone',
    berat: 1,
    imgSrc: '/image/lenovo_legion_phone.png',
    price: 6000000,
    city_id: "151", // jakpus
    province_id: "6" // jakarta
  },
]

