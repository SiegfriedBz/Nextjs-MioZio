import Link from 'next/link'
import MobileMenu from './MobileMenu'
import PhoneLink from '../PhoneLink'
import CartLink from '../CartLink'

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
  // transient code
  const user = 'user'

  return (
    <div className='border-primary bg-light flex h-12 items-center justify-between border-b p-4 lg:px-16 xl:px-32 2xl:px-48'>
      {/* desktop menu 1/2 */}
      <div className='hidden flex-1 items-center space-x-4 md:flex'>
        {DESKTOP_MENU_LINKS.map((link) => {
          return (
            <Link
              key={link.id}
              href={link.href}
              className='text-primary uppercase tracking-wide'
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
          className='text-primary text-2xl font-bold uppercase tracking-wide'
        >
          Mio Zio
        </Link>
      </div>

      {/* desktop menu 2/2 */}
      <div className='hidden flex-1 items-center justify-end space-x-4 md:flex'>
        <PhoneLink className='md:absolute md:right-4 md:top-6 md:-translate-y-1/2 lg:static lg:translate-y-0' />
        {user ? (
          <Link href='/orders' className='text-primary uppercase tracking-wide'>
            Orders
          </Link>
        ) : (
          <Link href='/login' className='text-primary uppercase tracking-wide'>
            Login
          </Link>
        )}

        <CartLink className='text-primary uppercase tracking-wide' />
      </div>

      {/* mobile menu */}
      <div className='md:hidden'>
        <MobileMenu />
      </div>
    </div>
  )
}

export default NavBar
