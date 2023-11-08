'use client'

import { useState, useEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faWandMagicSparkles,
  faEnvelopeCircleCheck,
} from '@fortawesome/free-solid-svg-icons'

const MagicLinkSignIn = () => {
  const [isReady, setIsReady] = useState(false)
  const [isStep01, setIsStep01] = useState(true)
  const [isStep02, setIsStep02] = useState(false)
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setIsReady(true)
  }, [])

  const onSendMagicLink = (email: string) => {
    console.log('onSendMagicLink', email)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (ref.current?.value == null) return

    console.log(ref.current?.value)
    onSendMagicLink(ref.current?.value)
    setIsStep02(false)
  }
  if (!isReady) return <Skeletton />

  return (
    <div className='relative w-full'>
      {isStep01 && (
        <button
          onClick={() => {
            setIsStep01(false)
            setIsStep02(true)
          }}
          className={twMerge(
            'btn',
            'h-16 w-full items-center justify-start gap-x-8 rounded-md border border-dark/20 bg-transparent text-lg font-normal capitalize text-dark/80 transition duration-300 ease-in-out hover:scale-105 hover:shadow-md md:text-xl'
          )}
        >
          <FontAwesomeIcon
            icon={faWandMagicSparkles}
            className='h-8 w-8 text-fuchsia-500'
          />
          Use a Magic link
        </button>
      )}

      {isStep02 && (
        <form
          onSubmit={handleSubmit}
          className='absolute -bottom-16 -top-24 z-50 flex w-full flex-col items-center justify-center rounded-md border border-fuchsia-500/20 bg-light text-lg capitalize'
        >
          <label
            htmlFor='email'
            className='my-1 flex items-center font-semibold text-fuchsia-500'
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.75, 1] }}
              transition={{ duration: 0.5 }}
            >
              <FontAwesomeIcon
                icon={faWandMagicSparkles}
                className='me-2 h-5 w-5 text-fuchsia-500'
              />
            </motion.div>
            Use a Magic link
          </label>
          <input
            id='email'
            ref={ref}
            type='email'
            placeholder='Your email...'
            className='rounded-md border border-dark/20 px-2 outline-none focus:border-fuchsia-500/50 focus:text-inherit'
          ></input>

          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className={twMerge(
              'btn',
              'mt-2 bg-fuchsia-500 px-4 py-2 text-lg capitalize text-white md:text-xl'
            )}
            type='submit'
          >
            Sign in
          </motion.button>
        </form>
      )}

      {!isStep01 && !isStep02 && (
        <motion.div className='absolute -bottom-16 -top-24 z-50 flex  w-full flex-col items-center justify-center rounded-md border border-fuchsia-500/20 bg-light text-xl font-semibold capitalize text-fuchsia-500'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FontAwesomeIcon
              icon={faEnvelopeCircleCheck}
              className='mb-2 h-10 w-10 text-fuchsia-500'
            />
          </motion.div>
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.5, 1.25] }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            Confirm your email
          </motion.span>
        </motion.div>
      )}
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
