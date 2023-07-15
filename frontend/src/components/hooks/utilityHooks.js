import { useEffect, useRef, useState } from 'react'

export const LOCAL_STORAGE_KEY = 'record-app-'

/// stores and manages state of item matching key in local storage
export const useLocalStorage = (key, initialValue) => {
  const prefixedKey = `${LOCAL_STORAGE_KEY}${key}`

  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(prefixedKey)
    return storedValue ? JSON.parse(storedValue) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [prefixedKey, value])
  return [value, setValue]
}

/// retrieves item matching key from local storage, parses it, and returns it
export const retrieveFromLocalStorage = (key) => {
  const prefixedKey = LOCAL_STORAGE_KEY + key
  const storedValue = localStorage.getItem(prefixedKey)
  return storedValue !== null ? JSON.parse(storedValue) : null
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

export const checkEquality = (a, b) => JSON.stringify(a) === JSON.stringify(b)

export const emptyObject = (obj) => Object.keys(obj).length === 0
