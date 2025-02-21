import './App.css'
import { Route, Routes } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import Home from './pages/Home'
import SignInPage from './pages/SigninPage'
import UserNameUpdatePage from './pages/UserNameUpdatePage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/usernameupdate' element={<UserNameUpdatePage />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  )
}

export default App
