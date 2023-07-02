/** @format */

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaSearch, FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import vinylImage from '../media/flaminRecord.jpeg'
import DropdownMenu from './Dropdown'
import { setQueryReducer, searchAlbums } from '../features/search/searchSlice'

function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { requestPage } = useSelector((state) => state.search)

  const onLogout = () => {
    setSearchQuery('')
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
    console.log('logout')
  }

  const [searchQuery, setSearchQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(`request page: ${requestPage}`)
    dispatch(setQueryReducer(searchQuery)) // todo - remove this?
    dispatch(searchAlbums({ searchQuery, requestPage }))
    navigate(`/search/${searchQuery}`)
    setSearchQuery('')
  }

  if (user) {
    return (
      <div className='navbar bg-base-100'>
        <NavLogo onHome={() => setSearchQuery('')} />
        <div className='flex-none gap-2'>
          <div className='form-control'>
            <form onSubmit={handleSubmit}>
              <div className='join'>
                <input
                  type='search'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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

export default Navbar
