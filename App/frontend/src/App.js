import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Login from './pages/Login'
import SearchResults from './pages/SearchResults'
import AlbumDetails from './pages/AlbumDetails'

function App() {
  return (
    <>
      <Router>
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
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
