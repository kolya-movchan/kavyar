import { ProductForAPI, ProductOldfromAPI } from "./Product";

export interface CFPlist {
  id: number,
  isDisable: boolean,
  title: string,
  open: {
    hour: number,
    minute: number,
    second?: number,
    nano?: number,
  },
  close: {
    hour: number,
    minute: number,
    second?: number,
    nano?: number,
  },
  location?: string,
  logo: string
}

export interface CFP {
  hasNextPage?: boolean,
  coffeeShops: CFPlist[],
}

export interface CFPforPOST {
  cityId: number,
  title: string,
  description: string,
  phone: string,
  open: string,
  close: string,
  url: string,
  logo: {url: string},
  photo: {url: string},
  location: string,
  features: number[],
  productPrices: {productId: number, price: number}[],
}

export interface CFPforEDIT {
  title: string,
  id: number,
  city: {id: number, name: string},
  isDisable: boolean,
  photo: {id: number, url: string},
  url: string,
  description: string,
  open: string,
  close: string,
  features: {id: number, name: string, description: string}[],
  location: string,
  phone: string,
  logo: {id: number, url: string},
  productPrices: {
    id: number,
    price: number,
    product:{
      id: number,
      name: string,
      description: string,
      category: {id: number, name: string}
    }}[]
}

export interface CFPforUpdate {
  coffeeShopId: number,
  cityId: number,
  title: string,
  description: string,
  phone: string,
  open: string,
  close: string,
  url: string,
  logo: {id: number, url: string},
  photo: {id: number, url: string},
  location: string,
  features: number[],
  productPrices: ProductOldfromAPI[],
  newProductPrices: ProductForAPI[]
}
