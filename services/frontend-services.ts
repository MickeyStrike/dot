import { DataForm } from "@/app/login/page";
import { ReponseLogin, RequestPriceCourier, ResponseListCity, ResponseListProvince, ResponsePriceCourier } from "@/interface";
import axios from "axios";

const url = 'http://localhost:3000/'
// const url = 'https://dot-beryl.vercel.app/'

export const postLogin = (payload: DataForm) => axios.post<ReponseLogin>(url + 'api/login', payload)
export const getListProvince = () => axios.get<ResponseListProvince>(url + 'api/list-province')
export const getListCity = (id: string) => axios.get<ResponseListCity>(url + `api/list-city/${id}`)
export const postPriceCourier = (payload: RequestPriceCourier) => axios.post<ResponsePriceCourier>(url + 'api/price-courier', payload)
