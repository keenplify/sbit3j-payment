import { Model } from "@/types/general"

export interface Client extends Model {
    "firstName": string,
    "middleName": string,
    "lastName": string,
    "email": string,
    "phone": string,
    "line1": string,
    "line2": string,
    "city": string,
    "state": string,
    "postalCode": string,
}

export interface BackendAccess {
    type: 'bearer'
    token: string
}