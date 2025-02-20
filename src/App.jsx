import './App.css'
import SignupPage from './pages/SignupPage'
import SignInPage from './pages/SigninPage'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/signin' element={<SignInPage />} />
      </Routes>
    </>
  )
}

export default App
