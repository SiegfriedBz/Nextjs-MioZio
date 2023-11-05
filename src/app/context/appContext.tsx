'use client'

import { createContext, useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export type CartItemType = {
  cartItemId: string
  id: string
  name: string
  quantity: number
  totalPrice: number
  selectedOption: string
  img: string
}

type AppContextType = {
  cart: CartItemType[]
  setCart: (cart: CartItemType[]) => void
  handleToast: ({ type, message }: { type?: string; message: string }) => void
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

  // Toast notifications helper
  const handleToast = ({ type = 'success', message = '' }) => {
    switch (type) {
      case 'success':
        toast.success(message)
        break
      case 'info':
        toast.info(message)
        break
      case 'error':
        toast.error(message)
        break
      case 'warn':
        toast.warn(message)
        break
      default:
        toast.success(message)
    }
  }

  return (
    <AppContext.Provider value={{ cart, setCart, handleToast }}>
      {children}
      <ToastContainer />
    </AppContext.Provider>
  )
}
