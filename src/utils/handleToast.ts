import { toast } from 'react-toastify'

// Toast notifications helper
export const handleToast = ({ type = 'success', message = '' }) => {
  switch (type) {
    case 'success':
      toast.success(message)
      break
    case 'info':
      toast.info(message)
      break
    case 'error':
      toast.error(message)
      break
    case 'warn':
      toast.warn(message)
      break
    default:
      toast.success(message)
  }
}
