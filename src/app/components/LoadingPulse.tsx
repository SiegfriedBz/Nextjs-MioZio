const LoadingPulse = () => {
  return (
    <div className='flex justify-center space-x-2'>
      <span className='inline-block h-4 w-4 animate-pulse rounded-full bg-tertiary'></span>
      <span className='inline-block h-4 w-4 animate-pulse rounded-full bg-tertiary'></span>
      <span className='inline-block h-4 w-4 animate-pulse rounded-full bg-tertiary'></span>
    </div>
  )
}

export default LoadingPulse
