export interface ReviewRoot {
  message: string
  allReviews: AllReview[]
  review:AllReview
}

export interface AllReview {
  id: number
  user_id: number
  seller_id: number
  rating: number
  comment: string
  created_at: string
  updated_at: string
  deleted_at: any
}
