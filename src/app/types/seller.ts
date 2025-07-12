export interface Root {
  Message: string
  Seller: Seller
}

export interface Seller {
  seller_data: SellerData[]
  password: string
  newPass:string
  confirmPassword:string
  company_name: string
  about_company: any
  logo: string
  personal_id_image: string
  status: string
  created_at: string
  own_properties: OwnProperty[]
}

export interface SellerData {
  id: number
  name: string
  email: string
  email_verified_at: string
  phone: string
  role: string
  photo: string
  created_at: string
  updated_at: string
  deleted_at: string
  address_id: number
}

export interface OwnProperty {
  id: number
  name: string
  description: string
  price: string
  citynum: string
  purpose: string
  area: number
  bedrooms: number
  bathrooms: number
  date: string
  category: string
  seller: Seller2
  address_id: number
  country: string
  city: string
  location: string
  image: string
  images: string[]
}

export interface Seller2 {
  user_id: number
  name: string
  email: string
  phone: string
  role: string
  photo: string
  company_name: string
  logo: string
  status: string
  created_at: string
}
