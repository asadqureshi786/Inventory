import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from '../src/store/store.js'
import { Provider } from 'react-redux'
import { AuthProvider } from './AuthContext.jsx'
import { Toaster } from "react-hot-toast";


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AuthProvider>
    <App />
      <Toaster position="top-right" reverseOrder={false}    toastOptions={{
          duration: 3000,
          style: {
            background: "#07061F",
            color: "#fff",
            fontSize: "14px",
            fontWeight: "500",
            borderRadius: "8px",
            padding: "12px 16px",
            border: '1px solid #4b4b4b',
            boxShadow:
              "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
          },
          success: {
            style: {
              borderLeft: "3px solid #22c55e",
            },
          },
          error: {
            style: {
              borderLeft: "5px solid #ef4444",
            },
          },
        }} />
    </AuthProvider>
  </Provider>,
)
