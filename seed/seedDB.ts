// 1. SEED CLOUDINARY WITH IMAGES
// 1.1. add folders/images to ./data/images
// Note: the folder structure in ./data/images will be used to create the public_id in Cloudinary
// 1.2. run `npm run seed:cloudinary`

// 2. SEED DB
// run `npm run seed:db`
import { prisma } from '../src/utils/prismaClient'

const users = [
  { name: 'admin01', email: 'admin01@example.com', isAdmin: true },
  { name: 'user02', email: 'user02@example.com' },
  { name: 'user03', email: 'user03@example.com' },
]

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
    kw: 'specialoffer',
    img: 'MioZio/home/specialoffer',
    alt: 'special Offer',
  },
  // login page
  {
    page: 'login',
    img: 'MioZio/login/login',
    alt: 'cheesy login',
  },
]

enum MenuCategorySlugEnum {
  PIZZA = 'pizza',
  PASTA = 'pasta',
  BURGER = 'burger',
}

const menuCategories = [
  {
    name: 'Italian Pasta',
    slug: 'PASTA' as keyof typeof MenuCategorySlugEnum,
    bgColor: 'bg-[#009345]',
    textColor: 'text-light',
    description:
      'Our pasta are made with the finest ingredients and cooked to perfection.',
    img: 'MioZio/menuCategory/pastaCategory',
  },
  {
    name: 'Juicy burger',
    slug: 'BURGER' as keyof typeof MenuCategorySlugEnum,
    bgColor: 'bg-transparent',
    textColor: 'text-dark',
    description:
      'Our burger are made with the finest ingredients and cooked to perfection.',
    img: 'MioZio/menuCategory/burgerCategory',
  },
  {
    name: 'Cheesy Pizza',
    slug: 'PIZZA' as keyof typeof MenuCategorySlugEnum,
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
    categorySlug: 'PIZZA' as keyof typeof MenuCategorySlugEnum,
    options: [
      {
        name: 'small',
        additionalPrice: 0,
      },
      {
        name: 'medium',
        additionalPrice: 4,
      },
      {
        name: 'large',
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
    categorySlug: 'PIZZA' as keyof typeof MenuCategorySlugEnum,
    options: [
      {
        name: 'small',
        additionalPrice: 0,
      },
      {
        name: 'medium',
        additionalPrice: 4,
      },
      {
        name: 'large',
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
    categorySlug: 'PIZZA' as keyof typeof MenuCategorySlugEnum,
    options: [
      {
        name: 'small',
        additionalPrice: 0,
      },
      {
        name: 'medium',
        additionalPrice: 4,
      },
      {
        name: 'large',
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
    categorySlug: 'PIZZA' as keyof typeof MenuCategorySlugEnum,
    options: [
      {
        name: 'small',
        additionalPrice: 0,
      },
      {
        name: 'medium',
        additionalPrice: 4,
      },
      {
        name: 'large',
        additionalPrice: 6,
      },
    ],
  },

  // burger
  {
    name: 'burger Supreme',
    description:
      'A classic Italian delight featuring a thin, crispy crust, tangy tomato sauce, fresh mozzarella, and a medley of aromatic herbs topped with lettuce, tomatoes, and a dollop of tangy mayo.',
    price: 24.9,
    img: 'MioZio/menuCategory/burger/burger01',
    isFeatured: true,
    categorySlug: 'BURGER' as keyof typeof MenuCategorySlugEnum,
    options: [
      {
        name: 'small',
        additionalPrice: 0,
      },
      {
        name: 'medium',
        additionalPrice: 4,
      },
      {
        name: 'large',
        additionalPrice: 6,
      },
    ],
  },
  {
    name: 'burger Delight',
    description:
      'A classic Italian delight featuring a thin, crispy crust, tangy tomato sauce, fresh mozzarella, and a medley of aromatic herbs topped with lettuce, tomatoes, and a dollop of tangy mayo.',
    price: 24.9,
    img: 'MioZio/menuCategory/burger/burger02',
    isFeatured: true,
    categorySlug: 'BURGER' as keyof typeof MenuCategorySlugEnum,
    options: [
      {
        name: 'small',
        additionalPrice: 0,
      },
      {
        name: 'medium',
        additionalPrice: 4,
      },
      {
        name: 'large',
        additionalPrice: 6,
      },
    ],
  },
  {
    name: 'burger Exquis',
    description:
      'A classic Italian delight featuring a thin, crispy crust, tangy tomato sauce, fresh mozzarella, and a medley of aromatic herbs topped with lettuce, tomatoes, and a dollop of tangy mayo.',
    price: 29.9,
    img: 'MioZio/menuCategory/burger/burger01',
    isFeatured: false,
    categorySlug: 'BURGER' as keyof typeof MenuCategorySlugEnum,
    options: [
      {
        name: 'small',
        additionalPrice: 0,
      },
      {
        name: 'medium',
        additionalPrice: 4,
      },
      {
        name: 'large',
        additionalPrice: 6,
      },
    ],
  },
  {
    name: 'burger Magnus',
    description:
      'A classic Italian delight featuring a thin, crispy crust, tangy tomato sauce, fresh mozzarella, and a medley of aromatic herbs topped with lettuce, tomatoes, and a dollop of tangy mayo.',
    price: 32.9,
    img: 'MioZio/menuCategory/burger/burger02',
    isFeatured: false,
    categorySlug: 'BURGER' as keyof typeof MenuCategorySlugEnum,
    options: [
      {
        name: 'small',
        additionalPrice: 0,
      },
      {
        name: 'medium',
        additionalPrice: 4,
      },
      {
        name: 'large',
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
    categorySlug: 'BURGER' as keyof typeof MenuCategorySlugEnum,
    options: [
      {
        name: 'small',
        additionalPrice: 0,
      },
      {
        name: 'medium',
        additionalPrice: 4,
      },
      {
        name: 'large',
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
    categorySlug: 'PASTA' as keyof typeof MenuCategorySlugEnum,
    options: [
      {
        name: 'small',
        additionalPrice: 0,
      },
      {
        name: 'medium',
        additionalPrice: 4,
      },
      {
        name: 'large',
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
    categorySlug: 'PASTA' as keyof typeof MenuCategorySlugEnum,
    options: [
      {
        name: 'small',
        additionalPrice: 0,
      },
      {
        name: 'medium',
        additionalPrice: 4,
      },
      {
        name: 'large',
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
    categorySlug: 'PASTA' as keyof typeof MenuCategorySlugEnum,
    options: [
      {
        name: 'small',
        additionalPrice: 0,
      },
      {
        name: 'medium',
        additionalPrice: 4,
      },
      {
        name: 'large',
        additionalPrice: 6,
      },
    ],
  },
]

const load = async () => {
  try {
    // CLEAN UP DB
    console.log('⏳ CLEAN UP DB...')

    console.log('⏳ Deleting users in DB...')
    await prisma.user.deleteMany()
    console.log('✅ Deleting users in DB...DONE.')
    console.log('===')

    console.log('⏳ Deleting home & login pages in DB...')
    await prisma.image.deleteMany()
    console.log('✅ Deleting home & login pages in DB...DONE.')
    console.log('===')

    console.log('⏳ Deleting menu items in DB...')
    await prisma.menuItem.deleteMany()
    console.log('✅ Deleting menu items in DB...DONE.')
    console.log('===')

    console.log('⏳ Deleting menu categories in DB...')
    await prisma.menuCategory.deleteMany()
    console.log('✅ Deleting menu categories in DB...DONE.')
    console.log('===')

    console.log('✅ ✅ CLEAN UP DB...DONE')
    console.log('===')

    // SEED DB
    console.log('⏳ SEED DB...')
    // create users
    console.log('⏳ Seeding users in DB...')
    await prisma.user.createMany({
      data: users,
    })
    console.log('✅ Seeding users in DB...DONE.')
    console.log('===')

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
    console.log('✅ ✅ SEED DB...DONE')
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}
load()
