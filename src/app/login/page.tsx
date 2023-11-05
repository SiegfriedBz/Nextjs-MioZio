import Image from 'next/image'
import GoogleSignIn from '../components/login/GoogleSignIn'
import MagicLinkSignIn from '../components/login/MagicLinkSignIn'
import { getBase64ImageUrl, getImageUrl } from '@/utils/getImageUrls'
import type { PageImageType } from '@/utils/types'
import { notFound } from 'next/navigation'

const handleCache =
  process.env.NODE_ENV === 'production' ? 'force-cache' : 'no-store'

async function getData() {
  try {
    // FETCH LGGIN IMAGE
    const pageImagesResponse = await fetch(
      `${process.env.NEXTAUTH_URL}/api/pages?page=login`,
      {
        cache: handleCache,
      }
    )
    if (!pageImagesResponse.ok)
      throw new Error('Fetch pageImages: Network response was not ok.')

    const { pageImages } = await pageImagesResponse.json()
    const pageImage = pageImages?.[0] as PageImageType

    if (!pageImage)
      throw new Error('Fetch login pageImages: No pageImage found.')

    const promise = async (data: PageImageType) => {
      const img = getImageUrl(data.img)
      const imgBlur = await getBase64ImageUrl(data.img)
      const fullData: PageImageType = {
        ...data,
        img,
        imgBlur,
      }

      return fullData
    }

    const loginImgData: PageImageType = await promise(pageImage)

    return {
      ...loginImgData,
      img: 'https://res.cloudinary.com/dygpd9pkl/image/upload/v1699163090/MioZio/login/login.webp',
    }
  } catch (error) {
    console.log(`Error: ${error}`)
    return notFound()
  }
}

const Login = async () => {
  const loginImgData = await getData()

  return (
    <section className='flex items-center justify-center p-4 lg:px-16 xl:px-32 2xl:px-64'>
      <div className='h-section flex w-full flex-col items-center rounded-md shadow-lg md:h-3/4 md:flex-row'>
        {/* IMG */}
        <div className='relative h-1/3 w-full md:h-full md:w-1/2'>
          <Image
            src='/login.png'
            placeholder='blur'
            blurDataURL={loginImgData?.imgBlur}
            alt='login'
            fill
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
