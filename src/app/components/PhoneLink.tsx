import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'

const PhoneLink = ({ className = '' }) => {
  return (
    <a
      href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`}
      target='_blank'
      className={`bg-tertiary-light border-primary flex h-8 w-[8.5rem] items-center justify-around rounded-lg border px-1 text-sm font-bold ${className}`}
    >
      <div className='flex h-5 w-5 items-center rounded-full'>
        <FontAwesomeIcon
          icon={faPhone}
          className='text-primary border-primary rounded-full border p-[0.1rem]'
        />
      </div>
      <span className='text-primary'>
        {process.env.NEXT_PUBLIC_PHONE_NUMBER}
      </span>
    </a>
  )
}

export default PhoneLink
