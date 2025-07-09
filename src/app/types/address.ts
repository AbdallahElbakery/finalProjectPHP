export type Root = Address[]

export interface Address {
    id: number
    country: string
    city: string
    postal_code?: string
    street?: string
    full_address: string
    created_at: string
    updated_at: string
    deleted_at: any
    image: any
}
