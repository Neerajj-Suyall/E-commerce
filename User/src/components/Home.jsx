import "../App.css"
import Card from "./Card.jsx"
import { useEffect, useState } from 'react';
import constant from "../../constant.js";
import { useSelector, useDispatch } from "react-redux";
import { addReduxCart, removeReduxCart } from "../../slice/cartSlice.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { userNotification } from "../../slice/notificationSlice.js";

function Home() {
        const [datas, setDatas] = useState([])
        const [banner, setBanner] = useState([])
        const [currentBanner, setCurrentBanner] = useState(0);

const bannerImages = banner.length > 0
    ? Object.values(banner[0]).filter(
        item => typeof item === "string" && item.startsWith("https://")
    )
    : [];
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
                                toast.success("Cart Remove");
                                // dispatch(userNotification("Cart Remove"))
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
                                toast.success("Cart Added");
                                // dispatch(userNotification("Cart Added"))
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
                                value: (count)
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
                                value: (count - (2 * datas.length))
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
                        console.log("setDatas = ",res)
                        setDatas(res);
                        setCount(count + res.length)
                });
                 fetch(`${constant.domain}/banner`, {
                        method: "GET",
                        credentials: "include"
                }).then(res => {
                        return res.json();
                }).then(res => {
                        setBanner( Object.values(res));
                        console.log("banner org = ", res);
                        // console.log("banner = ",Object.values(res));
                        
                        // setCount(count + res.length)
                });



        }, [])

        useEffect(() => {
    if (bannerImages.length <= 1) return;

    const interval = setInterval(() => {
        setCurrentBanner(prev => (prev + 1) % bannerImages.length);
    }, 3000);

    return () => clearInterval(interval);

}, [bannerImages.length]);


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

                              {/* Banner Slider */}
{bannerImages.length > 0 && (
    <div className="relative w-screen flex justify-center items-center overflow-hidden">

        {/* Image */}
        <img
            src={bannerImages[currentBanner]}
            alt={`Banner ${currentBanner + 1}`}
            className="w-screen h-auto max-h-[80vh] object-contain block"
        />

        {/* Previous Button */}
        <button
            onClick={() => setCurrentBanner(
                prev => (prev - 1 + bannerImages.length) % bannerImages.length
            )}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white px-4 py-2 rounded-full"
        >
            ❮
        </button>

        {/* Next Button */}
        <button
            onClick={() => setCurrentBanner(
                prev => (prev + 1) % bannerImages.length
            )}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white px-4 py-2 rounded-full"
        >
            ❯
        </button>

        {/* Slider Indicators */}
        <div className="absolute bottom-4 flex gap-2">
            {bannerImages.map((item, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentBanner(index)}
                    className={`w-3 h-3 rounded-full ${
                        currentBanner === index
                            ? "bg-white"
                            : "bg-gray-400"
                    }`}
                />
            ))}
        </div>

    </div>
)}


                                {/* <div> */}
                                {(datas?.length >= 1) &&

                                        datas.map((ittr, index) => (
                                                <Card ittr={ittr} cart={findCart(ittr._id)} />
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
