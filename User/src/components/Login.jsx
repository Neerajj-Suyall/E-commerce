import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "../App.css"
import constant from "../../constant.js";
import { useDispatch } from "react-redux";
import { userNotification, autoKillNotification } from "../../slice/notificationSlice.js";


function Login() {
        const [email, setEmail] = useState("user@gmail.com");
        const [password, setPassword] = useState("user@gmail.com");
        const navigate = useNavigate();
        const dispatch = useDispatch();


        const SubmitData = (e) => {
                if (email?.length >= 9 || password.length >= 8) {
                        fetch(`${constant.domain}/user/login`, {
                                method: "POST",
                                headers: {
                                        "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                        "email": email,
                                        "password": password
                                }),
                                credentials: "include"
                        }).then(res => {
                                console.log(res);
                                // return res;
                                return res.json();
                        }).then(res => {
                                console.log(res);
                                console.log(res[0].success);

                                if (res[0].success === true) {
                                        if (res) {
                                                // alert("login sucessfully")
                                                dispatch(userNotification("Login Successfully"))
                                                // dispatch(autoKillNotification("Login Successfully"))
                                                navigate("/App/Home");
                                        }
                                }
                                // alert(res.data[0].Result)
                        })
                } else {
                        alert("something went wrong")
                        dispatch(userNotification("something went wrong"))

                        return
                }
                // setEmail("")
                // setPassword("")
        }


        return (
                <>
                        <div className="loginParent">
                                <div className="loginChild ">
                                        <div className="loginCard">                                               
                                                <div className="heading">
                                                        User Login  
                                                </div>

                                                <div className="inputField">
                                                        <div className='subHeading'>
                                                                Email Address
                                                        </div>
                                                        <div className="">
                                                                <input type="email" placeholder="ExampleAbc@.gmail" className="inputValue" onChange={(e) => { setEmail(e.target.value) }} value={email} />
                                                        </div>
                                                </div>

                                                <div className="inputField">
                                                        <div className='subHeading'>
                                                                Password
                                                        </div>
                                                        <div className="">
                                                                <input type="password" className="inputValue" placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} value={password} />
                                                        </div>
                                                </div>

                                                <div className="inputField">
                                                        <button className="inputButton" onClick={SubmitData}> Submit </button>
                                                </div>
                                                <Link to="/Register" >
                                                        <div className="inputField ">
                                                                <button className="registerButton"> Register </button>
                                                        </div>
                                                </Link>
                                        </div>

                                </div>
                        </div>
                </>

        )
}

export default Login