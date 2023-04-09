export interface SubscriptionProductResponse {
    data: SubscriptionProduct[]
}


export interface SubscriptionProduct {
    id: number,
    title: string
    description: string | null
    price: string
    duration: string
    durationISO: string
    createdAt: string
    updatedAt: string
}