'use client'

import { createContext, useContext, useState } from 'react'

export type CartItemType = {
  cartItemId: string
  id: number
  title: string
  quantity: number
  totalPrice: number
  selectedOption: string
  src: string
}

type AppContextType = {
  cart: CartItemType[]
  setCart: (cart: CartItemType[]) => void
}

const AppContext = createContext<AppContextType | null>(null)
export const useAppContext = () => {
  const value = useContext(AppContext)
  if (value == null)
    throw new Error('AppContext must be used within AppContextProvider')

  return value
}

type AppContextProviderProps = {
  children: React.ReactNode
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [cart, setCart] = useState<CartItemType[]>([])

  return (
    <AppContext.Provider value={{ cart, setCart }}>
      {children}
    </AppContext.Provider>
  )
}
