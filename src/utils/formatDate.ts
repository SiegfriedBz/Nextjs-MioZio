export const formatDate = (dateString: string) => {
  const date = new Date(dateString)

  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
  }

  return new Intl.DateTimeFormat('en-US', options).format(date)
}
