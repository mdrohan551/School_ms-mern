import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from "react-hot-toast";
import App from './App.jsx'
import { Provider } from "react-redux";
import { Store } from './redux/store/Store.js'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={Store}>
            <Toaster
                reverseOrder={false} />
            <App />
        </Provider>
    </StrictMode>,
)
