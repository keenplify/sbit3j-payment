import { Client } from '@/types/client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AuthStore {
    token?: string
    client?: Client
    setAuth: (token: string, client: Client) => void
}

export const useAuthStore = create(
    persist<AuthStore>(
      (set) => ({
        setAuth: (token, client) =>  set((v) => ({
            ...v,
            token,
            client,
        }))
      }),
      {
        name: 'sbit3j-payment-auth',
      }
    )
  )