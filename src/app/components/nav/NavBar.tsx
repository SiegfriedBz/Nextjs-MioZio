import Link from 'next/link'
import MobileMenu from './MobileMenu'
import PhoneLink from '../PhoneLink'
import LogInOutAndOrdersLinks from './LogInOutAndOrdersLinks'
import CartLinkOrAdminAddItemLink from './CartLinkOrAdminAddItemLink'

const DESKTOP_MENU_LINKS = [
  {
    id: 1,
    title: 'Home',
    href: '/',
  },
  { id: 2, title: 'Menu', href: '/menu' },
  { id: 3, title: 'Contact', href: '/#contact' },
]

const NavBar = () => {
  return (
    <div className='flex h-12 items-center justify-between border-b border-primary bg-light p-4 lg:px-16 xl:px-32 2xl:px-48'>
      {/* desktop menu 1/2 */}
      <div className='hidden flex-1 items-center space-x-4 font-bold md:flex'>
        {DESKTOP_MENU_LINKS.map((link) => {
          return (
            <Link
              key={link.id}
              href={link.href}
              className='uppercase tracking-wide text-primary'
            >
              {link.title}
            </Link>
          )
        })}
      </div>

      {/* brand name */}
      <div className='flex-1 md:absolute md:left-1/2 md:-translate-x-1/2'>
        <Link
          href='/'
          className='text-2xl font-bold uppercase tracking-wide text-primary md:text-3xl'
        >
          Mio Zio
        </Link>
      </div>

      {/* desktop menu 2/2 */}
      <div className='hidden flex-1 items-center justify-end space-x-4 md:flex'>
        <PhoneLink className='md:absolute md:right-4 md:top-6 md:-translate-y-1/2 lg:static lg:translate-y-0' />

        {/* links for login, logout & Orders */}
        <LogInOutAndOrdersLinks />

        {/* CartLink or AdminAddMenuItemForm */}
        <CartLinkOrAdminAddItemLink />
      </div>

      {/* mobile menu */}
      <div className='md:hidden'>
        <MobileMenu />
      </div>
    </div>
  )
}

export default NavBar
