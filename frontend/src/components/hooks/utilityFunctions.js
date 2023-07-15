export const getErrorMessage = (error) =>
  (error.response && error.response.data && error.response.data.message) ||
  error.message ||
  error.toString()

export const checkEquality = (a, b) => JSON.stringify(a) === JSON.stringify(b)

export const emptyObject = (obj) => Object.keys(obj).length === 0
