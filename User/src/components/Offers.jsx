import "../App.css"
import Card from "./Card.jsx"
import { useEffect, useState } from 'react';
import constant from "../../constant.js";
import { useSelector, useDispatch } from "react-redux";
import { addReduxCart, removeReduxCart } from "../../slice/cartSlice.js";
import { userNotification } from "../../slice/notificationSlice.js";


function Offers() {
   const [datas, setDatas] = useState([]) 
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

     useEffect(()=>{
      if (datas.length >1) return      
         fetch(`${constant.domain}/offers`, {
         method: "GET",
         credentials: "include"
         }).then(res => {
         return res.json();
         }).then(res => {   
           console.log(res);         
            setDatas(res);
        
           
         })   
   },[])

    const HomeClick = (e) => {
        e.preventDefault()
        if (e.target.id == "Load_more") {
            handleMoreContent()
            console.log("Load_more");
            // alert("Load_more");
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
        } if (e.target.id === "removeCart") {
            console.log("removeCart");
            removecartClick(datas[index]._id)
            return
        } else if (e.target.id === "Buy_now") {
            console.log("buy");
            return
        }  
        return
    }


  return (
    <>
      <div className='home_main'  onClick={HomeClick}>
                     {
							(datas?.length >= 1) &&
									datas.map((ittr, index) => (
										<Card  ittr={ittr} imgsrc={ittr.category[0]+(Math.floor(Math.random()*10)+1)}  cart={findCart(ittr._id)}  />
									))
								}
            </div>
    </>
  )
}

export default Offers