import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItemType } from '@/types'

type ActionsType = {
  addToCart: (cartItem: CartItemType) => void
  removeFromCart: (cartemId: string) => void
  clearCart: () => void
}

type useCartStoreType = {
  cartItems: CartItemType[]
} & ActionsType

export const useCartStore = create(
  persist<useCartStoreType>(
    (set, get) => ({
      cartItems: [],
      addToCart(cartItem) {
        const cartItemExists = get().cartItems.find(
          (item) =>
            item.name === cartItem.name &&
            item.selectedOptionName === cartItem.selectedOptionName
        )
        if (cartItemExists) {
          set((state) => ({
            cartItems: state.cartItems.map((item) => {
              return item.name !== cartItem.name
                ? item
                : {
                    ...item,
                    quantity: item.quantity + cartItem.quantity,
                  }
            }),
          }))
        } else {
          set((state) => ({
            cartItems: [...state.cartItems, cartItem],
          }))
        }
      },
      removeFromCart(cartemId: string) {
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => item.cartemId !== cartemId
          ),
        }))
      },
      clearCart() {
        set({ cartItems: [] })
      },
    }),
    { name: 'mio-zio-cart', skipHydration: true }
  )
)
