import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import image from '../assets/Image'
import "../App.css"
import constant from "../../constant.js";
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { userNotification } from "../../slice/notificationSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




function Header({
        username
}) {
        //   const [count, setCount] = useState(0)
        // const [username, setUsername] = useState(null);
        const [searchValue, setSearchValue] = useState('');
        const navigate = useNavigate();
        const dispatch = useDispatch();

        const cartRedux = useSelector((state) => state.cart);


        const searchItem = () => {
                if ((searchValue != null) && (searchValue.length >= 4))
                        // alert(searchValue)
                        navigate(`products/search/${searchValue}`);
                toast.success("Search Result ");
                //  dispatch(userNotification("Search Result "))
        }

        // useEffect(() => {
        //         fetch(`${constant.domain}/user/header/name`, {
        //                 method: "GET",
        //                 credentials: "include"
        //         }).then(res => {
        //                 return res.json();
        //         }).then(res => {
        //                 if (res[0].length < 1) return
        //                 setUsername(res[0].name)
        //                 return
        //         });
        // }, [])


        // useEffect(() => {
        //         console.log("username", username);
        //         console.log("redux", cartRedux.cartData);


        // }, [username, cartRedux.cartData])
        return (

                <div className='header_main relative '>
                        <div className="header_flex_row center w-[100vw] ">
                                <div className="header1 p-2"><img src={image.Logo} alt="" /></div>
                                <div className="header2 header_flex_row flex-8 ">
                                        <div className='center'>
                                                <input type="Search" placeholder='Search items ...' className='p-[1px] pl-2 pr-2 rounded-lg border-2  border-gray-400 text-[18px]' value={searchValue} onChange={(e) => setSearchValue(() => e.target.value)} />
                                                <input type="button" className=' header_button bg-green-100' value="Search" onClick={searchItem} />
                                        </div>
                                        <NavLink to='/app/home' className={({ isActive }) => ` header_button center ${isActive ? " bg-cyan-100 " : "bg-gray-200"}`}> home </NavLink>

                                        <NavLink to='/app/offers' className={({ isActive }) => ` header_button center ${isActive ? " bg-cyan-100" : "bg-gray-200"}`}>Offers</NavLink>
                                </div>
                                <div className="header2  flex-2 ">
                                        <NavLink to="/App/Cart" className={({ isActive }) => ` header_button center ${isActive ? " bg-cyan-100 " : "bg-gray-200"}`}>

                                                <span className='center ' >Cart : </span>
                                                <span className='  center font-bold  px-2 '>{cartRedux?.length}</span>
                                        </NavLink>
                                </div>



                                <div>
                                        {(username === null) &&
                                                <NavLink to="/login" className="header3 header_flex_row ">
                                                        <button className=' header_button center '> Login</button>
                                                </NavLink>
                                        }

                                        {(username !== null) &&
                                                <div className="group  relative  mr-[110px] ">
                                                        <button type="button" className="text-3xl header_button inline-flex justify-center w-full rounded-md border border-gray-300 bg-gray-200  font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 uppercase" >
                                                                <img src={image.DropDown} alt="DropDown" className='h-6 ' />
                                                                {/* <span className='rotate-180 font-extrabold '>^  </span> */}
                                                                {username}
                                                        </button>

                                                        {/* Dropdown Menu (Visible on Hover) */}
                                                        <div
                                                                className="group-hover:block bg-gray-100 absolute  group-hover:h-fit  hidden  border-2 border-gray-400 rounded-md">
                                                                <div className="p-1 flex flex-col gap-1 ">
                                                                        <NavLink to="/App/Cart" className={({ isActive }) => ` block px-4 py-1 text-sm text-gray-700 hover:bg-gray-300 hover:border-cyan-500 font-semibold border-2 border-gray-300 rounded-md ${isActive ? " bg-cyan-100 " : "bg-gray-200"}`}>
                                                                                Cart
                                                                        </NavLink>
                                                                        <NavLink to="/App/Orders" className={({ isActive }) => ` block px-4 py-1 text-sm text-gray-700 hover:bg-gray-300 hover:border-cyan-500 font-semibold border-2 border-gray-300 rounded-md ${isActive ? " bg-cyan-100 " : "bg-gray-200"}`}>
                                                                                Order
                                                                        </NavLink>
                                                                        <NavLink to="/App/Profile" className={({ isActive }) => ` block px-4 py-1 text-sm text-gray-700 hover:bg-gray-300 hover:border-cyan-500 font-semibold border-2 border-gray-300 rounded-md ${isActive ? " bg-cyan-100 " : "bg-gray-200"}`}>
                                                                                Account Details
                                                                        </NavLink>
                                                                        <NavLink to="/Logout" className={({ isActive }) => ` block px-4 py-1 text-sm text-gray-700 hover:bg-gray-300 hover:border-cyan-500 font-semibold border-2 border-gray-300 rounded-md ${isActive ? " bg-cyan-100 " : "bg-gray-200"}`}>
                                                                                Log Out
                                                                        </NavLink>
                                                                </div>
                                                        </div>
                                                </div>
                                        }
                                </div>

                        </div>
                </div>
        )
}

export default Header
