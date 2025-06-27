export type Root = Property[]

export interface Property {
  id: number
  title: string
  price: number
  location: string
  city: string
  type: string
  status: string
  purpose: string
  bedrooms: number
  bathrooms: number
  area: number
  image: string
  description: string
  date: string
  seller: Seller
  gallery: any[]
  attributes: Attributes
}

export interface Seller {
  id: number
  name: string
  company: string
  image: string
  rating: number
}

export interface Attributes {
  pool?: boolean
  garage?: boolean
  furnished?: boolean
  sea_view?: boolean
  gated_community?: boolean
  rooftop?: boolean
  parking?: boolean
  private_beach?: boolean
  near_schools?: boolean
  clubhouse?: boolean
  garden?: boolean
  near_amenities?: boolean
}
