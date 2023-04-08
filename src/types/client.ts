import { Model } from "@/types/general"

export interface Client extends Model {
    "firstName": string,
    "middleName": string,
    "lastName": string,
    "email": string,
    "phone": string,
}

export interface BackendAccess {
    type: 'bearer'
    token: string
}