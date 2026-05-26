import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './components/Home.jsx'
import Offers from './components/Offers.jsx'
import Login from './components/login.jsx'
import Register from './components/Register.jsx'
import Cart from './components/Cart.jsx'
import Booking from './components/Booking.jsx'
import Orderhistory from './components/Orderhistory.jsx'
import Invoice from './components/Invoice.jsx'
import LogOut from './components/LogOut.jsx'
import DetailElement from './components/DetailElement.jsx'
import { Provider } from 'react-redux'
import { store } from '../store/store.js'
import ProductDetails from './components/ProductDetails.jsx'
import UserProfile from './components/UserProfile.jsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
                <Route path='/Register' element={<Register />} />
                <Route path='/Login' element={<Login />} />
                <Route path='/Logout' element={<LogOut />} />
                <Route path='/App' element={<App />}>
                        <Route path='Home' element={<Home />} />
                        <Route path='Offers' element={<Offers />} />
                        <Route path='Cart' element={<Cart />} />
                        <Route path='Orders' element={<Orderhistory />} />
                        <Route path='Profile' element={< UserProfile/>} />
                        <Route path='Invoice/:id' element={< Invoice/>} />
                        <Route path='Product/Booking/:id' element={<Booking />} />
                        <Route path='Product/Details/:id' element={<ProductDetails />} />
                        <Route path='Products/Search/:Searching' element={<DetailElement />} />
            </Route>
        </>
    )
)


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>,
)
