import "../App.css"
import CartElement from "./CartElement.jsx"
import react, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import CartSelect from "./CartSelect.jsx";
import constant from "../../constant.js";
import { useSelector, useDispatch } from "react-redux";
import { removeReduxCart, CountCart, cartStatus } from "../../slice/cartSlice.js";
// import { toast } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userNotification } from "../../slice/notificationSlice.js";


function Cart() {
        const [cartDetails, setCartDetails] = useState([]) //db ka productdetail
        const cartRedux = useSelector((state) => state.cart);
        const dispatch = useDispatch();


        const deleteCart = (e) => {
                console.log("deleteCart", e);

                let data = { productid: e }
                fetch(`${constant.domain}/cart/cartdelete`, {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data),
                        credentials: "include"
                }).then(res => {
                        if (res.status == 200) {
                                dispatch(removeReduxCart(e))
                                // console.log(cartDetails.filter(ittr=>  ittr.product_details[0]._id != e ));

                                setCartDetails(cartDetails.filter(ittr => ittr.product_details[0]._id != e))
                                toast.success("Cart Removed");
                                //  dispatch(userNotification("Cart Removed"))
                                return
                        }

                });
        }

        const addquantity = async (e) => {
                // console.log("stock", e);

                var count = structuredClone(cartRedux.find((ittr,) => {
                        if (ittr.productid == e) {
                                return ittr.quantity
                        }
                }))


                count.quantity += 1;
                //check stock less than quantity                //check stock less than quantity
                console.log("cartDetails[i].product_details[0]._id = ", cartDetails[0]);
                console.log("cartDetails[i].product_details[0]._id = ", cartDetails[1]);
                let stock
                for (let i = 0; i < cartDetails.length; i++) {



                        if (cartDetails[i].product_details[0]?._id == e) {
                                stock = cartDetails[i].product_details[0].stock
                        }
                }
                // console.log("ooookk", count.quantity <= stock);

                if (count.quantity <= stock) {

                        quantitychange({ productid: count.productid, quantity: count.quantity })
                }
                return
        }

        const minusquantity = (e) => {
                let count = structuredClone(cartRedux.find((ittr,) => {
                        if (ittr.productid == e) {
                                return ittr.quantity
                        }
                }))
                count.quantity -= 1;

                if (count.quantity >= 1) {
                        quantitychange({ productid: count.productid, quantity: count.quantity })
                }
                return
        }

        const quantitychange = (data) => {
                // console.log(data);

                fetch(`${constant.domain}/cart/cartcount`, {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data),
                        credentials: "include"
                }).then(res => {
                        // console.log(res);
                        if (res.status == 200) {
                                // console.log(cartDetails.map((e)=>(e.product_details[0]._id == data.productid ? {...e , "e.cartData.quantity" :data.quantity}  : e) ));
                                setCartDetails(cartDetails.map((e) => (e.product_details[0]._id == data.productid ? { ...e, cartData: { quantity: data.quantity } } : e)));
                                dispatch(CountCart(data))
                                //  dispatch(userNotification(`Quantity: ${data.quantity}`))
                        }
                        return
                });
        }



        useEffect(() => {
                fetch(`${constant.domain}/cart/cartDatas`, {
                        method: "GET",
                        credentials: "include"
                }).then(res => {
                        return res.json();
                }).then(res => {
                        // console.log("last", res[0]);
                        console.log("last", res);
                        setCartDetails(res);
                });
        }, [])


        // useEffect(() => {
        //         console.log("cartRedux", cartRedux);
        //         console.log("cartDetails", cartDetails);
        // }, [cartRedux])


        const cartClick = (e) => {
                let cartElement = e.target.closest("article")
                if (cartElement == null) return
                let element = cartElement.getAttribute("id")
                if (e.target.id === "addValue") {
                        console.log("addValue");
                        addquantity(element)
                        return
                } if (e.target.id === "minusValue") {
                        minusquantity(element)
                        return
                } if (e.target.id === "deleteCart") {
                        console.log("deleteCart");
                        deleteCart(element)
                        return
                } if (e.target.id === "statusButton") {
                        // console.log("statusButton",cartRedux);
                        dispatch(cartStatus(element))
                        return
                }
        }

        return (
                <div className=" home_main" onClick={cartClick}>

                        <div>
                                {(cartDetails?.length >= 1) &&
                                        cartDetails.map((ittr, index) => (
                                                <CartElement ittr={ittr} />
                                        ))
                                }
                        </div>

                        <div>
                                {(cartDetails?.length == 0) &&

                                        <h1 className="text-9xl">Cart Empty</h1>
                                }
                        </div>
                        <div>  {(cartRedux) &&
                                <CartSelect cartDetails={cartDetails} setCartDetails={setCartDetails} />}
                        </div>
                </div>
        )
}

export default Cart

