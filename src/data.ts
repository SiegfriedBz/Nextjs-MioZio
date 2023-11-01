// HOME PAGE DATA
export type SliderImageType = {
  id: number
  title: string
  alt: string
  src: string
}
export const sliderImagesData: SliderImageType[] = [
  {
    id: 1,
    title: 'we make it always crispy & hot',
    alt: 'we make it always crispy & hot',
    src: 'v1698820917/MioZio/home/slide1.png',
  },
  {
    id: 2,
    title: 'we deliver your order wherever you are in NY',
    alt: 'we deliver your order wherever you are in NY',
    src: 'v1698820925/MioZio/home/slide2.png',
  },
  {
    id: 3,
    title: 'the best pizza to share with your family',
    alt: 'the best pizza to share with your family',
    src: 'v1698820891/MioZio/home/slide3.jpg',
  },
]

export type ItemType = {
  id: number
  title: string
  alt: string
  desc: string
  src: string
  price: number
  options: {
    title: string
    additionalPrice: number
  }[]
}
export const featuredItemsData: ItemType[] = [
  {
    id: 1,
    title: 'Sicilian',
    alt: 'Sicilian',
    desc: 'Ignite your taste buds with a fiery combination of spicy pepperoni, jalapeños, crushed red pepper, and melted mozzarella cheese, delivering a kick with every bite.',
    src: 'v1698822758/MioZio/home/item_01.png',
    price: 24.9,
    options: [
      {
        title: 'Small',
        additionalPrice: 0,
      },
      {
        title: 'Medium',
        additionalPrice: 4,
      },
      {
        title: 'Large',
        additionalPrice: 6,
      },
    ],
  },
  {
    id: 2,
    title: 'Bacon Deluxe',
    alt: 'Bacon Deluxe',
    desc: 'Indulge in smoky goodness with a flame-grilled beef patty, topped with crispy bacon, melted cheddar cheese, caramelized onions, and a smattering of tangy BBQ sauce.',
    src: 'v1698822704/MioZio/home/item_02.png',
    price: 29.9,
    options: [
      {
        title: 'Small',
        additionalPrice: 0,
      },
      {
        title: 'Medium',
        additionalPrice: 4,
      },
      {
        title: 'Large',
        additionalPrice: 6,
      },
    ],
  },
  {
    id: 3,
    title: 'Bella Napoli',
    alt: 'Bella Napoli',
    desc: 'A classic Italian delight featuring a thin, crispy crust, tangy tomato sauce, fresh mozzarella, and a medley of aromatic herbs topped with lettuce, tomatoes, and a dollop of tangy mayo.',
    src: 'v1698822677/MioZio/home/item_03.png',
    price: 24.9,
    options: [
      {
        title: 'Small',
        additionalPrice: 0,
      },
      {
        title: 'Medium',
        additionalPrice: 4,
      },
      {
        title: 'Large',
        additionalPrice: 6,
      },
    ],
  },
  {
    id: 4,
    title: 'Spicy Arrabbiata',
    alt: 'Spicy Arrabbiata',
    desc: 'Ignite your taste buds with this fiery pasta creation, combining penne in a spicy tomato sauce infused with garlic, red chili flakes, and fresh basil for the ultimate comfort food experience.',
    src: 'v1698822776/MioZio/home/item_04.png',
    price: 26.9,
    options: [
      {
        title: 'Small',
        additionalPrice: 0,
      },
      {
        title: 'Medium',
        additionalPrice: 4,
      },
      {
        title: 'Large',
        additionalPrice: 6,
      },
    ],
  },
  {
    id: 5,
    title: 'Jalapeño Fiesta',
    alt: 'Jalapeño Fiesta',
    desc: 'Ignite your taste buds with a fiery kick! This burger features a succulent beef patty, fiery jalapeños, pepper jack cheese, and a zesty chipotle mayo sauce , and all the classic fixings on a toasted bun.',
    src: 'v1698822676/MioZio/home/item_05.png',
    price: 29.9,
    options: [
      {
        title: 'Small',
        additionalPrice: 0,
      },
      {
        title: 'Medium',
        additionalPrice: 4,
      },
      {
        title: 'Large',
        additionalPrice: 6,
      },
    ],
  },
  {
    id: 6,
    title: 'Margherita Magic',
    alt: 'Margherita Magic',
    desc: 'A timeless favorite with a twist, showcasing a thin crust topped with sweet tomatoes, fresh basil, creamy mozzarella, and a drizzle of extra virgin olive oil, fresh arugula, and a drizzle of balsamic glaze.',
    src: 'v1698822683/MioZio/home/item_06.png',
    price: 24.9,
    options: [
      {
        title: 'Small',
        additionalPrice: 0,
      },
      {
        title: 'Medium',
        additionalPrice: 4,
      },
      {
        title: 'Large',
        additionalPrice: 6,
      },
    ],
  },
  {
    id: 7,
    title: 'Garlic Parmesan Linguine',
    alt: 'Garlic Parmesan Linguine',
    desc: "A garlic lover's delight, featuring linguine smothered in a creamy Parmesan sauce, infused with garlic and garnished with chopped parsley, bell peppers, and cherry tomatoes.",
    src: 'v1698822636/MioZio/home/item_07.png',
    price: 28.9,
    options: [
      {
        title: 'Small',
        additionalPrice: 0,
      },
      {
        title: 'Medium',
        additionalPrice: 4,
      },
      {
        title: 'Large',
        additionalPrice: 6,
      },
    ],
  },
  {
    id: 8,
    title: 'Mediterranean Delight',
    alt: 'Mediterranean Delight',
    desc: 'Embark on a culinary journey with this Mediterranean-inspired creation, featuring zesty feta cheese, Kalamata olives, sun-dried tomatoes, and a sprinkle of oregano.',
    src: 'v1698822808/MioZio/home/item_08.png',
    price: 32.9,
    options: [
      {
        title: 'Small',
        additionalPrice: 0,
      },
      {
        title: 'Medium',
        additionalPrice: 4,
      },
      {
        title: 'Large',
        additionalPrice: 6,
      },
    ],
  },
  {
    id: 9,
    title: 'Hawaiian Teriyaki',
    alt: 'Hawaiian Teriyaki',
    desc: 'Experience a taste of the tropics with a juicy beef patty glazed in tangy teriyaki sauce, topped with grilled pineapple, crispy bacon, and fresh lettuce, and all the classic fixings on a toasted bun.',
    src: 'v1698822689/MioZio/home/item_09.png',
    price: 29.9,
    options: [
      {
        title: 'Small',
        additionalPrice: 0,
      },
      {
        title: 'Medium',
        additionalPrice: 4,
      },
      {
        title: 'Large',
        additionalPrice: 6,
      },
    ],
  },
]

export type OfferImageType = {
  alt: string
  src: string
}
export const offerImageData: OfferImageType = {
  alt: 'special offer',
  src: 'v1698821081/MioZio/home/special_offer.png',
}
