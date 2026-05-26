import "../App.css"
import constant from "../../constant.js";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';


function LogOut() {
    const navigate =useNavigate();



      useEffect(() => {
        fetch(`${constant.domain}/admin/logout`, {
            method: "POST",
            credentials: "include"
        }).then(res => {
            navigate("/Login");
        });
    }, [])

    return (
        <>
                <div>Log Out </div>
                <h1>Log Out </h1>
                <h1>Log Out </h1>
                <h1>Log Out </h1>
                <h1>Log Out </h1>
                <h1>Log Out </h1>
                <h1>Log Out </h1>
           
        </>
    )
}

export default LogOut
