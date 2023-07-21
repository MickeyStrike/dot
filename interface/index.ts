export interface ReponseLogin {
  code:    string;
  message: string;
  status: number
}

export interface ResponseListProvince {
  rajaongkir: Rajaongkir;
}

export interface Rajaongkir {
  query:   any[];
  status:  Status;
  results: Result[];
}

export interface Result {
  province_id: string;
  province:    string;
}

export interface Status {
  code:        number;
  description: string;
}



export interface ResponseListCity {
  rajaongkir: RajaongkirCity;
}

export interface RajaongkirCity {
  query:   Query;
  status:  Status;
  results: ResultsCity[];
}

export interface Query {
  id:       string;
  province: string;
}

export interface ResultsCity {
  city_id:     string;
  province_id: string;
  province:    string;
  type:        string;
  city_name:   string;
  postal_code: string;
}

export interface StatusCity {
  code:        number;
  description: string;
}


export interface ResponsePriceCourier {
  rajaongkir: RajaongkirPriceCourier;
}

export interface RajaongkirPriceCourier {
  query:               QueryPriceCourier;
  status:              StatusPriceCourier;
  origin_details:      NDetailsPriceCourier;
  destination_details: NDetailsPriceCourier;
  results:             ResultPriceCourier[];
}

export interface NDetailsPriceCourier {
  city_id:     string;
  province_id: string;
  province:    string;
  type:        string;
  city_name:   string;
  postal_code: string;
}

export interface QueryPriceCourier {
  origin:      string;
  destination: string;
  weight:      number;
  courier:     string;
  key:         string;
}

export interface ResultPriceCourier {
  code:  string;
  name:  string;
  costs: ResultCost[];
}

export interface ResultCost {
  service:     string;
  description: string;
  cost:        CostCost[];
}

export interface CostCost {
  value: number;
  etd:   string;
  note:  string;
}

export interface StatusPriceCourier {
  code:        number;
  description: string;
}

export interface RequestPriceCourier {
  origin: string,
  destination: string,
  weight: number,
  courier: string
}