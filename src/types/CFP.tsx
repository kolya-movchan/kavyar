export interface CFP {
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
