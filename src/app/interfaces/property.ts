export interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  city: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  description: string;
  date: string; 
  seller: Seller;
  gallery: string[]; 
  attributes: Record<string, any>; 
}

export interface Seller {
  id: number;
  name: string;
  company: string;
  image: string;
  rating: number;
}