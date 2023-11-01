'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import CartLink from '../CartLink'

const MENU_LINKS = [
  {
    id: 1,
    title: 'Home',
    href: '/',
  },
  { id: 2, title: 'Menu', href: '/menu' },
  { id: 3, title: 'Working Hours', href: '/#working-hours' },
  { id: 4, title: 'Contact', href: '/#contact' },
]

const MobileMenu = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // transient code
  const user = 'user'

  const isActiveRoute = (href: string) => {
    return pathname === href
  }

  const MotionImage = motion(Image)

  return (
    <div>
      {/* mobile menu icon */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className='cursor-pointer'
      >
        <AnimatePresence>
          {isOpen ? (
            <MotionImage
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, rotateZ: -720, scale: 1 }}
              exit={{ opacity: 0, rotateZ: -720, scale: 0 }}
              transition={{ duration: 0.5 }}
              src='/close.png'
              alt='menu'
              width={20}
              height={20}
            />
          ) : (
            <MotionImage
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5 }}
              src='/open.png'
              alt='menu'
              width={20}
              height={20}
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
            className='text-light bg-primary absolute left-0 right-0 top-24 z-[999] flex h-[calc(100vh-6rem)] flex-col items-center justify-center space-y-8 text-3xl uppercase tracking-wide'
          >
            <>
              {MENU_LINKS?.map((link) => {
                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    onClick={() => setIsOpen((prev) => !prev)}
                    className={
                      isActiveRoute(link.href)
                        ? 'underline underline-offset-4'
                        : ''
                    }
                  >
                    {link.title}
                  </Link>
                )
              })}
              {user ? (
                <Link
                  href='/orders'
                  onClick={() => setIsOpen((prev) => !prev)}
                  className={
                    isActiveRoute('/orders')
                      ? 'underline underline-offset-4'
                      : ''
                  }
                >
                  Orders
                </Link>
              ) : (
                <Link
                  href='/login'
                  onClick={() => setIsOpen((prev) => !prev)}
                  className={
                    isActiveRoute('/login')
                      ? 'underline underline-offset-4'
                      : ''
                  }
                >
                  Login
                </Link>
              )}
              <CartLink
                onClick={() => setIsOpen((prev) => !prev)}
                mobileMenu={true}
                className={
                  isActiveRoute('/cart') ? 'underline underline-offset-4' : ''
                }
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
