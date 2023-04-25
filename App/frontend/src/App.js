import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
/// IMPORT PAGES
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Login from './pages/Login'
import SearchResults from './pages/SearchResults'
import AlbumDetails from './pages/AlbumDetails'
import CustomFieldUpdateListener from './components/listeners/CustomFieldUpdateListener'
import NotFoundPage from './pages/NotFoundPage'

const App = () => {
  return (
    <>
      <Router>
        <CustomFieldUpdateListener />
        <Header />
        <div className='content'>
          <Routes>
            <Route
              path='/'
              element={<Dashboard />}
            />
            <Route
              path='/login'
              element={<Login />}
            />
            <Route
              path='/register'
              element={<Register />}
            />
            <Route
              path='/search/:query'
              element={<SearchResults />}
            />
            <Route
              path='/edit/:id'
              element={<AlbumDetails />}
            />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer
        className='toast-container'
        position='top-right'
        pauseOnFocusLoss={true}
        pauseOnHover={true}
        draggable={true}
        autoClose={6000}
        newestOnTop={true}
        limit={3}
        closeButton={false}
        closeOnClick={true}
      />
    </>
  )
}

export default App
