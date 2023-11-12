export type UserType = {
  id: string
  name?: string
  email: string
  img?: string
  isAdmin: boolean
  orders?: OrderType[]
}

export type MenuCategoryType = {
  id?: string
  slug: MenuCategorySlugEnum
  name: MenuCategorySlugEnum
  description: string
  img?: string
  imgBlur?: string
  bgColor?: string
  textColor?: string
  menuItems?: MenuItemType[]
}

export enum MenuCategorySlugEnum {
  PIZZA = 'pizza',
  PASTA = 'pasta',
  BURGER = 'burger',
}

export type MenuItemType = {
  id?: string
  name: string
  description: string
  price: number
  img: string
  imgBlur?: string
  isFeatured?: boolean
  options?: MenuOptionType[]

  categorySlug: MenuCategorySlugEnum // FK to MenuCategory model
}

export type MenuOptionType = { name: string; additionalPrice: number }

export type OrderType = {
  id?: string
  status: OrderStatusEnum
  totalPrice: number
  intent_id?: string // Stripe PaymentIntent
  cartItems: CartItemType[]
  createdAt?: Date

  userEmail: string // FK to User model
}

export enum OrderStatusEnum {
  PENDING = 'pending',
  PAID = 'paid',
  ON_THE_WAY = 'on the way',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export type CartItemType = {
  cartemId?: string // cart client side (appContext)
  id?: string // cart db side (item.id)
  name: string
  totalPrice: number
  quantity: number
  selectedOptionName: string
  img?: string

  orderId?: string // FK to Order model
}

// home page slider + special offer img
export type PageImageType = {
  id?: string
  page?: string // home, login, about, contact
  kw?: string // slider, specialOffer
  contentTitle?: string // title of the content if any
  img: string
  imgBlur?: string
  alt: string
}
