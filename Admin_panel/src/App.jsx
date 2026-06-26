import { useEffect, useState } from "react"
import "./App.css"
import Leftpanel from "./components/Leftpanel"
import { Outlet, ScrollRestoration } from "react-router-dom"
import { Link } from "react-router-dom";
import constant from "../constant"



function App() {
        const [adminName, setAdminName] = useState([])

        useEffect(() => {
                fetch(`${constant.domain}/admin/adminData`, {
                        method: "GET",
                        credentials: "include"
                }).then(res => {
                        return res.json();
                }).then(res => {
                        console.log(res);
                        
                        setAdminName(res)
                });
        }, [])

        return (
                <>
                        {adminName?.length >= 1 &&
                                <div className=" relative flex flex-row w-[100vw]">
                                        <Leftpanel adminName={adminName[0].name}  />
                                        <div>
                                                <Outlet />
                                                <ScrollRestoration />
                                        </div>
                                </div>
                        }
                        {adminName?.length < 1 &&
                                <div className="flex flex-col justify-center items-center h-[100vh] text-6xl bg-amber-200 p-4" >
                                        <Link to="/login">
                                                You are not login  
                                                <button className=" bg-red-400  p-4 border-2 border-gray-500 rounded-md text-white hover:bg-red-500 hover:border-cyan-400 active:text-black transition-all font-semibold"> Please Login</button>


                                        </Link>
                                </div>
                        }
                </>
        )
}

export default App
