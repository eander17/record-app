import { checkEquality } from '../../components/hooks/utilityHooks'

export const getListens = (listens) => {
  if (!listens) return 0
  // eslint-disable-next-line no-unused-vars
  return listens.reduce((total, listen) => total + 1, 0)
}

export const getYearlyListens = (listens, year) => {
  if (!listens) return 0

  return listens.reduce((total, listen) => {
    const date = new Date(listen)
    if (checkEquality(year, date.getFullYear())) return total + 1
    return total
  }, 0)
}

/// takes an array of timestamps (listen), a month, and a year.
/// returns the number of listens in that month and year.
export const getMonthlyListens = (listens, month, year) => {
  if (!listens) return 0

  return listens.reduce((total, listen) => {
    const date = new Date(listen)
    if (
      checkEquality(month, date.getMonth()) &&
      checkEquality(year, date.getFullYear())
    ) {
      return total + 1
    }
    return total
  }, 0)
}

export const getThisMonth = (listens) => {
  const date = new Date()
  return getMonthlyListens(listens, date.getMonth(), date.getFullYear())
}

export const getThisYear = (listens) => {
  const date = new Date()
  return getYearlyListens(listens, date.getFullYear())
}

export const getThisMonthAndYearListens = (listens) => ({
  thisMonthListens: getThisMonth(listens),
  thisYearListens: getThisYear(listens),
})

/// takes listen timestamp, and returns day, month, year, and time in object
export const extractDate = (timestamp) => {
  const date = new Date(timestamp)

  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const time = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  return { day, month, year, time }
}

// return time listened in hours, minutes, seconds.
export const getHoursMinSec = (time) => ({
  hours: getHours(time),
  minutes: getMinutes(time),
  seconds: getSeconds(time),
})

export const getHours = (time) => Math.floor(time / 3600)

export const getMinutes = (time) =>
  Math.floor((time - getHours(time) * 3600) / 60)

export const getSeconds = (time) =>
  Math.floor(time - getHours(time) * 3600 - getMinutes(time) * 60)

export const getMinSec = (runtime) => ({
  minutes: Math.floor(runtime / 60),
  seconds: runtime % 60,
})
