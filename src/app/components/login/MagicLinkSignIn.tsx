'use client'

import { useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'

const MagicLinkSignIn = () => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setIsReady(true)
  }, [])

  if (!isReady) return <Skeletton />

  return (
    <div className='relative w-full'>
      <button
        onClick={() => {
          signIn('email', { callbackUrl: '/' })
        }}
        className={twMerge(
          'btn',
          'h-16 w-full items-center justify-start gap-x-8 rounded-md border border-dark/20 bg-transparent text-lg font-normal capitalize text-dark/80 transition duration-300 ease-in-out hover:scale-105 hover:shadow-md md:text-xl'
        )}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 0.5 }}
        >
          <FontAwesomeIcon
            icon={faWandMagicSparkles}
            className='me-2 h-8 w-8 text-fuchsia-500'
          />
        </motion.div>
        Use a Magic link
      </button>
    </div>
  )
}

export default MagicLinkSignIn

const Skeletton = () => {
  return (
    <span
      className={twMerge(
        'btn',
        'h-16 w-full items-center justify-center gap-x-8 rounded-md border border-dark/20 bg-transparent text-dark/80'
      )}
    >
      <FontAwesomeIcon
        icon={faWandMagicSparkles}
        className='h-6 w-6 animate-pulse text-fuchsia-500'
      />
      <FontAwesomeIcon
        icon={faWandMagicSparkles}
        className='h-6 w-6 animate-pulse text-fuchsia-500'
      />
      <FontAwesomeIcon
        icon={faWandMagicSparkles}
        className='h-6 w-6 animate-pulse text-fuchsia-500'
      />
    </span>
  )
}
