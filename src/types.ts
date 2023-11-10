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

  createdAt?: Date
  updatedAt?: Date
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

  categorySlug: MenuCategoryType['slug'] // FK to MenuCategory model

  createdAt?: Date
  updatedAt?: Date
}

export type MenuOptionType = { name: string; additionalPrice: number }

export type OrderType = {
  id?: string
  status?: OrderStatusEnum
  totalPrice: number
  intent_id?: string // Stripe PaymentIntent
  cartItems: CartItemType[]

  userEmail: UserType['email'] // FK to User model

  createdAt?: Date
  updatedAt?: Date
}

export enum OrderStatusEnum {
  PENDING = 'PENDING',
  PAID = 'PAID',
  ON_THE_WAY = 'ON_THE_WAY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export type CartItemType = {
  cartemId?: string // cart client side (appContext)
  id?: string // cart db side (item.id)
  name: string
  totalPrice: number
  quantity: number
  selectedOptionName: MenuOptionType['name']
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

//
export type SocialImageType = {
  title: string
  cloudName: string
  imagePublicID: string
  cloudinaryUrlBase?: string
  version?: string | null
  titleFont?: string
  titleExtraConfig?: string
  imageWidth?: number
  imageHeight?: number
  textAreaWidth?: number
  textAreaHeight?: number
  textLeftOffset?: number
  textBottomOffset?: number
  textColor?: string
  titleFontSize?: number
}
