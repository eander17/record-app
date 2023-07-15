import { useEffect, useRef, useState } from 'react'

export const LOCAL_STORAGE_KEY = 'record-app-'

/// HOOK: uses state to manage items in local storage.
// info: use to set a value in local storage, and return the value and a function to set the value
// info: use to manage a value with local storage.
// @param: key: string, key to name localStorage item
// @param: initialValue: any, value to set localStorage item to if it doesn't exist
// @return: [value, setValue]: array, value is the value of the localStorage item, setValue is a function to set the value of the localStorage item
export function useLocalStorage(key, initialValue) {
  const prefixedKey = `${LOCAL_STORAGE_KEY}${key}`
  const [value, setValue] = useState(() => getSavedValue(key, initialValue))

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [value])
  return [value, setValue]
}

/// retrieves item matching key from local storage, parses it, and returns it
export const retrieveFromLocalStorage = (key) => {
  const prefixedKey = LOCAL_STORAGE_KEY + key
  const storedValue = localStorage.getItem(prefixedKey)
  if (!storedValue) return null
  return JSON.parse(storedValue)
}

export const setLocalStorage = (key, value) => {
  const prefixedKey = `${LOCAL_STORAGE_KEY}${key}`
  localStorage.setItem(prefixedKey, JSON.stringify(value))
}

export const removeLocalStorage = (key) => {
  const prefixedKey = LOCAL_STORAGE_KEY + key
  localStorage.removeItem(prefixedKey)
}

/// clears all local storage items matching key prefix
export const clearAllLocalStorage = () => {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(LOCAL_STORAGE_KEY)) localStorage.removeItem(key)
  })
}

/// returns a function that will set the state of the variable to the value passed to the function
export const useVariableTest = (variable, condition) => {
  const [testResult, setTestResult] = useState(false)

  const performTest = () => {
    setTestResult(condition(variable))
  }

  return [testResult, performTest]
}

/// logs change of variables and location of change to console
export const useValueLogger = (value, name) => {
  const valueRef = useRef(value)

  useEffect(() => {
    if (value !== valueRef.current) {
      console.log(`${name} changed from ${valueRef.current} to ${value}`)
      valueRef.current = value
    }
  }, [value, name])
}
