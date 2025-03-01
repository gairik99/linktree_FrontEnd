import './App.css'
import { Route, Routes } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import Home from './pages/Home'
import SignInPage from './pages/SigninPage'
import UserNameUpdatePage from './pages/UserNameUpdatePage'
import Link from './pages/Link'
import Analytics from './pages/Analytics'
import Appearance from './pages/Appearance'
import Settings from './pages/Settings'
import ProtectedRoute from './components/ProtectedRoute'
import ProfileDetailsPage from './pages/ProfileDetailsPage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/profile/:userid' element={<ProfileDetailsPage />} />
        <Route path='/usernameupdate' element={<ProtectedRoute><UserNameUpdatePage /></ProtectedRoute>} />
        <Route path='/' element={<Home />} />
        <Route path='/link' element={<ProtectedRoute><Link /></ProtectedRoute>} />
        <Route path='/analytics' element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        <Route path='/appearance' element={<ProtectedRoute><Appearance /></ProtectedRoute>} />
        <Route path='/settings' element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default App
