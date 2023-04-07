export interface SubscriptionResponse {
    data: Subscription[]
}

export interface Subscription {
id: number
paymentDate?: string
paymentReceived?: string
startAt: string
endAt: string
clientId: number
createdAt: string
updatedAt: string
}
