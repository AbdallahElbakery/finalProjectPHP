export type Root = Category[]
export interface CategoryRoot {
  categories: Category[]
  category: Category
}
export interface Category {
  id: number
  category_name: string
  created_at: string
  updated_at: string
  deleted_at: any
}
