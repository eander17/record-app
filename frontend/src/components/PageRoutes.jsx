import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './Navbar'
import Dashboard from '../pages/Dashboard'
import Register from '../pages/Register'
import Login from '../pages/Login'
import SearchResults from '../pages/SearchResults'
import AlbumDetails from '../pages/AlbumDetails'
import EditAlbum from '../pages/EditAlbum'
import UserProfilePage from '../pages/UserProfilePage'
import NotFoundPage from '../pages/NotFoundPage'

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
              path='/albums/:id'
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
