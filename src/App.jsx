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

function App() {

  return (
    <>
      <Routes>
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/usernameupdate' element={<UserNameUpdatePage />} />
        <Route path='/' element={<Home />} />
        <Route path='/link' element={<Link />} />
        <Route path='/analytics' element={<Analytics />} />
        <Route path='/appearance' element={<Appearance />} />
        <Route path='/settings' element={<Settings />} />
      </Routes>
    </>
  )
}

export default App
