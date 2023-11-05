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
  slug: string // pizza, pasta, burgers
  name: string // pizza, pasta, burgers
  description: string
  img?: string
  imgBlur?: string

  bgColor?: string
  textColor?: string

  menuItems?: MenuItemType[]

  createdAt?: Date
  updatedAt?: Date
}

export type MenuItemType = {
  id?: string
  name: string
  description: string
  price: number
  img: string
  imgBlur?: string

  isFeatured?: boolean
  createdAt?: Date
  updatedAt?: Date

  categorySlug: MenuCategoryType['slug'] // FK to MenuCategory model
  options?: MenuOptionType[]
}

type MenuOptionType = {
  title: string
  additionalPrice: number
}

export type OrderType = {
  id: string
  status: string
  totalPrice: number
  intent_id: string // Stripe PaymentIntent
  userEmail: UserType['email'] // FK to User model
  cartItems: CartItemType[]
  createdAt: Date
  updatedAt: Date
}

export type CartItemType = {
  id: string // itemId
  name: string
  img: string
  imgBlur?: string
  selectedOption: MenuOptionType
  quantity: number
  totalPrice: number
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
