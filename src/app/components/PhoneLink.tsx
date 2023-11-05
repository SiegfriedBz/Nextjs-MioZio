import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'

const PhoneLink = ({ className = '' }) => {
  return (
    <a
      href={`tel:${process.env.PHONE_NUMBER}`}
      target='_blank'
      className={`flex h-8 w-[8.5rem] items-center justify-around rounded-lg border border-primary bg-tertiary-light px-1 text-sm font-bold ${className}`}
    >
      <div className='flex h-5 w-5 items-center rounded-full'>
        <FontAwesomeIcon
          icon={faPhone}
          className='rounded-full border border-primary p-[0.1rem] text-primary'
        />
      </div>
      <span className='text-primary'>{process.env.PHONE_NUMBER}</span>
    </a>
  )
}

export default PhoneLink
