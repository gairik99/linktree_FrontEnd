import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './context/authContext.jsx'
import { TabProvider } from './context/tabContext.jsx'
import { LinkProvider } from './context/linkContext.jsx'
import { StyleProvider } from './context/styleContext.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.jsx'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StyleProvider>
      <LinkProvider>
        <TabProvider>
          <AuthProvider>
            <Provider store={store}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </Provider>
          </AuthProvider>
        </TabProvider>
      </LinkProvider>
    </StyleProvider>
    <ToastContainer />
  </StrictMode>,
)
