export interface RootBooking {
    message: string
    allBookings: AllBooking[]
    booking: AllBooking
}

export interface AllBooking {
    user: string
    property: string
    suggested_price: string
    status: string
    created: string
    updated: string
}
