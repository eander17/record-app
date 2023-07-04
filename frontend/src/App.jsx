/** @format */
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
/// IMPORT PAGES
import PageRoutes from './components/PageRoutes'

function App() {
  return (
    <div className='min-h-screen'>
      <PageRoutes />
      <MyToastContainer />
    </div>
  )
}

function MyToastContainer() {
  return (
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
  )
}

export default App
