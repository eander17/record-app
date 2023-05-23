/** @format */

import { Link, useNavigate } from 'react-router-dom'
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

  return (
    <header className='h-[100%] py-2 flex dark:bg-void bg-stark'>
      {/* // class name was container */}
      <div className=' flex flex-col sm:flex-row justify-between items-center w-full h-auto my-0 text-center'>
        {/* class name was logo */}
        <div className='flex items-center justify-start text-start font-lg font-bold py-1'>
          <Link to='/'>
            <img
              src={vinylImage}
              alt={`flamin' record icon`}
              className='md:w-16 md:h-16 w-12 h-12 sm:ml-3 ml-0 rounded-full'
            />
          </Link>
          <h3 className='ml-2 pt-3 text-2xl font-bold cursor-default underline decoration-void decoration-2 underline-offset-2'>
            Vinyl Collector
          </h3>
        </div>
        <div className='flex items-center'>
          {user && (
            <SearchBar
              placeholder={'Add a New Album'}
              onSubmit={handleSearch}
            />
          )}
        </div>
      </div>
      <div className='mt-4'>
        <DropdownMenu user={user} />
      </div>
    </header>
  )
}

export default Navbar
