
export interface PropertyRoot {
  message: string
  data: Property[]
  properties: Property[]
  Property: Property []
}
export interface PropertyRot {
  Property: Property
}

export interface Property {
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
  seller: Seller
  country: string
  city: string
  location: string
  image: string
  payment_method: string
  updated: string
  status: string
  images: string[]
}

export interface Seller {
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

///////////////////////
