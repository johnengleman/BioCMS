export const formatDate = (dateStr: string = '') => {
  const dateObj = new Date(dateStr)
  const formattedDate = dateObj.toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
  )

  return formattedDate
}

export default formatDate
