import "../App.css"
import constant from "../../constant.js";
import {  useDispatch, useSelector } from "react-redux";
import { addReduxCart,userLogout } from "../../slice/cartSlice.js";
import { userNotification } from "../../slice/notificationSlice.js";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';


function LogOut() {
    const dispatch = useDispatch();
      const cartRedux = useSelector((state) => state.cart);
    const navigate =useNavigate();



      useEffect(() => {
        fetch(`${constant.domain}/user/logout`, {
            method: "POST",
            credentials: "include"
        }).then(res => {
            console.log(cartRedux);
            // console.log(res);
            navigate("/Login");
            dispatch(userLogout([]))
             dispatch(userNotification("Logout successfully"))
            
        });
    }, [])

    return (
        <>
                
           
        </>
    )
}

export default LogOut
