// import './Css/Healing.css';
import { useEffect, useState } from 'react';
import "../App.css"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import constant from "../../constant.js";
import { useDispatch } from "react-redux";
// import { userNotification } from "../../slice/notificationSlice.js";



function Register() {
        const [name, setName] = useState();
        const [phoneNo, setPhoneNo] = useState();
        const [dateofBirth, setDateofBirth] = useState();
        const [email, setEmail] = useState();
        const [confirmpassword, setConfirmpassword] = useState();
        const [password, setPassword] = useState();
        const navigate = useNavigate();
        const dispatch = useDispatch();




        const SubmitData = (e) => {

                console.log(phoneNo.length, phoneNo);

                if (email?.length >= 8 && password?.length >= 8 && confirmpassword === password && phoneNo?.length >= 5) {
                        fetch(`${constant.domain}/user/registration`, {
                                method: "POST",
                                credentials: "include",
                                headers: {
                                        "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                        "name": name,
                                        "email": email,
                                        "password": password,
                                        "phoneNo": phoneNo,
                                        "dateofBirth": dateofBirth,
                                        "confirmpassword": confirmpassword,
                                }),
                        }).then(res => {
                                return res.json();
                        }).then(res => {
                                console.log(res);

                                if (res.success) {
                                        console.log(res.success);
                                        //  dispatch(userNotification("Register Sucessfully"))
                                        toast.success("Register Sucessfully");
                                        navigate("/Login");
                                        setEmail("")
                                        setPhoneNo("")
                                        setName("")
                                        setDateofBirth("")
                                        setConfirmpassword("")
                                        setPassword("")
                                }

                                //     alert(res?.data[0]?.Result)
                                //     console.log(res?.data[0]?.Result)
                        })
                } else {
                        alert("something went wrong")
                        //  dispatch(userNotification("Something went wrong"))
                        toast.error("Something went wrong");
                        return
                }
        }

        return (
                <>
                        <div className="loginParent ">
                                <div className="loginChild bg-red-500">
                                        <div className="loginCard">
                                                <div className="heading"> Registration Information </div>
                                                <div className="inputField ">
                                                        <div>
                                                                Full Name
                                                        </div>
                                                        <div className="app-box">
                                                                <input type="name" placeholder="Abc Xyz" className="inputValue" onChange={(e) => { setName(e.target.value) }} value={name} />
                                                        </div>
                                                </div>
                                                <div className="inputField ">
                                                        <div>
                                                                Phone Number
                                                        </div>
                                                        <div className="app-box">
                                                                <input type="phone" placeholder="9876543210" className="inputValue" onChange={(e) => { setPhoneNo(e.target.value) }} value={phoneNo} />
                                                        </div>
                                                </div>
                                                <div className="inputField ">
                                                        <div>
                                                                Email Address
                                                        </div>
                                                        <div className="app-box">
                                                                <input type="email" placeholder="ExampleAbc@.gmail" className="inputValue" onChange={(e) => { setEmail(e.target.value) }} value={email} />
                                                        </div>
                                                </div>
                                                <div className="inputField ">
                                                        <div>
                                                                Date of Birth
                                                        </div>
                                                        <div className="app-box">
                                                                <input type="date" className="inputValue" onChange={(e) => { setDateofBirth(e.target.value) }} value={dateofBirth} />
                                                        </div>
                                                </div>
                                                <div className="inputField ">
                                                        <div>
                                                                Password
                                                        </div>
                                                        <div className="app-box">
                                                                <input type="password" placeholder='Password...' className="inputValue" onChange={(e) => { setPassword(e.target.value) }} value={password} />
                                                        </div>
                                                </div>
                                                <div className="inputField ">
                                                        <div>
                                                                Confirm Password
                                                        </div>
                                                        <div className="app-box">
                                                                <input type="password" placeholder=' Confirm Password...' className="inputValue" onChange={(e) => { setConfirmpassword(e.target.value) }} value={confirmpassword} />
                                                        </div>
                                                </div>
                                                <div className="inputField ">
                                                        <button className="inputButton" onClick={SubmitData}> Submit </button>
                                                </div>
                                                <Link to="/login" >
                                                        <div className="inputField  ">
                                                                <button className="registerButton"> Login </button>
                                                        </div>
                                                </Link>
                                        </div>

                                </div>
                        </div>
                </>
        )
}

export default Register 