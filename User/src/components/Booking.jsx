import { NavLink } from 'react-router-dom'
import { useParams } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import image from '../assets/Image';
import { useNavigate } from 'react-router-dom';
import constant from "../../constant.js";
import { userNotification } from "../../slice/notificationSlice.js";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";


import "../App.css"

function Booking() {
        const { id } = useParams();
        const dispatch = useDispatch();

        const navigate = useNavigate();

        const [oldAddresses, setOldAddresses] = useState([]);
        const [product, setProduct] = useState();
        const [quantity, setQuantity] = useState(1);
        const [totalPrice, setTotalPrice] = useState(0);
        const [name, setName] = useState("");
        const [address, setAddress] = useState("");
        const [city, setCity] = useState('');
        const [state, setState] = useState('');
        const [zip, setZip] = useState('');
        const [phoneNo, setPhoneNo] = useState('');
        const [useOldAddress, setUseOldAddress] = useState(false); // db adress
        const [findAddress, setFindAddress] = useState('');  // yai sirf index deta hai
        const [selectedAddress, setSelectedAddress] = useState('');  // final address for this product 


        const handleSaveAddress = (e => {
                console.log("selectedAddress", name.length);
                if (name.length < 1) return
                if (address.length < 1) return
                if (city.length < 1) return
                if (state.length < 1) return
                if (zip.length < 1) return
                if (phoneNo.length < 1) return

                let userAddress = {
                        name: name,
                        address: address,
                        city: city,
                        state: state,
                        zip: zip,
                        phoneNo: phoneNo
                }

                //api to save data
                fetch(`http://localhost:3002/user/Address`, {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json"
                        },
                        body: JSON.stringify(userAddress),
                        credentials: "include"
                }).then(res => {
                        return res.json();
                }).then(res => {
                        console.log("POST", res);
                        toast.success("Address saved");
                        // dispatch(userNotification("Address saved "))
                        //     alert("Adress saved")
                });
        })

        const handlePlaceOrder = (async (e) => {

                if (useOldAddress == true) {
                        if (name.length < 1) return
                        if (address.length < 1) return
                        if (city.length < 1) return
                        if (state.length < 1) return
                        if (zip.length < 1) return
                        if (phoneNo.length < 1) return

                        let userAddress = {
                                name: name,
                                address: address,
                                city: city,
                                state: state,
                                zip: zip,
                                phoneNo: phoneNo
                        }
                        setSelectedAddress(userAddress);
                };

                // console.log("selectedAddress", selectedAddress);
                if (selectedAddress == null) return


                let productdata = product[0]
                let temp = {
                        userdata: { ...selectedAddress },
                        productdata: {
                                ...productdata,
                                quantity: quantity
                        }
                }
                // console.log("abc");


                fetch(`http://localhost:3002/order/${id}`, {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json"
                        },
                        body: JSON.stringify(temp),
                        credentials: "include"
                }).then(res => {
                        return res.json();
                }).then(res => {
                        console.log("POST", res);
                        //     alert("item deliverd")
                        toast.success("Log in sucessfully ");
                        // dispatch(userNotification("Product delivered"))

                        // console.log("selectedAddress");
                });
                navigate(`/App/Orders`);
        })

        const handleAddQuantity = () => {
                if (quantity == product[0].stock) {
                        alert('you have reach max limit ')
                        return
                }
                setQuantity((val) => val = val + 1);
                setTotalPrice(product[0].price * (quantity + 1));
                toast.success("Quantity =", quantity);
                //  dispatch(userNotification("Quantity =", quantity ))
        };

        const handleSubQuantity = () => {
                if (quantity == 1) return
                setQuantity((val) => val = val - 1);
                setTotalPrice(product[0].price * (quantity - 1));
                toast.success("Quantity =", quantity);
                //  dispatch(userNotification("Quantity =", quantity ))
        };


        useEffect(() => {
                fetch(`http://localhost:3002/products/${id}`, {
                        method: "GET",
                        credentials: "include"
                }).then(res => {
                        return res.json();
                }).then(res => {
                        console.log(res);
                        if (res == null) return
                        setProduct(res);
                });


                fetch(`${constant.domain}/user/Addressdetail`, {
                        method: "GET",
                        credentials: "include"
                }).then(res => {
                        return res.json();
                }).then(res => {
                        // console.log(res);
                        if (res == null) return
                        setOldAddresses(res[0].address);
                        setSelectedAddress(res[0].DefaultAddress);
                });

        }, [])

        // useEffect(() => {
        //       setSelectedAddress(oldAddresses[findAddress])
        // }, [findAddress])


        return (
                <div className="min-h-screen bg-gray-50 p-6">
                        <div className="max-w-screen-lg mx-auto bg-white p-8 rounded-xl shadow-lg">

                                {/* Product Section */}
                                {(product?.length == 1) &&
                                        <div className="flex gap-8 mb-8">
                                                <img src={image[product[0]?.category[0] + (Math.floor(Math.random() * 10) + 1)]} alt={product[0].name} className="w-1/3 rounded-lg shadow-md" />
                                                <div className="flex-1">

                                                        <h2 className="text-3xl font-bold text-gray-800 mb-4">{product[0].name}</h2>
                                                        <p className="text-gray-600 mb-4">{product[0].description}</p>
                                                        <p className="text-xl font-semibold text-gray-800 mb-4">₹{product[0].price}</p>
                                                        <p className="text-xl font-semibold text-gray-800 mb-4">stock :{product[0].stock}</p>

                                                        {/* Quantity Selector */}

                                                        <div className="flex items-center gap-4 rounded-lg text-3xl  font-bold" >
                                                                <button className="px-5 py-2 transition ease-in-out bg-gray-200 hover:bg-gray-300 hover:border-cyan-500 rounded-lg  border-2 border-gray-400 active:text-white active:bg-red-400 " onClick={handleSubQuantity}>-</button>
                                                                <span className="px-4 ">{quantity}</span>
                                                                <button className="px-4 py-2 transition ease-in-out  bg-gray-200 hover:bg-gray-300 hover:border-cyan-500 rounded-lg border-2 border-gray-400 active:text-white active:bg-green-400 " onClick={handleAddQuantity}>+</button>
                                                        </div>

                                                        {/* Total Price */}
                                                        <p className="text-lg font-semibold text-gray-800 mb-6">Total Price: ₹{totalPrice ? totalPrice : product[0].price}</p>

                                                        {/* Add to Cart Button */}

                                                </div>
                                        </div>}


                                {/* Shipping Address Form */}
                                <div className="border-t pt-6">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Shipping Address</h3>

                                        {/* Option to Select Old Address or Enter New Address */}
                                        <div className="mb-6">
                                                <label className="inline-flex items-center">
                                                        <input
                                                                type="checkbox"
                                                                checked={useOldAddress}
                                                                onChange={() => setUseOldAddress(!useOldAddress)}
                                                                className="form-checkbox h-5 w-5 text-indigo-600"
                                                        />
                                                        <span className="ml-2 text-sm font-medium text-gray-700">Use new address</span>
                                                </label>
                                        </div>

                                        {/* If User Wants to Use Old Address, Show Dropdown */}
                                        {useOldAddress ? (
                                                // New Address Fields if User Doesn't Choose Old Address
                                                <div className="space-y-4">
                                                        <div>
                                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                                                <input
                                                                        type="text"
                                                                        id="name"
                                                                        value={name}
                                                                        onChange={(e) => setName(e.target.value)}
                                                                        required
                                                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                                />
                                                        </div>

                                                        <div>
                                                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                                                                <input
                                                                        type="text"
                                                                        id="address"
                                                                        value={address}
                                                                        onChange={(e) => setAddress(e.target.value)}
                                                                        required
                                                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                                />
                                                        </div>

                                                        <div>
                                                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                                                <input
                                                                        type="text"
                                                                        id="city"
                                                                        value={city}
                                                                        onChange={(e) => setCity(e.target.value)}
                                                                        required
                                                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                                />
                                                        </div>

                                                        <div>
                                                                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                                                                <input
                                                                        type="text"
                                                                        id="state"
                                                                        value={state}
                                                                        onChange={(e) => setState(e.target.value)}
                                                                        required
                                                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                                />
                                                        </div>

                                                        <div>
                                                                <label htmlFor="zip" className="block text-sm font-medium text-gray-700">ZIP Code</label>
                                                                <input
                                                                        type="text"
                                                                        id="zip"
                                                                        value={zip}
                                                                        onChange={(e) => setZip(e.target.value)}
                                                                        required
                                                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                                />
                                                        </div>

                                                        <div>
                                                                <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-700">Mobile no.</label>
                                                                <input
                                                                        type="number"
                                                                        id="phoneNo"
                                                                        value={phoneNo}
                                                                        onChange={(e) => setPhoneNo(e.target.value)}
                                                                        required
                                                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                                />
                                                        </div>

                                                        <div className="mt-6">
                                                                <button
                                                                        // onClick={() => { handlePlaceOrder() }}
                                                                        onClick={handleSaveAddress}
                                                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg w-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                >
                                                                        Save address
                                                                </button>
                                                        </div>
                                                </div>
                                        ) : (
                                                <div className="mb-4">
                                                        <label htmlFor="old-address" className="block text-sm font-medium text-gray-700">Select Old Address</label>
                                                        <select
                                                                id="old-address"
                                                                value={findAddress}
                                                                onChange={(e) => {
                                                                        setSelectedAddress(oldAddresses[e.target.value]);
                                                                        setFindAddress(e.target.value)
                                                                }}
                                                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        >
                                                                <option value="">Select Address</option>
                                                                {oldAddresses?.map((address, index) => (
                                                                        <option key={index} value={index}>
                                                                                {address.name}, {address.address}, {address.city}, {address.state} - {address.zip}
                                                                        </option>
                                                                ))}
                                                        </select>
                                                </div>
                                        )}
                                        <button className="px-6 py-3 mt-6 bg-red-300 text-black font-bold rounded-lg border-2 border-transparent w-full  hover:bg-red-400 hover:border-cyan-400 active:text-black active:border-black">
                                                Cancel
                                        </button>

                                        <button className="px-6 py-3 mt-6 bg-green-400 text-black font-bold border-2 border-transparent rounded-lg w-full hover:bg-green-500 hover:border-cyan-400 active:text-white active:border-black" onClick={handlePlaceOrder} >
                                                Place Order
                                        </button>
                                </div>
                        </div>
                </div>
        );
};

export default Booking 