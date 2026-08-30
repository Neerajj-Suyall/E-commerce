import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css"
import constant from "../../constant.js";


function Login() {
        const [email, setEmail] = useState("admin@gmail.com");
        const [password, setPassword] = useState("admin@gmail.com");
        const navigate = useNavigate();


        const SubmitData = (e) => {

                if (email?.length >= 9 || password.length >= 8) {
                        fetch(`${constant.domain}/admin/login`, {
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
                                                navigate("/Admin/Home");
                                        }
                                }
                        })
                } else {
                        alert("something went wrong")

                        return
                }
                setEmail("")
                setPassword("")
        }


        // const SubmitData = (e) => {
                
        // }
        return (
                <>
                        <div className="loginParent">
                                <div className="loginChild ">
                                        <div className="loginCard">
                                                <div className="heading">
                                                        Admin Login  
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

                                        </div>

                                </div>
                        </div>


                </>

        )
}

export default Login