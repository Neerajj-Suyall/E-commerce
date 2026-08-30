import { useEffect, useState } from 'react';
import constant from "../../constant.js";
import image from '../assets/Image'
import { userNotification } from "../../slice/notificationSlice.js";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../App.css"

function UserProfile() {
        const dispatch = useDispatch();
        const [userData, setUserData] = useState([])
        const [defaultAddress, setDefaultAddress] = useState({})
        const [selectedAddress, setSelectedAddress] = useState(false);
        //  const [newAddress, setNewAddress] = useState(null);
        const [name, setName] = useState('');
        const [address, setAddress] = useState('');
        const [city, setCity] = useState('');
        const [state, setState] = useState('');
        const [zip, setZip] = useState('');
        const [phoneNo, setPhoneNo] = useState('');

        useEffect(() => {
                //       if (datas.length >1) return      
                fetch(`${constant.domain}/user/profile`, {
                        method: "GET",
                        credentials: "include"
                }).then(res => {
                        // console.log(res);
                        return res.json();
                }).then(res => {
                        console.log(res[0]?.name);
                        if (res.length >= 1) {
                                setUserData(res);
                                return
                        }
                })
        }, [])


        const HandleDefault = (e) => {
                // console.log(defaultAddress);
                let data = userData[0]?.address[defaultAddress]

                if (data == undefined) return
                console.log(data);
                fetch(`${constant.domain}/user/setDefault`, {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data),
                        credentials: "include"
                }).then(res => {

                        console.log("HandleDefault = ", res);

                        if (res.status == 200) {
                                let temp = { productid: e, quantity: 1, status: true }
                                dispatch(addReduxCart(temp)
                                )
                        }
                })
        }

        const HandleNewAddress = (e) => {
                // console.log("const newAddress  = ",name.length > 1);
                // e.preventDefault();
                if (name.length > 1 || address.length > 1 || city.length > 1 || state.length > 1 || zip.length > 1 || phoneNo.length > 1) {
                        const newAddress = {
                                name: name,
                                address: address,
                                city: city,
                                state: state,
                                zip: zip,
                                phoneNo: phoneNo
                        }

                        console.log("const newAddress  = ", newAddress);


                        fetch(`${constant.domain}/user/Address`, {
                                method: "POST",
                                headers: {
                                        "Content-Type": "application/json"
                                },
                                body: JSON.stringify(newAddress),
                                credentials: "include"
                        }).then(res => {
                                console.log("POSTjson", res);
                                // return res.json();
                        }).then(res => {
                                console.log("POST", res);
                                toast.success("Address saved");

                                // dispatch(userNotification("Address saved "))

                        });


                        setName('')
                        setAddress('')
                        setCity('')
                        setState('')
                        setZip('')
                        setPhoneNo('')

                        setSelectedAddress(!selectedAddress)
                        return
                }
                return
        }

        return (
                <>
                        <div className='flex flex-row flex-wrap justify-around p-[250px]  pt-[70px] bg-gray-200 w-full  '>
                                <div className='flex-2 flex flex-col p-4 h-fit gap-2'>
                                        <div className='flex-4 flex flex-col justify-center items-center py-6 '>
                                                <img src={image.H5} className='border-2 rounded-full h-[500px] w-[500px] bg-red-300' />
                                                <div className=' py-2 text-3xl font-bold uppercase'>{userData[0]?.name}</div>
                                        </div>

                                        <div className='flex flex-col py-2 px-4 border-2 w-full rounded-lg font-semibold text-1xl hover:bg-blue-100 active:bg-blue-200'> Name: <span className='font-bold uppercase text-3xl'> {userData[0]?.name}</span></div>
                                        <div className='flex flex-col py-2 px-4 border-2 w-full rounded-lg font-semibold text-1xl hover:bg-blue-100 active:bg-blue-200'>  Phone No.: <span className='font-bold uppercase text-3xl'>  {userData[0]?.phoneNo}</span></div>
                                        <div className='flex flex-col py-2 px-4 border-2 w-full rounded-lg font-semibold text-1xl hover:bg-blue-100 active:bg-blue-200'>  Email: <span className='font-bold uppercase text-3xl'>  {userData[0]?.email}</span></div>
                                        <div className='flex flex-col py-2 px-4 border-2 w-full rounded-lg font-semibold text-1xl hover:bg-blue-100 active:bg-blue-200'>  Date of Birth: <span className='font-bold uppercase text-3xl'>  {userData[0]?.dateofBirth}</span></div>
                                        {userData[0]?.address?.length >= 1 &&
                                                <div className='flex flex-col py-2 px-4 border-2 w-full rounded-lg font-semibold text-1xl hover:bg-blue-100 active:bg-blue-200'> default Address: <span className='font-bold uppercase text-3xl'>   {userData[0]?.defaultAddress?.name}, {userData[0]?.defaultAddress?.address}, {userData[0]?.defaultAddress?.city}, {userData[0]?.defaultAddress?.state} - {userData[0]?.defaultAddress?.zip}</span></div>
                                        }
                                        {/* <div className='flex flex-col py-2 px-4 border-2 w-full rounded-lg font-semibold text-1xl hover:bg-blue-100 active:bg-blue-200'>  City: <span className='font-bold uppercase text-3xl'>  {userData[0]?.address[0].city}</span></div>
                                        <div className='flex flex-col py-2 px-4 border-2 w-full rounded-lg font-semibold text-1xl hover:bg-blue-100 active:bg-blue-200'>  State: <span className='font-bold uppercase text-3xl'>  {userData[0]?.address[0].state}</span></div>
                                        <div className='flex flex-col py-2 px-4 border-2 w-full rounded-lg font-semibold text-1xl hover:bg-blue-100 active:bg-blue-200'>  Zip: <span className='font-bold uppercase text-3xl'>  {userData[0]?.address[0].zip}</span></div>          */}
                                        {selectedAddress &&
                                                <div className='flex flex-col py-2 px-4 border-2 w-full rounded-lg font-semibold text-1xl hover:bg-blue-100 active:bg-blue-200'>
                                                        Default Address:

                                                        <div className=" flex flex-row gap-3 ">

                                                                <select id="old-address"
                                                                        value={defaultAddress}
                                                                        onChange={(e) => setDefaultAddress([e.target.value])}
                                                                        className=" flex flex-row w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold uppercase text-3xl"  >

                                                                        <option value="">Select Address</option>
                                                                        {userData[0]?.address?.length >= 1 && userData[0]?.address?.map((address, index) => (
                                                                                <option key={index} value={index}>
                                                                                        {address.name}, {address.address}, {address.city}, {address.state} - {address.zip}
                                                                                </option>
                                                                        ))}

                                                                </select>
                                                                <button className='px-4  border-2 rounded-md border-gray-500 shadow-2xs text-3xl hover:border-blue-500 active:bg-cyan-400 ' onClick={HandleDefault}>select </button>
                                                                <button className='px-4  border-2 rounded-md border-gray-500 shadow-2xs text-3xl hover:border-blue-500 active:bg-cyan-400 ' onClick={e => setSelectedAddress(!selectedAddress)}> Add</button>


                                                        </div>



                                                </div>
                                        }

                                        {!selectedAddress &&
                                                <div className='flex flex-col py-2 px-4 border-2 w-full rounded-lg font-semibold text-1xl hover:bg-blue-100 active:bg-blue-200'>
                                                        Add Address:
                                                        <button className='px-4  border-2 rounded-md border-gray-500 shadow-2xs text-3xl hover:border-blue-500 active:bg-cyan-400 ' onClick={e => setSelectedAddress(!selectedAddress)}> Add</button>
                                                </div>
                                        }


                                        {selectedAddress &&
                                                // New Address Fields if User Doesn't Choose Old Address
                                                <div className=" space-y-4 border my-4 p-10 rounded-lg bg-gray-50">
                                                        <div>
                                                                <label htmlFor="name" className="flex flex-col  rounded-lg font-semibold text-1xl ">Full Name</label>
                                                                <input
                                                                        type="text"
                                                                        id="name"
                                                                        value={name}
                                                                        onChange={(e) => setName(e.target.value)}
                                                                        required
                                                                        className=" border-2 w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-blue-100 active:bg-blue-200"
                                                                />
                                                        </div>

                                                        <div>
                                                                <label htmlFor="address" className="flex flex-col  rounded-lg font-semibold text-1xl">Address</label>
                                                                <input
                                                                        type="text"
                                                                        id="address"
                                                                        value={address}
                                                                        onChange={(e) => setAddress(e.target.value)}
                                                                        required
                                                                        className="w-full px-4 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                                />
                                                        </div>

                                                        <div>
                                                                <label htmlFor="city" className="flex flex-col  rounded-lg font-semibold text-1xl">City</label>
                                                                <input
                                                                        type="text"
                                                                        id="city"
                                                                        value={city}
                                                                        onChange={(e) => setCity(e.target.value)}
                                                                        required
                                                                        className="w-full px-4 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-blue-100 active:bg-blue-200"
                                                                />
                                                        </div>

                                                        <div>
                                                                <label htmlFor="state" className="flex flex-col  rounded-lg font-semibold text-1xl">State</label>
                                                                <input
                                                                        type="text"
                                                                        id="state"
                                                                        value={state}
                                                                        onChange={(e) => setState(e.target.value)}
                                                                        required
                                                                        className="w-full px-4 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-blue-100 active:bg-blue-200"
                                                                />
                                                        </div>

                                                        <div>
                                                                <label htmlFor="zip" className="flex flex-col  rounded-lg font-semibold text-1xl">ZIP Code</label>
                                                                <input
                                                                        type="text"
                                                                        id="zip"
                                                                        value={zip}
                                                                        onChange={(e) => setZip(e.target.value)}
                                                                        required
                                                                        className="w-full px-4 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-blue-100 active:bg-blue-200"
                                                                />
                                                        </div>

                                                        <div>
                                                                <label htmlFor="phoneNo" className="flex flex-col  rounded-lg font-semibold text-1xl">Mobile no.</label>
                                                                <input
                                                                        type="number"
                                                                        id="phoneNo"
                                                                        value={phoneNo}
                                                                        onChange={(e) => setPhoneNo(e.target.value)}
                                                                        required
                                                                        className="w-full px-4 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-blue-100 active:bg-blue-200"
                                                                />
                                                        </div>
                                                        <div className='flex flex-row justify-center items-center m-1 pt-6' >
                                                                <button className='  px-4 py-2  border-2 rounded-md border-gray-500 shadow-2xs text-3xl hover:border-blue-500 active:bg-cyan-400 ' onClick={HandleNewAddress}> Submit</button>
                                                                <button className='  px-4 py-2  border-2 rounded-md border-gray-500 shadow-2xs text-3xl hover:border-blue-500 active:bg-cyan-400 ' onClick={e => setSelectedAddress(!selectedAddress)}> Cancel</button>
                                                        </div>
                                                </div>
                                        }


                                </div>
                        </div>
                </>
        )
}

export default UserProfile