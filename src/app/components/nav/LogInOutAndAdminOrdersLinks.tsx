'use client'

import { useAppContext } from '@/app/context/appContext'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

type Props = {
  closeModalMenu?: () => void
  isMobileMenu?: boolean
}

const LogInOutAndAdminOrdersLinks = ({
  closeModalMenu,
  isMobileMenu = false,
}: Props) => {
  const { data: session, status } = useSession()

  const isSignedIn = status === 'authenticated'
  const isAdmin = true
  // && session?.user?.type?.toLowercase() === 'admin'

  return (
    <>
      {isSignedIn ? (
        <div
          className={`flex ${
            isMobileMenu ? 'flex-col space-y-8' : 'space-x-4'
          }`}
        >
          <button
            className={`uppercase tracking-wide ${
              isMobileMenu
                ? 'bg-primary text-light'
                : 'bg-light font-bold text-primary'
            }`}
            onClick={() => {
              signOut({ callbackUrl: '/' })
              closeModalMenu && closeModalMenu()
            }}
          >
            Log out
          </button>

          {isAdmin && (
            <Link
              href='/orders'
              onClick={() => closeModalMenu && closeModalMenu()}
              className={`uppercase tracking-wide ${
                isMobileMenu
                  ? 'bg-primary text-light'
                  : 'bg-light font-bold text-primary'
              }`}
            >
              Orders
            </Link>
          )}
        </div>
      ) : (
        <Link
          href='/login'
          onClick={() => closeModalMenu && closeModalMenu()}
          className={`uppercase tracking-wide ${
            isMobileMenu
              ? 'bg-primary text-light'
              : 'bg-light font-bold text-primary'
          }`}
        >
          Login
        </Link>
      )}
    </>
  )
}

export default LogInOutAndAdminOrdersLinks
