import { Product } from "./Product";

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
  productPrices: Pick<Product, "id" | "price">[],
}
