'use client'

import Image from 'next/image'
import { useSession, signIn } from 'next-auth/react'
import { twMerge } from 'tailwind-merge'

const GoogleSignIn = () => {
  //   const { data: session, status } = useSession()

  return (
    <button
      onClick={() => signIn('google', { callbackUrl: '/' })}
      className={twMerge(
        'btn',
        'h-16 w-full justify-start gap-x-8 rounded-md border border-dark/20 bg-transparent text-lg font-normal capitalize text-dark/80 transition duration-300 ease-in-out hover:scale-105 hover:shadow-md md:text-xl'
      )}
    >
      <Image src='/google.png' width={35} height={35} alt='Google logo' />
      Sign in with Google
    </button>
  )
}

export default GoogleSignIn
