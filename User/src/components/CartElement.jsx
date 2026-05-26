import { Link } from "react-router-dom"
import "../App.css"
import image from '../assets/Image/index.js'
import { useSelector } from "react-redux";





function CartElement({
        ittr,
}) {

        const cartRedux = useSelector((state) => state.cart);



        return (
                <>
                        {(ittr?.product_details[0]?.name != null) &&
                                <>

                                        <article className="flex flex-row m-6  bg-gray-100 border-2 border-gray-300 rounded-md justify-between p-[12px] w-[60vw] h-[250px]" id={ittr?.product_details[0]?._id} key={ittr?.product_details[0]?._id}  >

                                                <div className="flex-2">
                                                        <img src={image.E3} alt="" className="rounded-md h-full" />
                                                </div>
                                                {/* <input type="checkbox" id={index} className="h-10 w-10"/> */}
                                                <div className=" w-[50%]  justify-between flex flex-col pl-[25px] flex-3">
                                                        <div className="text-3xl font-bold font-serif">{ittr?.product_details[0]?.name}</div>

                                                        <div className="flex flex-col justify-evenly  h-full">

                                                                <div className="text-2xl">Save Rs. <span className="text-2xl  font-bold">{Math.round((ittr?.product_details[0].price / 100) * (ittr?.product_details[0]?.discount))}</span> </div>
                                                                {(ittr?.product_details[0]?.stock >= 1) && <div className="text-2xl">Stock <span className="text-2xl  font-bold">{ittr?.product_details[0]?.stock}</span></div>}
                                                                {(ittr?.product_details[0]?.stock < 1) && <div className="text-2xl">Out of stock</div>}
                                                                <div className="text-2xl text-blue-500 font-sans">{ittr?.product_details[0]?.category}</div>
                                                        </div>

                                                        <div className="flex items-center gap-4 rounded-lg text-2xl  font-bold" >
                                                                <button className="px-5 py-2 transition ease-in-out bg-gray-200 hover:bg-gray-300 hover:border-cyan-500 rounded-lg  border-2 border-gray-400 active:text-white active:bg-red-400 " id="minusValue">-</button>
                                                                <span className="px-4 text-3xl ">{ittr?.cartData?.quantity}</span>
                                                                <button className="px-4 py-2 transition ease-in-out  bg-gray-200 hover:bg-gray-300 hover:border-cyan-500 rounded-lg border-2 border-gray-400 active:text-white active:bg-green-400 " id="addValue">+</button>
                                                        </div>

                                                </div>




                                                {/* right Side */}        {/* right Side */}        {/* right Side */}        {/* right Side */}        {/* right Side */}
                                                <div className="flex flex-col text-2xl   px-4 py-2 items-center justify-between p-[100%] font-bold flex-1 ">
                                                        <div className="text-3xl flex-1 ">Rs. {Math.floor((ittr?.product_details[0]?.price / 100) * (100 - ittr?.product_details[0]?.discount))}
                                                                <span className="text-2xl text-gray-600 line-through  ml-2">{ittr?.product_details[0]?.price}</span>
                                                        </div>
                                                        <img src={image.Delete} className="h-[20%] bg-white p-3 transition ease-in-out text-gray-500 shadow-gray-500 rounded-lg border-2 border-gray-400 hover:bg-red-200 hover:text-black hover:border-cyan-500 active:text-white active:bg-red-300 " id="deleteCart" />
                                                        <input type="checkbox" id="statusButton" className=" flex-1 h-10 w-10  " checked={cartRedux.some((val) => val?.productid === ittr?.product_details[0]?._id && val?.status)} />


                                                </div>



                                        </article>
                                </>
                        }
                        {(ittr?.product_details?.length == 0) &&
                                <>
                                        <article className="flex flex-row m-6  bg-red-100 border-2 border-gray-300 rounded-md justify-between p-[12px] w-[60vw] " id={ittr?.product_details[0]?._id} key={ittr?.product_details[0]?._id} >
                                                <div className="text-3xl font-bold font-serif"> Product will be deleted</div>
                                                <img src={image.Delete} className=" bg-white p-3 transition ease-in-out text-gray-500 shadow-gray-500 rounded-lg border-2 border-gray-400 hover:bg-red-200 hover:text-black hover:border-cyan-500 active:text-white active:bg-red-300 h-[50px]" id="deleteCart" />

                                        </article>
                                </>}


                </>
        )
}

export default CartElement