/** @format */

import { Link, useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import vinylImage from '../media/flaminRecord.jpeg'
import SearchBar from './SearchBar'
import DropdownMenu from './Dropdown'
import { setQueryReducer } from '../features/search/searchSlice'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
    console.log('logout')
  }

  const handleSearch = (query) => {
    dispatch(setQueryReducer(query))
    navigate(`/search/${query}`)
  }

  if (user) {
    return (
      <div className='navbar bg-base-100'>
        <NavLogo />
        <div className='flex-none gap-2'>
          <div className='form-control'>
            <SearchBar
              onSubmit={handleSearch}
              placeholder={'Add a New Album'}
            />
          </div>
          <div className='dropdown-end dropdown'>
            <label
              tabIndex={0}
              className='btn-ghost btn-circle avatar btn'
            >
              <div className='w-10 rounded-full text-center'>
                <FaUser className='ml-1 mt-1 text-3xl' />
              </div>
            </label>
            <ul
              tabIndex={0}
              className='dropdown-content menu rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow'
            >
              <li>
                <Link to='/profile'>Profile</Link>
              </li>
              <li>
                <Link to='/settings'>Settings</Link>
              </li>
              <li>
                <button onClick={onLogout}>Logout</button>
              </li>
            </ul>
          </div>
          <div className='form-control'>
            <DropdownMenu />
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
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
}

// Navbar logo component for DRYness.
const NavLogo = () => {
  return (
    <div className='flex-1'>
      <Link
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
