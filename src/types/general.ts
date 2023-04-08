export interface Model {
    /**
     * Unique ID of the model
     */
    id: number
    /**
     * ISO8601 date
     */
    createdAt: string
    /**
     * ISO8601 date
     */
    updatedAt: string
}

export type ResponseTypes = 'auth' | 'general'

export interface Response<T, Type extends ResponseTypes = 'general'> {
    data: T
    /**
     * Access only shows at auth endpoints
     */
    access: Type extends 'auth' ? Access : never
}

export interface Access {
    type: 'bearer'
    token: string
}