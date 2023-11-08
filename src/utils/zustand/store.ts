import { create } from 'zustand'
import type { CartItemType } from '@/types'

type ActionsType = {
  addToCart: (cartItem: CartItemType) => void
  removeFromCart: (cartemId: string) => void
  clearCart: () => void
}

type useCartStoreType = {
  cartItems: CartItemType[]
} & ActionsType

export const useCartStore = create<useCartStoreType>((set, get) => ({
  cartItems: [],
  addToCart: (cartItem) =>
    set((state) => ({
      cartItems: [...state.cartItems, cartItem],
    })),
  removeFromCart: (cartemId: string) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.cartemId !== cartemId),
    })),
  clearCart: () => set({ cartItems: [] }),
}))
