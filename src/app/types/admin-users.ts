export interface Root {
  allUsers: AllUser[]
    user: User

}

export interface User {
  id: number
  name: string
  email: string
  phone: string
  photo: string
  role: string
  date: string
  updated: string
  address: Address
  address_id?: number
}
export interface AllUser {
  id: number
  name: string
  email: string
  phone: string
  photo: string
  role: string
  date: string
  updated: string
  address: Address
}

export interface Address {
  city: string
  country: string
}
