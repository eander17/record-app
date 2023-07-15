import { useEffect, useState } from 'react'

const LOCAL_STORAGE_KEY = 'record-app-'

/// HOOK: uses state to manage items in local storage.
// info: use to set a value in local storage, and return the value and a function to set the value
// info: use to manage a value with local storage.
// @param: key: string, key to name localStorage item
// @param: initialValue: any, value to set localStorage item to if it doesn't exist
// @return: [value, setValue]: array, value is the value of the localStorage item, setValue is a function to set the value of the localStorage item
const useLocalStorage = (key, initialValue) => {
  const prefixedKey = `${LOCAL_STORAGE_KEY}${key}`
  const [value, setValue] = useState(() => getSavedValue(key, initialValue))

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [value])
  return [value, setValue]
}

function getSavedValue(key, initialValue) {
  const prefixedKey = `${LOCAL_STORAGE_KEY}${key}`
  const savedValue = JSON.parse(localStorage.getItem(prefixedKey))
  if (savedValue) return savedValue

  if (initialValue instanceof Function) return initialValue()
  return initialValue
}

export default useLocalStorage
