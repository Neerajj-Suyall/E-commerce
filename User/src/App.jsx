// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import React, { useState }  from 'react';
import "./App.css"
import Header from "./components/Header"
import { Link, Outlet, ScrollRestoration } from "react-router-dom"
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import constant from "../constant.js";
import { cartValue } from "../slice/cartSlice.js";
import {  allNotificationEnd, notificationKill, oneNotification } from "../slice/notificationSlice.js";
import { useEffect } from "react";
import { useState } from "react";





function App() {
        const cartRedux = useSelector((state) => state.notification, shallowEqual);

        const dispatch = useDispatch();
        const [username, setUsername] = useState(null);

        ; (() => {
                fetch(`${constant.domain}/cart/items`, {
                        method: "GET",
                        credentials: "include"
                }).then(res => {
                        return res.json();
                }).then(res => {

                        if (res == null || res.length < 1) return
                        let temp = res.map(val => { return { ...val, status: true } })
                        dispatch(cartValue(temp))
                        console.log("app.js = ", res);

                });
        })();

        useEffect(() => {
                fetch(`${constant.domain}/user/header/name`, {
                        method: "GET",
                        credentials: "include"
                }).then(res => {
                        return res.json();
                }).then(res => {
                        if (res[0].length < 1) return
                        setUsername(res[0].name)
                        return
                });
        }, [])

        const hideAlert = () => {
                console.log("allNotificationEnd");

                dispatch(allNotificationEnd())
        }

        // useEffect(() => {
        //         (cartRedux.length >= 1) &&
        //         setTimeout(() => {
        //                 dispatch(oneNotification(0))        
        //         }, 3000)
        // }, [cartRedux] )

        // useEffect(() => {
        //         console.log("cartRedux", cartRedux);
        // }, [cartRedux])

        return (

                //  {(username === null) &&
                <div className="top_root relative">
                {(username !== null) &&
                 <>
                        <Header />
                                <div className="flex flex-col wrap-normal fixed top-[50px] right-0  justify-center items-center rounded-lg bg-transparent gap-3" > 
                                {cartRedux.map((ittr, index) => (
                                        <div className="flex flex-row border-2 border-cyan-400 bg-blue-200  rounded-lg ">
                                                <div className='  text-3xl p-2  border-2 rounded-lg bg-cyan-50 m-2 font-semibold font-mono border-gray-400' key={index}>{index + 1}.{ittr}
                                                           <button className="border-2  ml-2 p-1 px-4 w-fit rounded-lg bg-red-200 font-semibold hover:bg-red-300  active:bg-red-500  active:text-white" onClick={e =>dispatch(oneNotification(index))} >Hide </button>
                                                </div>
                                        </div>
                                        ))}
                                 </div>           
                        <Outlet />
                        <ScrollRestoration />
                </>
                                }

                  {(username === null) &&
                        <div className="flex flex-col justify-center items-center h-[100vh] text-6xl bg-amber-200 p-4" >
                                        <Link to="/login">
                                                You are not login  
                                                <button className=" bg-red-400  p-4 border-2 border-gray-500 rounded-md text-white hover:bg-red-500 hover:border-cyan-400 active:text-black transition-all font-semibold"> Please Login</button>


                                        </Link>
                                </div>
                 }

                </div>
                // 
               
                       
        )
}

export default App
