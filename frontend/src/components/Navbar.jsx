/** @format */

import { Link, useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import vinylImage from '../media/flaminRecord.jpeg'
import SearchBar from './SearchBar'
import DropdownMenu from './Dropdown'

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
    navigate(`/search/${query}`)
  }

  if (user) {
    return (
      <div className='navbar bg-base-100'>
        <NavLogo />

        <div className='flex-none gap-2'>
          <div className='form-control'>
            <SearchBar
              handleSearch={handleSearch}
              placeholder={'Add a New Album'}
            />
          </div>
          <div className='dropdown dropdown-end'>
            <label
              tabIndex={0}
              className='btn btn-ghost btn-circle avatar'
            >
              <div className='w-10 text-center rounded-full'>
                <FaUser className='text-3xl mt-1 ml-1' />
              </div>
            </label>
            <ul
              tabIndex={0}
              className='mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52'
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

const NavLogo = () => {
  return (
    <div className='flex-1'>
      <Link
        to='/'
        className='md:w-16 md:h-16 w-12 h-12 sm:ml-3 ml-0 rounded-full'
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

// <header className='h-[100%] py-2 flex '>
//   {/* // class name was container */}
//   <div className=' flex flex-col sm:flex-row justify-between items-center w-full h-auto my-0 text-center'>
//     {/* class name was logo */}
//     <div className='flex items-center justify-start text-start font-lg font-bold py-1'>
//       <Link to='/'>
//         <img
//           src={vinylImage}
//           alt={`flamin' record icon`}
//           className='md:w-16 md:h-16 w-12 h-12 sm:ml-3 ml-0 rounded-full'
//         />
//       </Link>
//       <h3 className='ml-2 pt-3 text-2xl font-bold cursor-default underline  decoration-2 underline-offset-2'>
//         Vinyl Collector
//       </h3>
//     </div>
//     <div className='flex items-center'>
//       {user && (
//         <SearchBar
//           placeholder={'Add a New Album'}
//           onSubmit={handleSearch}
//         />
//       )}
//     </div>
//   </div>
//   <div className='mt-4'>
//     <DropdownMenu />
//   </div>
// </header>
