import { useEffect, useState } from "react";
import "../App.css"
import { Link } from "react-router-dom";
import constant from "../../constant.js";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { deleteBuyCart } from "../../slice/cartSlice.js";
// import {  userNotification} from "../../slice/notificationSlice.js";
import { toast } from "react-toastify";





function CartSelect({
        cartDetails,
        setCartDetails
}) {
        // const [temper , setTemp] = useState(cartBuy) //buy product
        const cartRedux = useSelector((state) => state.cart);
        const dispatch = useDispatch();
         const navigate =useNavigate();

        const [originalPrice, setOriginalPrice] = useState(0) //buy product
        const [discount, setDiscount] = useState(0) //buy product
        const [clicked, setClicked] = useState(0) //buy product


        const [oldAddresses, setOldAddresses] = useState([]);
        const [name, setName] = useState("");
        const [address, setAddress] = useState("");
        const [city, setCity] = useState('');
        const [state, setState] = useState('');
        const [zip, setZip] = useState('');
        const [phoneNo, setPhoneNo] = useState('');
        const [useOldAddress, setUseOldAddress] = useState(false); // db adress
        const [findAddress, setFindAddress] = useState('');  // yai sirf index deta hai
        const [selectedAddress, setSelectedAddress] = useState('');  // final address for this product 

        const handlePlaceOrder = (async (e) => {
                console.log("selectedAddress",selectedAddress);
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
                }
                console.log("selectedAddress", selectedAddress);
                if (selectedAddress == null) return

                let cartBuy = cartRedux.reduce((initial, ittr) => {                                                
                        if (ittr.status== true) {
                                initial.push({ productid: ittr.productid, quantity: ittr.quantity })
                        } 
                        return initial;
                }, [])


                console.log("cartBuycartBuy",cartBuy);
                        

                let temp = {
                        userdata: { ...selectedAddress },
                        productdata: cartBuy
                }

                console.log("mai yaha hu",temp);
                

                fetch(`${constant.domain}/order/cart/ok`, {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json"
                        },
                        body: JSON.stringify(temp),
                        credentials: "include"
                }).then(res => {
                        // console.log("POST", res);
                        return res.json();      
                }).then(res => {
                        // console.log("POST", res);
                        if (res.modifiedCount >=1) {
                        navigate(`/App/Orders`);
                        //  dispatch(userNotification("Carts purchased"))
                         toast.success("Carts purchased");
                        // console.log("selectedAddress= ",  cartDetails);
                                 setCartDetails(cartDetails.reduce((initial, ittr) => {
                                if (cartBuy.some(e =>  e?.productid == ittr?.product_details[0]?._id)) {
                                        return initial
                                }         
                                return [...initial, ittr ]
                         },[]))
                         dispatch(deleteBuyCart(cartBuy));
                        } else {
                                 toast.error("something went wrong");
                        //       alert("something went wrong");  
                        }
                      
                });
        })


        useEffect(() => {

                // console.log("jindahu");
                
                fetch(`${constant.domain}/user/Addressdetail`, {
                        method: "GET",
                        credentials: "include"
                }).then(res => {
                        return res.json();
                }).then(res => {
                        console.log("my address = ",res);
                        if (res == null) return
                        setOldAddresses(res[0]?.address);   
                        setSelectedAddress(res[0]?.DefaultAddress);   
                });

        }, [])       

        // useEffect(() => {
        //         setSelectedAddress(oldAddresses[findAddress])
        // }, [findAddress])



        useEffect(() => {
                // console.log(originalPrice);
                 console.log(cartRedux);
                 setClicked(e=> 0)

                // setOriginalPrice(cartDetails?.reduce((acc , cur) => true  && acc+cur.product_details[0].price , 0 ))
                setOriginalPrice(cartDetails?.reduce((acc, cur) => {
                        if (cartRedux?.some(e => e.productid == cur?.product_details[0]?._id && e.status)) {
                                return (acc + (Math.round(cur.product_details[0].price) * cur.cartData.quantity))
                        }
                        return acc
                }, 0))

                setDiscount(cartDetails?.reduce((acc, cur) => {
                        // console.log("cartRedux", cartRedux?.some(e => e.productid == cur?.product_details[0]?._id) == true);

                        if (cartRedux?.some(e => e.productid == cur?.product_details[0]?._id && e.status)) {
                                setClicked(e=> e+1)
                                return Math.floor(acc + (Math.round(((cur?.product_details[0].price / 100) * (cur?.product_details[0].discount))) * cur.cartData.quantity))
                        }
                        return acc
                }, 0))

      
        }, [cartDetails, cartRedux])


        return (
                <>


                        <div className="bg-gray-100 w-[30vw] mt-6 rounded-md text-3xl p-6 justify-center items-center font-semibold border-2 border-gray-200 shadow-sm">
                                <div className="text-center text-5xl font-bold py-4">
                                        Price Details
                                </div>
                                <div className="flex flex-row py-2 text-gray-600">
                                        <div className="flex-1">Price ({clicked} items)</div>
                                        <div className="flex-1 text-right pr-4"> {originalPrice}</div>
                                </div>
                                <div className="flex flex-row py-2 text-gray-600">
                                        <div className="flex-1">Discount</div>
                                        <div className="flex-1 text-right pr-4">{discount}</div>
                                </div>
                                <div className="flex flex-row py-2 border-b-1 mb-4  pb-1">
                                        <div className="flex-3 border-b-1 pb-2 text-4xl font-semibold">Total Amount</div>
                                        <div className="flex-2 text-right pr-4 border-b-1 pb-2 text-4xl font-semibold">{originalPrice - discount}</div>
                                </div>
                                {/* //      Shipping detail */}                                {/* //      Shipping detail */}                                {/* //      Shipping detail */}
                                <div className=" pt-6 ">
                                        <h3 className="text-5xl font-semibold text-gray-800 mb-6 text-center">Shipping Address</h3>

                                        {/* Option to Select Old Address or Enter New Address */}
                                        <div className="mb-6">
                                                <label className="inline-flex items-center">
                                                        <input
                                                                type="checkbox"
                                                                checked={useOldAddress}
                                                                onChange={() => setUseOldAddress(!useOldAddress)}
                                                                className="form-checkbox h-5 w-5 text-indigo-600"
                                                        />
                                                        <span className="ml-2 text-lg font-medium text-gray-700">Use new address</span>
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
                                                </div>
                                        ) : (
                                                <div className="mb-4">
                                                        <label htmlFor="old-address" className="block text-md font-medium text-gray-700"> Address</label>
                                                        <select
                                                                id="old-address"
                                                                value={findAddress}
                                                                onChange={(e) => {  
                                                                             setSelectedAddress(oldAddresses[e.target.value]);
                                                                             setFindAddress(e.target.value)
                                                                         }}
                                                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        >
                                                                {/* <option value="">{selectedAddress ? `${selectedAddress.name}, ${selectedAddress.address}, ${selectedAddress.city}, ${selectedAddress.state} - ${selectedAddress.zip}`: "Select Address"}</option> */}
                                                                <option value="">Select Address</option>
                                                                        {oldAddresses?.map((address, index) => (
                                                                                <option  key={index} value={index}>
                                                                                        {address.name}, {address.address}, {address.city}, {address.state} - {address.zip}
                                                                                </option>
                                                                        ))}
                                                        </select>
                                                </div>
                                        )}
                                        <div ><div className='w-[100%] bg-gray-200 border border-gray-300 rounded text-center p-4 my-8 ' id="Pay" onClick={handlePlaceOrder}>Proceed to pay</div></div>

                                </div>

                        </div>

                </>
        )
}

export default CartSelect