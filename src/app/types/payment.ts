export interface PaymentRoot {
  message: string
  payments: Payment[]
  payment: Payment
}

export interface Payment {
  id: number
  payment_id: string
  property_id: string
  property: string
  quantity: string
  amount: string
  payer_name: string
  payment_status: string
  payer_email: string
  payment_method: string
  date: string
  updated_at: string
}
