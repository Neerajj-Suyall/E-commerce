import { useEffect, useState } from "react";
import "../App.css"
import { useParams } from "react-router-dom"
import image from "../assets/Image/index.js"
import { Link } from "react-router-dom";
import constant from "../../constant.js";
import { useSelector, useDispatch } from "react-redux";
import { userNotification } from "../../slice/notificationSlice.js";
import { addReduxCart, removeReduxCart } from "../../slice/cartSlice.js";

function ProductDetails() {
        const {id} = useParams();
        const [datas, setDatas] = useState('')
        const [reviews, setReviews] = useState('')
        const cartRedux = useSelector((state) => state.cart);
        const dispatch = useDispatch();

        useEffect(()=>{
                        console.log("id", id);
                        
                        fetch(`http://localhost:3002/products/${id}`, {
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
                });

            
        },[])


            const findCart = (element) => {
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

        console.log("addcartClick = ",e);
        

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
                let temp = { productid: e, quantity: 1,status: true }
                dispatch(addReduxCart(temp))
                 dispatch(userNotification("Cart Added"))
            }
        })
    }

    const handlereviews = (e) => {

        console.log("handlereviews = ",e);
        

        fetch(`${constant.domain}/review/feedback/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then(res => {
         return res.json()
        }).then(res => {
                console.log("setReviews = ",res);
                
                if (res.length >=1) {
                      setReviews(res)  
                      return
                }
        alert("no review Avaliable")
         
        })
    }

        const handleClick = (e)=>{
                        if (e.target.id === "addCart") {
                        console.log("addCart");
                        addcartClick(datas[0]._id)
                        return
                        } else if (e.target.id === "removeCart") {
                        console.log("removeCart");
                        removecartClick(datas[0]._id)
                        return
                        }else if (e.target.id === "reviewsratings") {
                        // console.log("reviewsratings");
                        handlereviews(datas[0]._id)
                        return
                        }
                        return
                }



        return (
                  <>
                       { (datas?.length == 1 ) &&
                       <div className='home_main rounded pb-[0] justify-center'  onClick={handleClick}>
                                <div className='detail_main  rounded p-0 m-0 justify-center border-2 border-gray-300 shadow-sm'>
                                        <div className=' detail_top  rounded '>
                                                <img src={image[datas[0]?.category[0] + (Math.floor(Math.random() * 10) + 1)]} alt="CardImage" className=' rounded ' />
                                        </div>
                                        <div className='detail_top rounded bg-gray-200'>

                                                <div className='center detail_product font-bold'>{datas[0].name}</div>
                                                <div className='flex  flex-row gap-10   justify-center '>
                                                        <span className='detail_price font-semibold'>Rs. {Math.floor((datas[0].price/100)*(100-datas[0].discount))} 
                                                                <span className='detail_discount'>{datas[0].price}
                                                                </span>
                                                        </span>
                                                </div>
                                                <div className="detail_percentage ">
                                                        <span className="text-gray-500 font-normal">Discount    </span>
                                                        {datas[0].discount}%
                                                </div>
                                                <div className="detail_stock ">
                                                        <span className="text-gray-500 font-medium">Stock </span>
                                                       {datas[0].stock}
                                                </div>
                                                <div className="detail_stock">
                                                        <span className="text-gray-500  font-medium">Rating </span>
                                                        {datas[0].rating}*
                                                </div>
                                                <div className="detail_stock text-blue-400">
                                                        {datas[0].category}
                                                </div>
                                                <div className="detail_discription">
                                                       {datas[0].description}
                                                </div>
                                                {/* <div className='detail_like'>
                                                        <div className=' cartdetail'>Add to cart</div>
                                                </div> */}

                                                {(findCart(datas[0]._id) !== true)&&
                                                                <button  className='w-[80%] m-8 p-1 rounded-xl border-2 border-gray-400 bg-red-300 text-2xl hover:bg-red-400 active:text-white transition-all' id='addCart'>Add to cart</button>
                                                        }
                                                {(findCart(datas[0]._id) === true)&&
                                                                <button className='w-[80%] m-8 p-1 rounded-xl border-2 border-gray-400 bg-green-200 text-2xl hover:bg-green-400 active:text-white transition-all' id='removeCart'>Cart added</button>
                                                        }

                                                {/* <div className='detail_like rounded detail_button'>
                                                        <Link  to={`/app/product/booking/${id}`} className='w-[100%] bg-yellow-50 border border-gray-300 rounded text-2xl p-1'>Proceed to pay</Link>
                                                </div> */}

                                                
                                                        <Link  to={`/app/product/booking/${id}`} ><button className='w-[80%] m-8 p-1 rounded-xl border-2 border-gray-400 bg-yellow-300  text-2xl hover:bg-yellow-400 active:text-gray-600 transition-all'>Proceed to pay</button></Link>
                                                        <div className="flex flex-col justify-center items-center ">
                                                                        {reviews.length }
                                                                        {(reviews.length == 0)&&
                                                                                <button  className='w-[80%] m-8 p-1 rounded-xl border-2 border-gray-400 bg-red-300 text-2xl hover:bg-red-400 active:text-white transition-all'  id='reviewsratings' >See review</button>
                                                                                }
                                                                        {(reviews.length >= 1)&&
                                                                                reviews.map(ittr=>(
                                                                                        (ittr.review.length >=2) &&
                                                                                        <div className=" border w-[80%] rounded-md px-4 m-2"> 
                                                                                                <div className="text-left">rating : {ittr.rating} star</div>
                                                                                                <div className=" resize-none  break-words whitespace-pre-wrap rounded-md px-2 text-xl font-semibold w-[80%] " readOnly>{ittr.review}</div>
                                                                                                <button  className='w-[80%] m-8 p-1 rounded-xl border-2 border-gray-400 bg-red-300 text-2xl hover:bg-red-400 active:text-white transition-all'  onClick={() => {setReviews("")}}        >hide</button>

                                                                                        </div>
                                                                                ))
                                                                                }
                                                        </div>

                                        </div>


                                </div>
                                
                                
                        </div>}
                </>
        )
}

export default ProductDetails