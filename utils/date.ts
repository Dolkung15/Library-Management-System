export function findClosestFutureDate(
  currentDate: string,
  dateList: { [key: string]: any; date: string }[]
): { [key: string]: any; date: string } | null {
  const currentDateObj = new Date(currentDate)
  let closestFutureDate: { [key: string]: any; date: string } | null = null

  for (const item of dateList) {
    const dateObj = new Date(item.date)

    if (dateObj > currentDateObj) {
      if (!closestFutureDate || dateObj < new Date(closestFutureDate.date)) {
        closestFutureDate = item
      }
    }
  }

  return closestFutureDate ? closestFutureDate : null;
}
