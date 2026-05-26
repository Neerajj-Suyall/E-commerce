import { useState } from "react";
import "../App.css"
import image from '../assets/Image/index.js'
import { useParams } from "react-router-dom"
import { useEffect } from "react";

function Invoice() {
        const { id } = useParams();
        const [detail, setDetail] = useState([]);
        // const [detail.orderdetail, setProduct] = useState([]);
        // const [detail.shippingdetail?.name, setUser] = useState([]);

           useEffect(() => {
                        fetch(`http://localhost:3002/order/invoice/${id}`, {
                                method: "GET",
                                credentials: "include"
                        }).then(res => {
                                return res.json();
                        }).then(res => {
                                console.log(res);
                                if (res == null) return
                                setDetail(res);
                        });
                },[])
        
    return (
        <>
                 {/* {(detail.length >=1) &&   */}
                <div className="  home_main bg-black">
                        <div className='p-6 flex flex-col bg-gray-200  m-6 border-3 shadow-md border-gray-300 rounded-md justify-between w-[90vw] text-3xl  hover:border-cyan-400 '>
                                <div className="flex flex-row justify-evenly">
                                         <div className="flex-2"><img src={image.Logo} alt="logo" className=" h-[50px]" /></div>
                                        <div className="flex-1 text-right font-extrabold "> Invoice</div>
                                </div>
                                <div>
                                         <div className="flex-2 flex flex-col p-8">
                                                <div className="flex-1 font-bold ">shipping Address</div>
                                                <div className="flex-1 font-semibold">{detail.shippingdetail?.name}</div>
                                                <div className="flex-1">mob no. {detail.shippingdetail?.name?.mobile}</div>
                                                <div className="flex-1">{detail.shippingdetail?.address}</div>
                                                <div className="flex-1">{detail.shippingdetail?.state}</div>
                                                <div className="flex-1">{detail.shippingdetail?.city}{detail.shippingdetail?.zip}</div>
                                                {/* <div className="flex-1">new : <span>yesnew</span></div> */}
                                                {/* <div className="flex-1">invoice no : <span>{detail?._id}</span></div> */}
                                                <div className="flex-1">invoice date : <span>dec</span></div>
                                                {/* <div className="flex-1">Order no : <span>{detail?._id}</span></div> */}
                        
                                         </div>

                                </div>

                                <table className="border-2 text-center border-black border-b-4 " >
                                        <tr>
                                                <th className="flex-1 border-1">S no.</th>
                                                <th className="flex-6 border-1">Description</th>
                                                <th className="flex-2 border-1">Unit Price</th>
                                                <th className="flex-2 border-1">Discount</th>
                                                <th className="flex-2 border-1">Qty</th>
                                                 {/* <td className="flex-2 border-1">Tax</td>   */}
                                                <th className="flex-2 border-1"> Amount</th>  

                                        </tr>

                                                {
                                                        detail.orderdetail?.map((ittr, index)=> (
                                                                <tr  className="border-1">
                                                                        <td className="border-1">{index+1}</td>
                                                                        <td  className="border-1">{ittr?.name}</td>
                                                                        <td  className="border-1">{ittr?.price}</td>
                                                                        <td  className="border-1">{ittr?.discount}%</td> 
                                                                        <td  className="border-1">{ittr?.quantity}</td>
                                                                        {/* <td  className="border-1">15%</td>  */}
                                                                        {/* <td  className="border-1">{(Math.floor((ittr?.price/100)*(100-ittr?.discount)) *(ittr?.quantity))+(Math.floor((ittr?.price/100)*(15)))}</td>  */}
                                                                        <td  className="border-1">{(Math.floor((ittr?.price/100)*(100-ittr?.discount)) *(ittr?.quantity))}</td> 
                                                                </tr> 
                                                ))}

                                                 <tr  className="border-1 ">
                                                         <td className=" text-center text-4xl font-bold " colSpan={5}>Total Amount</td>
                                                        <td  className="border-1 text-4xl font-semibold">
                                                        {
                                                                detail.orderdetail?.reduce((acc, cur)=> {
                                                                         return  acc + (Math.floor((cur?.price/100)*(100-cur?.discount)) *(cur?.quantity))
                                                                        
                                                        },0)}
                                                        </td> 

                                                </tr>



                                       
                                </table>


                                <div className="text-right my-4">
                                       Authorize signature <br/>
                                        Signature image</div>

                                        <table className="border-1  text-center ">
                                                <tr>
                                                        {/* <td className="border-1 font-semibold">hello <span className="font-normal">world</span></td> */}
                                                        <td className="border-1 font-semibold">date & time: <span className="font-normal">Dec 12;30</span></td>
                                                        <td className="border-1 font-semibold">invoice value: <span className="font-normal">{(Math.floor((detail.orderdetail?.price/100)*(100-detail.orderdetail?.discount)) *(detail.orderdetail?.quantity))+(Math.floor((detail.orderdetail?.price/100)*(25))) +(Math.floor((detail.orderdetail?.price/100)*(15)))}</span></td>
                                                        <td className="border-1 font-semibold">payment: <span className="font-normal">COD</span></td>
                                                </tr>
                                        </table>
		        </div>
		</div>
                {/* }  */}
        </>
    )
}

export default Invoice