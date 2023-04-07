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

title : string // Type
price : string // Price
isActive : boolean // Status
}
