import { Result, ResultsCity } from "../interface"

export interface GlobalStateType {
  dataProvince: Result[]
  dataCity: ResultsCity[],
  selectedProvince: string,
  selectedCity: string,
  isLogin: boolean
}

// DEFAULT VALUE GLOBAL STATE
export const globalState: GlobalStateType = {
	dataProvince: [],
  dataCity: [],
  selectedProvince: '',
  selectedCity: '',
  isLogin: false
}
