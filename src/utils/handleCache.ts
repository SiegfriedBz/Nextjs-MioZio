export const handleCache =
  process.env.NODE_ENV === 'production' ? 'force-cache' : 'no-store'
