import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import vinylImage from '../media/flaminRecord.jpeg' // Import the image using a relative
import SearchBar from './SearchBar'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

  const handleSearch = (query) => {
    navigate(`/search/${query}`)
  }

  return (
    <header className='header'>
      <div className='container'>
        <div className='logo'>
          <Link to='/'>
            <img
              src={vinylImage}
              className='headerImg'
              alt='Flamin Record Icon'
            />
          </Link>
          <Link
            to='/'
            style={{ marginLeft: '8px' }}
            className='header-title'
          >
            <span className='app-title'> Record App</span>
          </Link>
        </div>

        <ul>
          {user && (
            <li>
              <SearchBar
                placeholder={'Add a new album'}
                onSubmit={handleSearch}
                className='header-bar'
              />
            </li>
          )}

          {user ? (
            <li>
              <button
                className='btn'
                onClick={onLogout}
              >
                <FaSignOutAlt />
                <span className='logout-text'>Log out</span>
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to='/login'>
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li>
                <Link to='/register'>
                  <FaUser /> Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  )
}
export default Header
