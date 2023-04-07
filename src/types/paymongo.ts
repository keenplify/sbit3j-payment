  export interface PaymongoPaymentMethodResponse {
   data: {
    id: string
    type: string
    attributes: {
        livemode: boolean
        type: string
        billing: {
            address: {
                city: string
                country: string
                line1: string
                line2: string
                postal_code: string
                state: string
              }
            email: string
            name: string
            phone: string
          }
        created_at: number
        updated_at: number
        details?: {
            exp_month: number
            exp_year: number
            last4: string
        } |  null
        metadata: any
    }
   }
  }