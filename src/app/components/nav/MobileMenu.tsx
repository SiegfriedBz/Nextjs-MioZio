'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import LogInOutAndOrdersLinks from './LogInOutAndOrdersLinks'
import LoadingPulse from '../LoadingPulse'
import CartLinkOrAdminAddItemLink from './CartLinkOrAdminAddItemLink'

const MENU_LINKS = [
  {
    id: 1,
    title: 'Home',
    href: '/',
  },
  { id: 2, title: 'Menu', href: '/menu' },
  { id: 3, title: 'Contact', href: '/#contact' },
]

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { status } = useSession()
  const isLoading = status === 'loading'

  const MotionImage = motion(Image)

  if (isLoading) return <LoadingPulse />

  return (
    <div>
      {/* mobile menu icon */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className='relative h-6 w-6 cursor-pointer'
      >
        <AnimatePresence>
          {isOpen ? (
            <MotionImage
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, rotateZ: -720, scale: 1 }}
              exit={{ opacity: 0, rotateZ: -720, scale: 0 }}
              transition={{ duration: 0.5 }}
              src='/close.png'
              alt='close menu'
              fill
              sizes='(max-width: 768px) 100vw, 100vw'
            />
          ) : (
            <MotionImage
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5 }}
              src='/open.png'
              alt='open menu'
              fill
              sizes='(max-width: 768px) 100vw, 100vw'
            />
          )}
        </AnimatePresence>
      </div>

      {/* mobile menu links */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuLinksVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            className='absolute left-0 right-0 top-24 flex h-[100lvh] flex-col items-center justify-center space-y-8 bg-primary pb-32 text-3xl uppercase tracking-wide text-light'
          >
            <>
              {MENU_LINKS?.map((link) => {
                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    onClick={() => setIsOpen((prev) => !prev)}
                  >
                    {link.title}
                  </Link>
                )
              })}

              {/* links for login, logout, & Orders */}
              <LogInOutAndOrdersLinks
                closeModalMenu={() => setIsOpen((prev) => !prev)}
                isMobileMenu={true}
              />

              {/* CartLink or AdminAddMenuItemForm */}
              <CartLinkOrAdminAddItemLink
                mobileMenu={true}
                closeModalMenu={() => setIsOpen((prev) => !prev)}
              />
            </>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MobileMenu

const menuLinksVariants = {
  initial: {
    opacity: 0,
    x: 100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.25,
    },
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: {
      duration: 0.25,
    },
  },
}
