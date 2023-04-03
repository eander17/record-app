import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// Components to be rendered
import Header from './components/Header'
import AlbumForm from './components/AlbumForm'
import AlbumList from './components/AlbumList'
import { AlbumProvider } from './context/AlbumContext'

function App() {
  return (
    <AlbumProvider>
      <Router>
        <Header />
        <div className='container'>
          <Routes>
            <Route
              exact
              path='/'
              element={
                <>
                  <AlbumForm />
                  <AlbumList />
                </>
              }
            ></Route>
          </Routes>
        </div>
      </Router>
    </AlbumProvider>
  )
}

export default App
