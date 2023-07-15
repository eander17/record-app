/** @format */

import { useEffect, useRef } from 'react'
import { FaSearch, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { logout, reset } from '../features/auth/authSlice'
import { updateAlbum } from '../features/collection/albumSlice'
import {
  resetSearch,
  searchAlbums,
  updateSearchQuery,
} from '../features/search/searchSlice'
import vinylImage from '../media/flaminRecord.jpeg'
import DropdownMenu from './Dropdown'
import { clearAllLocalStorage } from './hooks/utilityHooks'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { query } = useSelector((state) => state.search)

  useLeaveAlbumPage(location.pathname, () => {
    console.log('callback triggered, leaving page')
    dispatch(updateAlbum())
  })

  // todo - clean logout function
  const onLogout = () => {
    clearAllLocalStorage()
    dispatch(resetSearch())
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
    console.log('logout')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(searchAlbums())
    navigate(`/search/${query}`)
  }

  const onHome = () => {
    resetSearch()
  }

  if (user) {
    return (
      <div className='navbar bg-base-100'>
        <NavLogo onHome={onHome} />
        <div className='flex-none gap-2'>
          <div className='form-control'>
            <form onSubmit={handleSubmit}>
              <div className='join'>
                <input
                  type='search'
                  value={query}
                  onChange={(e) => dispatch(updateSearchQuery(e.target.value))}
                  placeholder='Add a New Album'
                  className='input-bordered input-primary input join-item'
                />
                <button
                  type='submit'
                  className='btn btn-secondary join-item'
                >
                  <FaSearch />
                </button>
              </div>
            </form>
          </div>
          <ProfileDropdown onLogout={onLogout} />
          <div className='form-control'>
            <DropdownMenu />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='navbar bg-base-100'>
      <NavLogo />
      <div className='flex-none'>
        <ul className='menu menu-horizontal px-1'>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/register'>Register</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

// todo - validate props
// eslint-disable-next-line react/prop-types
function ProfileDropdown({ onLogout }) {
  return (
    <div className='dropdown-end dropdown'>
      <span
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        className='btn-ghost btn-circle avatar btn'
      >
        <div className='w-10 rounded-full text-center'>
          <FaUser className='ml-1 mt-1 text-3xl' />
        </div>
      </span>
      <ul
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        className='dropdown-content menu rounded-box menu-sm bg-base-100 z-[1] mt-3 w-52 p-2 shadow'
      >
        <li>
          <Link to='/profile'>Profile</Link>
        </li>
        <li>
          <Link to='/settings'>Settings</Link>
        </li>
        <li>
          <button
            type='button'
            onClick={onLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

// Navbar logo component for DRYness.
// eslint-disable-next-line react/prop-types
function NavLogo({ onHome }) {
  return (
    <div className='flex-1'>
      <Link
        onClick={onHome}
        to='/'
        className='ml-0 h-12 w-12 rounded-full sm:ml-3 md:h-16 md:w-16'
      >
        <img
          src={vinylImage}
          alt='flamin record icon'
        />
      </Link>
      <article className='prose lg:prose-xl'>
        <h2 className='ml-4'>Record App</h2>
      </article>
    </div>
  )
}

const useLeaveAlbumPage = (pathname, callback) => {
  console.log()
  const prevPathname = useRef()
  useEffect(() => {
    if (prevPathname.current && prevPathname.current.includes('/album')) {
      callback()
    }
    prevPathname.current = pathname
  }, [pathname, callback])
}

export default Navbar
