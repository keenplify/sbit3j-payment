import { SubscriptionProduct } from './subscription-product'

export interface SubscriptionResponse {
    data: Subscription[]
}

export interface Subscription {
    id: number
    paymentDate?: string
    paymentReceived?: string 
    startAt: string // Start
    endAt: string // End
    clientId: number
    createdAt: string
    updatedAt: string
    isActive: boolean
    subscriptionProduct: SubscriptionProduct
    subscriptionProductId: number
}

export interface SubscriptionInitializeResponse {
    data: Subscription
    redirect_url?: string
}