import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import {QueryClient ,QueryClientProvider} from "@tanstack/react-query"
import {BrowserRouter} from "react-router-dom"
import {GoogleOAuthProvider} from "@react-oauth/google"
import "../src/Style/pageTheme.css"

const queryClient = new QueryClient();


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
