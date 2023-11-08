'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import LoadingPulse from '../LoadingPulse'

type Props = {
  closeModalMenu?: () => void
  isMobileMenu?: boolean
}

const LogInOutAndAdminOrdersLinks = ({
  closeModalMenu,
  isMobileMenu = false,
}: Props) => {
  const { status } = useSession()

  const isLoading = status === 'loading'
  const isSignedIn = status === 'authenticated'

  if (isLoading) return <LoadingPulse />

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
