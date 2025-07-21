export interface ProfileRoot {
  message: string
  profile: Profile
}

export interface Profile {
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
