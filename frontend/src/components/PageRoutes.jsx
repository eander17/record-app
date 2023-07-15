import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import AlbumDetails from '../pages/AlbumDetails'
import Dashboard from '../pages/Dashboard'
import EditAlbum from '../pages/EditAlbum'
import Login from '../pages/Login'
import NotFoundPage from '../pages/NotFoundPage'
import Register from '../pages/Register'
import SearchResults from '../pages/SearchResults'
import UserProfilePage from '../pages/UserProfilePage'
import Navbar from './Navbar'

function PageRoutes() {
  return (
    <Router>
      <div className='  divide-y-2'>
        <Navbar />
        <div className=''>
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
              path='/albums/:item'
              element={<AlbumDetails />}
            />
            <Route
              path='/albums/edit/:id'
              element={<EditAlbum />}
            />
            <Route
              path='/user/:username'
              element={<UserProfilePage />}
            />
            <Route
              path='*'
              element={<NotFoundPage />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default PageRoutes
