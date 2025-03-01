import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './context/authContext.jsx'
import { TabProvider } from './context/tabContext.jsx'
import { LinkProvider } from './context/linkContext.jsx'
import { StyleProvider } from './context/styleContext.jsx'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StyleProvider>
      <LinkProvider>
        <TabProvider>
          <AuthProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </AuthProvider>
        </TabProvider>
      </LinkProvider>
    </StyleProvider>
    <ToastContainer />
  </StrictMode>,
)
