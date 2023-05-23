/** @format */
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaBars,
} from 'react-icons/fa'
import { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout, reset } from '../features/auth/authSlice'
import ThemeButton from './ThemeButton'

const Dropdown = ({ user }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // logs user out, resets state, and navigates to login page
  const onLogout = () => {
    setIsOpen(!isOpen)
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

  // navigates to path and closes dropdown
  const navigator = (path) => {
    setIsOpen(!isOpen)
    navigate(path)
  }

  useEffect(() => {
    // listens for clicks outside of dropdown and closes it
    const handleOutsideClick = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  return (
    <div
      className='relative'
      ref={dropdownRef}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='block h-8 w-24 overflow-hidden'
      >
        <FaBars className='text-void dark:text-jewel h-full w-full  ' />
      </button>
      {isOpen && (
        <div className='absolute mr-2 right-0 min-w-max py-1 mt-2 bg-white border border-gray-300 rounded-lg shadow-xl '>
          {user ? (
            <button
              onClick={onLogout}
              className='flex justify-start items-center justify-items-stretch px-2 py-1 text-void hover:bg-jewel hover:text-stark font-medium'
            >
              <FaSignOutAlt className=' mb-1' />
              <span className='px-2 text-sm'>Sign Out</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => navigator('/login')}
                className='flex justify-start items-center justify-items-stretch px-2 py-1 text-void hover:bg-jewel hover:text-stark font-medium'
              >
                <FaSignInAlt className=' mb-1' />
                <span className='px-2 text-sm'>Sign In</span>
              </button>
              <button
                onClick={() => navigator('/register')}
                className='flex justify-start items-center justify-items-stretch px-2 py-1 text-void hover:bg-jewel hover:text-stark font-medium'
              >
                <FaUser className='  mb-1' />
                <span className='px-2 text-sm'>Register</span>
              </button>
            </>
          )}
          <ThemeButton />
        </div>
      )}
    </div>
  )
}

export default Dropdown
