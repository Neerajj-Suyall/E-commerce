import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Product from './components/Product.jsx'
import Report from './components/Report.jsx'
import LogOut from './components/LogOut.jsx'
import Testing from './components/Testing.jsx'
// import { Provider } from 'react-redux'


const router = createBrowserRouter(
    createRoutesFromElements(
        <>
                <Route path='/Register' element={<Register />} />
                <Route path='/Testing' element={<Testing />} />
                <Route path='/Login' element={<Login />} />
                <Route path='/Logout' element={<LogOut />} />
                <Route path='/Admin' element={<App />}>
                        <Route path='Home' element={<Home />} />
                        <Route path='Product' element={<Product />} />
                        <Route path='Report' element={<Report />} />
            </Route>
        </>
    )
)


createRoot(document.getElementById('root')).render(
    <StrictMode>

            <RouterProvider router={router} />

    </StrictMode>,
)
