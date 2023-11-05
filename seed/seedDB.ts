// 1. SEED CLOUDINARY WITH IMAGES
// 1.1. add folders/images to ./data/images
// Note: the folder structure in ./data/images will be used to create the public_id in Cloudinary
// 1.2. run `npm run seed:cloudinary`

// 2. SEED DB
import { prisma } from '../src/utils/prismaClient'

const pageImages = [
  // home page
  {
    page: 'home',
    kw: 'slider',
    contentTitle: 'we make it always crispy & hot',
    img: 'MioZio/home/slider01',
    alt: 'crispy & hot',
  },
  {
    page: 'home',
    kw: 'slider',
    contentTitle: 'we deliver your order wherever you are in NY',
    img: 'MioZio/home/slider02',
    alt: 'best delivery',
  },
  {
    page: 'home',
    kw: 'slider',
    contentTitle: 'the best pizza to share with your family',
    img: 'MioZio/home/slider03',
    alt: 'best pizza',
  },
  {
    page: 'home',
    kw: 'specialOffer',
    img: 'MioZio/home/specialOffer',
    alt: 'special Offer',
  },
  // login page
  {
    page: 'login',
    img: 'MioZio/login/login',
    alt: 'cheesy login',
  },
]

const menuCategories = [
  {
    name: 'Italian Pasta',
    slug: 'pasta',
    bgColor: 'bg-[#009345]',
    textColor: 'text-light',
    description:
      'Our pasta are made with the finest ingredients and cooked to perfection.',
    img: 'MioZio/menuCategory/pastaCategory',
  },
  {
    name: 'Juicy Burgers',
    slug: 'burgers',
    bgColor: 'bg-transparent',
    textColor: 'text-dark',
    description:
      'Our burgers are made with the finest ingredients and cooked to perfection.',
    img: 'MioZio/menuCategory/burgerCategory',
  },
  {
    name: 'Cheesy Pizza',
    slug: 'pizza',
    bgColor: 'bg-[#CF2B36]',
    textColor: 'text-light',
    description:
      'Our pizza are made with the finest ingredients and cooked to perfection.',
    img: 'MioZio/menuCategory/pizzaCategory',
  },
]
const menuItems = [
  // pizzas
  {
    name: 'Sicilian',
    description:
      'Ignite your taste buds with a fiery combination of spicy pepperoni, jalapeños, crushed red pepper flakes, and melted mozzarella cheese, delivering a kick with every bite.',
    price: 24.9,
    img: 'MioZio/menuCategory/pizza/pizza01',
    isFeatured: true,
    categorySlug: 'pizza',
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
    name: 'Mediterranean Delight',
    description:
      'Embark on a culinary journey with this Mediterranean-inspired creation, featuring zesty feta cheese, Kalamata olives, sun-dried tomatoes, and a sprinkle of oregano.',
    price: 32.9,
    img: 'MioZio/menuCategory/pizza/pizza02',
    isFeatured: true,
    categorySlug: 'pizza',
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
    name: 'Bella Napoli',
    description:
      'A classic Italian delight featuring a thin, crispy crust, tangy tomato sauce, fresh mozzarella, and a medley of aromatic herbs topped with lettuce, tomatoes, and a dollop of tangy mayo.',
    price: 26.9,
    img: 'MioZio/menuCategory/pizza/pizza03',
    isFeatured: false,
    categorySlug: 'pizza',
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
    name: 'Pesto Primavera',
    description:
      'A classic Italian delight featuring a thin, crispy crust, tangy tomato sauce, fresh mozzarella, and a medley of aromatic herbs topped with lettuce, tomatoes, and a dollop of tangy mayo.',
    price: 28.9,
    img: 'MioZio/menuCategory/pizza/pizza04',
    isFeatured: false,
    categorySlug: 'pizza',
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

  // burgers
  {
    name: 'Burger Supreme',
    description:
      'A classic Italian delight featuring a thin, crispy crust, tangy tomato sauce, fresh mozzarella, and a medley of aromatic herbs topped with lettuce, tomatoes, and a dollop of tangy mayo.',
    price: 24.9,
    img: 'MioZio/menuCategory/burger/burger01',
    isFeatured: true,
    categorySlug: 'burgers',
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
    name: 'Burger Delight',
    description:
      'A classic Italian delight featuring a thin, crispy crust, tangy tomato sauce, fresh mozzarella, and a medley of aromatic herbs topped with lettuce, tomatoes, and a dollop of tangy mayo.',
    price: 24.9,
    img: 'MioZio/menuCategory/burger/burger02',
    isFeatured: true,
    categorySlug: 'burgers',
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
    name: 'Burger Exquis',
    description:
      'A classic Italian delight featuring a thin, crispy crust, tangy tomato sauce, fresh mozzarella, and a medley of aromatic herbs topped with lettuce, tomatoes, and a dollop of tangy mayo.',
    price: 29.9,
    img: 'MioZio/menuCategory/burger/burger01',
    isFeatured: false,
    categorySlug: 'burgers',
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
    name: 'Burger Magnus',
    description:
      'A classic Italian delight featuring a thin, crispy crust, tangy tomato sauce, fresh mozzarella, and a medley of aromatic herbs topped with lettuce, tomatoes, and a dollop of tangy mayo.',
    price: 32.9,
    img: 'MioZio/menuCategory/burger/burger02',
    isFeatured: false,
    categorySlug: 'burgers',
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

  // pasta
  {
    name: 'Four Cheese Fantasy',
    description:
      'Experience pure cheesy bliss with a melty blend of mozzarella, cheddar, provolone, and Parmesan cheeses, creating a rich and indulgent pizza experience.',
    price: 24.9,
    img: 'MioZio/menuCategory/pasta/pasta01',
    isFeatured: true,
    categorySlug: 'pasta',
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
    name: '7th Cheese Dreams',
    description:
      'Experience pure cheesy bliss with a melty blend of mozzarella, cheddar, provolone, and Parmesan cheeses, creating a rich and indulgent pizza experience.',
    price: 28.9,
    img: 'MioZio/menuCategory/pasta/pasta02',
    isFeatured: true,
    categorySlug: 'pasta',
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
    name: 'Pene Arabiata',
    description:
      'Experience pure cheesy bliss with a melty blend of mozzarella, cheddar, provolone, and Parmesan cheeses, creating a rich and indulgent pizza experience.',
    price: 24.9,
    img: 'MioZio/menuCategory/pasta/pasta01',
    isFeatured: false,
    categorySlug: 'pasta',
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
    name: 'Gnocci al Forno',
    description:
      'Experience pure cheesy bliss with a melty blend of mozzarella, cheddar, provolone, and Parmesan cheeses, creating a rich and indulgent pizza experience.',
    price: 24.9,
    img: 'MioZio/menuCategory/pasta/pasta02',
    isFeatured: false,
    categorySlug: 'pasta',
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

const load = async () => {
  try {
    // create (pages) images
    console.log('⏳ Seeding home & login pages in DB...')
    await prisma.image.createMany({
      data: pageImages,
    })
    console.log('✅ Seeding home & login pages in DB...DONE.')
    console.log('===')

    // create menu categories
    console.log('⏳ Seeding menu categories in DB...')
    await prisma.menuCategory.createMany({
      data: menuCategories,
    })
    console.log('✅ Seeding menu categories in DB...DONE.')
    console.log('===')

    // create menu items
    console.log('⏳ Seeding menu items in DB...')
    await prisma.menuItem.createMany({
      data: menuItems,
    })
    console.log('✅ Seeding menu items in DB...DONE.')
    console.log('===')
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}
load()
