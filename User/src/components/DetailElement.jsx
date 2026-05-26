import { useEffect, useState } from "react";
import "../App.css"
import { useParams } from "react-router-dom"
import image from "../assets/Image/index.js"
import { Link } from "react-router-dom";
import Card from "./Card.jsx"

function DetailElement() {
        const { Searching } = useParams();
        const [datas, setDatas] = useState()
        const [count, setCount] = useState(0)


        useEffect(() => {
                console.log("id", Searching);

                fetch(`http://localhost:3002/products/search/${Searching}`, {
                        method: "GET",
                        credentials: "include"
                }).then(res => {
                        return res.json();
                }).then(res => {
                        console.log(res);
                        console.log(res.category);
                        if (res == null) return
                        console.log(res);

                        setDatas(res);
                        setCount(res.length)
                });


        }, [])


        const extraSearch = ( button ,e)=>{
                  fetch(`http://localhost:3002/products/search/${Searching}/${button}`, {
                //   fetch(`http://localhost:3002/products/abcd/${Searching}`, {
                        method: "POST",
                         headers: {
                                "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                                jump :e
                        }),
                        credentials: "include"
                }).then(res => {
                        return res.json();
                }).then(res => {
                        console.log(res);
                        // console.log(res.category);
                        if (res == null) return
                        console.log(res);

                        setDatas(res);
                        setCount(count + res.length)
                });
        }


        const handleClick = (e)=>{
                console.log(e.target.id);
                console.log(e.target.id === "Next" && datas.length >=28);
                

                if (e.target.id === "Next" && datas.length >=28) {
                        extraSearch(e.target.id ,count)
                        return
                } else if (e.target.id === "Previous" && count != datas.length ) {
                        extraSearch(e.target.id , count -  datas.length - datas.length )
                        return
                }
                return
        }




        return (
                <div  onClick={handleClick}>
                        <div className='home_main'>
                                {
                                        (datas?.length >= 1) &&

                                        datas.map((ittr, index) => (
                                                <Card  ittr={ittr} imgsrc={ittr.category[0] + (Math.floor(Math.random() * 10) + 1)}  />

                                        ))
                                }
                        </div>
                        <div className=" flex flex-row justify-center items-center gap-5">

                                        {(count != datas?.length ) &&
                                                <button className=" h-fit py-2 px-4 rounded-md border hover:bg-blue-100 active:bg-cyan-100 active:border-cyan-600  font-semibold text-2xl" id="Previous">Previous</button>
                                        }

                                        {(datas?.length == 28 && count >= datas?.length ) &&
                                                <button className=" h-fit py-2 px-4 rounded-md border hover:bg-blue-100 active:bg-cyan-100 active:border-cyan-600  font-semibold text-2xl" id="Next">Next</button>
                                        }
                        </div>

                </div>
        )
}

export default DetailElement