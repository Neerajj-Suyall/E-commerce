import { useEffect, useState } from "react";
import constant from "../../constant";
import ReportElement from "./ReportElement";
import "../App.css"

function Report() {

        // const [editButton, setEditButton] = useState(false);
        const [datas, setDatas] = useState([])
        const [count, setCount] = useState(null)


        useEffect(() => {
                fetch(`${constant.domain}/userOrder/latest`, {
                        method: "GET",
                        credentials: "include"
                }).then(res => {
                        return res.json();
                }).then(res => {
                        console.log(res);
                        console.log(res.length);
                        
                        setDatas(res);
                        setCount(count + res.length)
                });
        }, [])


        return (
                <>
                        <div className=" flex flex-col  items-center ml-[15vw] w-[85vw] h-[100vh] p-[50px]   bg-gray-200 pt-[70px]">

                                <div className="flex flex-col text-center  justify-center border-2 w-[75vw] text-xl">
                                        <div className="flex flex-row text-2xl font-bold font-serif ">
                                                 <div className="flex-1 border-2 p-2 ">S. no.</div>
                                                <div className="flex-2 border-2 p-2 ">Name</div>
                                                <div className="flex-2 border-2 p-2 ">Address</div>
                                                <div className="flex-2 border-2 p-2 ">Date</div>
                                        </div> 

                                        {/* {datas.map((ittr, index)=>(
                                                <HomeElement ittr={ittr} index={index} setDatas={setDatas} count={count == datas.length ? index + 1 : (count - datas.length) + index + 1}/>
                                        ))} */}

                                        {datas.length >= 1 && datas.map((ittr, index)=>(
                                                <ReportElement ittr={ittr} index={index} count={count == datas.length ? index + 1 : (count - datas.length) + index + 1}/>
                                        ))}
                                        
                                </div>


                        </div>
                        
                </>
        )
}

export default Report
