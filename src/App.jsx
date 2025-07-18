// src/App.jsx
import { BrowserRouter } from 'react-router-dom'
import { StreamProvider } from './context/StreamContext'
import MainRoutes from './routes/MainRoute'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { MovieProvider } from './context/MovieContext'

const App = () => {
  return (
    <BrowserRouter>
    <MovieProvider>
      <StreamProvider>
        <Navbar/>
        <ToastContainer />
        <MainRoutes />
        <Footer />
      </StreamProvider>
      </MovieProvider>
    </BrowserRouter>
  )
}

export default App