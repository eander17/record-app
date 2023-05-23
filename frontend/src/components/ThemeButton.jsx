/** @format */

import { FaMoon, FaSun } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../features/Theme/themeSlice'

const ThemeButton = () => {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.theme)

  const handleThemeSwitch = () => {
    dispatch(toggleTheme())
  }

  return (
    <div className='flex justify-end items-center justify-items-stretch px-2 py-1'>
      {theme === 'dark' ? (
        <button
          type='button'
          onClick={handleThemeSwitch}
          className='dark-mode-toggler '
        >
          <FaSun />
        </button>
      ) : (
        <button
          type='button'
          onClick={handleThemeSwitch}
          className='dark-mode-toggler '
        >
          <FaMoon />
        </button>
      )}
    </div>
  )
}

export default ThemeButton
