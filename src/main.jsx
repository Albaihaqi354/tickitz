import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import Router from './Router.jsx'
import { UserProvider } from './contexts/userManagement/UserProvider.jsx'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> 
        <UserProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </UserProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)