import Image from 'next/image'
import GoogleSignIn from '../components/login/GoogleSignIn'
import MagicLinkSignIn from '../components/login/MagicLinkSignIn'

// import { getBase64ImageUrl, getImageUrl } from '@/utils/cloudinaryUtils'
// const getData = async () => {
//   const loginImgPromise = async () => {}
// }

const Login = async () => {
  // const data = await getData()

  return (
    <section className='flex items-center justify-center p-4 lg:px-16 xl:px-32 2xl:px-64'>
      <div className='h-section flex w-full flex-col items-center rounded-md shadow-lg md:h-3/4 md:flex-row'>
        {/* IMG */}
        <div className='relative h-1/3 w-full md:h-full md:w-1/2'>
          <Image
            src='/loginBg.png'
            alt='img'
            fill={true}
            className='rounded-md rounded-r-none object-cover'
          />
        </div>

        {/* LOGIN  */}
        <div className='flex h-2/3 w-full flex-col items-start justify-center gap-y-4 px-4 md:h-full md:w-1/2 md:items-start md:justify-start md:gap-y-8 lg:px-8 xl:px-16 2xl:px-32'>
          <h2 className='font-semibold text-dark/80'>Welcome</h2>
          <h4 className='text-dark/80'>
            Log into your account or create a new one using social buttons
          </h4>

          <GoogleSignIn />
          <MagicLinkSignIn />

          {/* <br className='hidden md:block' /> */}

          <h4 className='mt-4 text-dark/80 md:mt-16'>
            Have a problem?{' '}
            <a
              href={`"mailto:${process.env.MAIL_CONTACT}`}
              className='underline underline-offset-4'
            >
              Contact us
            </a>
          </h4>
        </div>
      </div>
    </section>
  )
}

export default Login
