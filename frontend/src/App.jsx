/** @format */

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState } from 'react'
/// IMPORT PAGES
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Login from './pages/Login'
import SearchResults from './pages/SearchResults'
import AlbumDetails from './pages/AlbumDetails'
import CustomFieldUpdateListener from './components/listeners/CustomFieldUpdateListener'
import ThemeSetter from './components/listeners/ThemeSetter'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <div className='min-h-screen min-w-[100%]'>
      <Router>
        <ThemeSetter />
        <CustomFieldUpdateListener />
        <div className='  divide-y-2 divide-void dark:divide-stark'>
          <Navbar />
          <div
            className='
          font-inter text-center py-0 my-0 mx-auto'
          >
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
              <Route
                path='*'
                element={<NotFoundPage />}
              />
            </Routes>
          </div>
        </div>
      </Router>
      <ToastContainer
        className='toast-container'
        position='top-right'
        pauseOnFocusLoss={true}
        pauseOnHover={true}
        draggable={true}
        autoClose={3000}
        newestOnTop={true}
        limit={3}
        closeButton={false}
        closeOnClick={true}
      />
    </div>
  )
}

export default App
