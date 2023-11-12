export const formatDate = (dateStr: string = '') => {
  const dateObj = new Date(dateStr)
  const formattedDate = dateObj.toLocaleDateString(
    'en-US',
    {
      month: 'short',
      day: 'numeric',
    },
  )

  return formattedDate
}

export default formatDate

export const getMonthNumber = (monthName) => {
  const months = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ]
  return months.indexOf(monthName.toLowerCase()) + 1
}
