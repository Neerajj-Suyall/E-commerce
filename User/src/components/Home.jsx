import "../App.css"
import Card from "./Card.jsx"
import { useEffect, useState } from 'react';
import constant from "../../constant.js";
import { useSelector, useDispatch } from "react-redux";
import { addReduxCart, removeReduxCart } from "../../slice/cartSlice.js";
import { userNotification } from "../../slice/notificationSlice.js";

function Home() {
        const [datas, setDatas] = useState([])
        const [count, setCount] = useState(0)
        const cartRedux = useSelector((state) => state.cart);
        const dispatch = useDispatch();

        const findCart = (element) => {
                // return false
                return cartRedux.some(obj => obj.productid == element);
        }

        const removecartClick = (e) => {

                fetch(`${constant.domain}/cart/removeitems`, {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                                productid: e
                        }),
                        credentials: "include"
                }).then(res => {
                        if (res.status == 200) {
                                dispatch(removeReduxCart(e))
                                dispatch(userNotification("Cart Remove"))
                        }
                })
        }

        const addcartClick = (e) => {

                console.log("addcartClick = ", e);


                fetch(`${constant.domain}/cart/additems`, {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                                productid: e
                        }),
                        credentials: "include"
                }).then(res => {
                        if (res.status == 200) {
                                let temp = { productid: e, quantity: 1, status: true }
                                dispatch(addReduxCart(temp))
                                dispatch(userNotification("Cart Added"))
                        }
                })
        }

        const handleNextContent = () => {
                // alert(count)

                fetch(`${constant.domain}/products/moreProduct`, {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                                value: (count )
                        }),
                        credentials: "include"
                }).then(res => {
                        return res.json()
                }).then(res => {
                        console.log("setDatas", res);
                        setCount(count + res.length)
                        setDatas(res);

                });
        }

        const handlepreviousContent = () => {

                fetch(`${constant.domain}/products/moreProduct`, {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                                value: (count - (2*datas.length))
                        }),
                        credentials: "include"
                }).then(res => {
                        return res.json()
                }).then(res => {
                        console.log("setDatas", res);
                        setCount(count - res.length)
                        setDatas(res);

                });
        }


        useEffect(() => {
                fetch(`${constant.domain}/products`, {
                        method: "GET",
                        credentials: "include"
                }).then(res => {
                        return res.json();
                }).then(res => {
                        setDatas(res);
                        setCount(count + res.length)
                });
        }, [])


        // useEffect(() => {
        //         console.log(cartRedux);
        // }, [cartRedux])

        const HomeClick = (e) => {
                e.preventDefault()
                 if (e.target.id === "Previous") {
                        console.log(e.target.id)
                        handlepreviousContent()
                        return
                } else if (e.target.id === "Next") {
                        console.log(e.target.id)
                        handleNextContent()
                        return
                }
                let cardClick = e.target.closest("article")
                if (cardClick == null) return
                let clickIndex = cardClick.getAttribute("id")
                let index;
                for (let i = 0; i < datas.length; i++) {
                        if (datas[i]._id == clickIndex) {
                                index = i
                                break;
                        }

                }
                if (e.target.id === "addCart") {
                        console.log("addCart");
                        addcartClick(datas[index]._id)
                        return
                } else if (e.target.id === "removeCart") {
                        console.log("removeCart");
                        removecartClick(datas[index]._id)
                        return
                        // } else if (e.target.id === "Buy_now") {
                        //     console.log("buy");
                        //     return
                } 
                return
        }

        return (
                <>
                        <div className='home_main' onClick={HomeClick}>
                                {/* <div> */}
                                {(datas?.length >= 1) &&

                                        datas.map((ittr, index) => (
                                                <Card ittr={ittr} imgsrc={ittr.category[0] + (Math.floor(Math.random() * 10) + 1)} cart={findCart(ittr._id)} />
                                        ))}
                                {/* </div> */}
                                

                                <div >
                                        {(count != datas.length) &&
                                                <button className=" h-fit py-2 px-4 rounded-md border hover:bg-blue-100 active:bg-cyan-100 active:border-cyan-600  font-semibold text-2xl" id="Previous">Previous</button>
                                        }

                                        {(datas?.length >= 1) &&
                                                <button className=" h-fit py-2 px-4 rounded-md border hover:bg-blue-100 active:bg-cyan-100 active:border-cyan-600  font-semibold text-2xl" id="Next">Next</button>
                                        }
                                </div>
                                


                        </div>

                        
                </>
        )
}

export default Home
