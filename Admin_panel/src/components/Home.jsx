import { useEffect, useState } from "react";
import constant from "../../constant"
import HomeElement from "./HomeElement";
import { Link } from "react-router-dom";
import "../App.css"

function Home() {

        // const [editButton, setEditButton] = useState(false);
        const [datas, setDatas] = useState([])
        const [count, setCount] = useState(null)



        useEffect(() => {
                fetch(`${constant.domain}/admin/userdata`, {
                        method: "GET",
                        credentials: "include"
                }).then(res => {
                        return res.json();
                }).then(res => {
                        console.log(res);

                        setDatas(res);
                        setCount(count + res.length)
                });
        }, [])


        return (
                <>

                        <div className=" flex flex-col  items-center w-[85vw] h-[100vh] p-[50px]   bg-gray-200 pt-[70px]">

                                <div className="flex flex-col text-center  justify-center border-2 w-[80%] text-xl">
                                        <div className="flex flex-row text-2xl font-bold font-serif ">
                                                <div className="flex-1 border-2 p-2 overflow-clip">S.no.</div>
                                                <div className="flex-2 border-2 p-2 ">Name</div>
                                                <div className="flex-2 border-2 p-2 ">Phone no.</div>
                                                <div className="flex-3 border-2 p-2 ">Email</div>
                                                <div className="flex-2 border-2 p-2 ">User/Admin</div>
                                                <div className="flex-2 border-2 p-2 ">Update</div>
                                        </div>

                                        {datas.map((ittr, index) => (
                                                <HomeElement ittr={ittr} index={index} setDatas={setDatas} count={count == datas.length ? index + 1 : (count - datas.length) + index + 1} />
                                        ))}

                                        {/* <HomeElement/> */}



                                        {/* <div className="flex flex-row uppercase   ">
                                                        <div className="flex-1 border-2 p-2 ">1.</div>
                                                        <div className="flex-2 border-2 p-2 ">neeraj</div>
                                                        <div className="flex-2 border-2 p-2">123456789</div>
                                                        <div className="flex-2 border-2 p-2">ExampleAbc@.gmail</div>
                                                        <div className="flex-2 border-2 p-2">Admin</div>
                                                        <div className="flex-2 border-2 p-2 flex flex-col justify-evenly items-center ">        
                                                                <button className=" bg-green-400 p-1 px-4 border-2 border-gray-500 rounded-md text-white hover:bg-green-500 hover:border-cyan-400 active:text-black transition-all font-semibold "  >{editButton ?  "Update": "Edit"}</button>
                                                        </div>
                                                </div> */}

                                </div>


                        </div>

                </>
        )
}

export default Home
