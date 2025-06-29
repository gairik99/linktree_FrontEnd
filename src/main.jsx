import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
// import { AuthProvider } from './context/authContext.jsx'
import { TabProvider } from './context/tabContext.jsx'
import { LinkProvider } from './context/linkContext.jsx'
import { StyleProvider } from './context/styleContext.jsx'
import { Provider } from 'react-redux'
import { store, persistor } from './store/store.jsx'
import { PersistGate } from 'redux-persist/integration/react';
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StyleProvider>
      <LinkProvider>
        <TabProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </PersistGate>
          </Provider>
        </TabProvider>
      </LinkProvider>
    </StyleProvider>
    <ToastContainer />
  </StrictMode >,
)
