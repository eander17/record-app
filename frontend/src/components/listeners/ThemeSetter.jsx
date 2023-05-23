/** @format */

import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const ThemeSetter = () => {
  const theme = useSelector((state) => state.theme)

  useEffect(() => {
    theme === 'dark'
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark')
  }, [theme])

  return null
}

export default ThemeSetter
