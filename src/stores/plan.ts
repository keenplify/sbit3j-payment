import { Client } from '@/types/client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface PlanStore {
    selectedId?: number
    setSelectedId: (id: number) => void
}

export const usePlanStore = create(
    persist<PlanStore>(
      (set) => ({
        setSelectedId: (id) =>  set((v) => ({
            selectedId: id,
            ...v
        }))
      }),
      {
        name: 'sbit3j-plan'
      }
    )
  )