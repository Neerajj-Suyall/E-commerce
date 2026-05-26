import { useEffect, useState } from "react";
import ProductElement from "./ProductElement";
import constant from "../../constant"
import "../App.css"

function Product() {

        const [insertButton, setInsertButton] = useState(false);
        const [productSno, setProductSno] = useState(1);
        const [name, setName] = useState("");
        const [price, setPrice] = useState("");
        const [discount, setDiscount] = useState("");
        const [stock, setStock] = useState("");
        const [description, setDescription] = useState("");
        const [newProducts, setNewProducts] = useState([]);
        const [datas, setDatas] = useState([])
        const [count, setCount] = useState(null)

        // const [state, setState] = useState('');


        const handleUpdateProduct = () => {
                console.log(newProducts);
                if (name?.trim == "") return
                if (price == "" && price >= 1) return
                if (stock == "" && stock >= 1) return
                if (description == "") return

                setNewProducts([...newProducts, {
                        name: name,
                        price: price,
                        discount: discount,
                        stock: stock,
                        description: description,
                }]);
                // alert("updated")

                setName("");
                setPrice("");
                setDiscount("");
                setStock("");
                setDescription("");
                setProductSno(e => productSno + 1)

        }


        useEffect(() => {
                fetch(`${constant.domain}/product`, {
                        method: "GET",
                        credentials: "include"
                }).then(res => {
                        return res.json();
                }).then(res => {
                        console.log(res);

                        setDatas(res);
                        setCount(count + res.length)
                });
        }, [])

        //   useEffect(() => {
        //         console.log("new datas = ",datas);

        //          }, [datas])

        const previousProduct = (e) => {
                console.log("previousProduct");
                if ( count == datas.length) return
                

                fetch(`${constant.domain}/product/count`, {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                                count : count - datas.length
                        }),
                        credentials: "include"
                }).then(res => {
                        return res.json();
                }).then(res => {
                        console.log("res = ", res);
                        setDatas(res)
                        setCount(count - res.length)
                });

        }

        const nextProduct = (e) => {
                console.log("nextProduct");

                fetch(`${constant.domain}/product/count`, {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                                count : count
                        }),
                        credentials: "include"
                }).then(res => {
                        return res.json();
                }).then(res => {
                        console.log("res = ", res);
                        setDatas(res)
                        setCount(count + res.length)
                });

        }


        return (
                <>

                        {/* <div className=" flex flex-col  items-center min-w-[100vw] min-h-[100vh] p-[50px]  bg-gray-600  pt-[70px]" onClick={handleProjectClick}> */}
                        <div className=" flex flex-col  items-center  min-h-[100vh] p-[50px]  bg-gray-200  pt-[70px]">

                                <div className="flex flex-col text-center  justify-center border-2 w-[80%] text-xl">
                                        <div className="flex flex-row text-2xl font-bold font-serif ">
                                                <div className="flex-3 border-2 p-2 ">S. no.</div>
                                                <div className="flex-3 border-2 p-2 ">Name</div>
                                                <div className="flex-2 border-2 p-2 ">Price</div>
                                                <div className="flex-2 border-2 p-2 ">Off (%)</div>
                                                <div className="flex-2 border-2 p-2 ">Stock</div>
                                                <div className="flex-4 border-2 p-2 ">Description</div>
                                                <div className="flex-2 border-2 p-2 ">Update</div>
                                        </div>

                                        {datas.length >= 1 && datas.map((ittr, index) => (
                                                <ProductElement ittr={ittr} setDatas={setDatas} count={count == datas.length ? index + 1 : (count - datas.length) + index + 1} />
                                        ))}

                                        <div>

                                                {(count != datas.length) &&
                                                        <button className=" h-fit py-2 px-4 m-2 mx-4 rounded-md border hover:bg-blue-100 active:bg-cyan-100 active:border-cyan-600  font-semibold text-2xl" onClick={previousProduct}>Previous</button>
                                                }

                                                {(datas?.length >=1) &&
                                                        <button className=" h-fit py-2 px-4 m-2 rounded-md border hover:bg-blue-100 active:bg-cyan-100 active:border-cyan-600  font-semibold text-2xl" onClick={nextProduct}>Next</button>
                                                }
                                        </div>
                                </div>

                                <div className="pt-[70px]">
                                        {insertButton ?
                                                <div className="flex flex-col text-center  justify-center w-[75vw] text-xl">
                                                        <div className="flex flex-row text-2xl font-bold font-serif ">
                                                                <div className="flex-1 border-2 p-2 ">S. no.</div>
                                                                <div className="flex-3 border-2 p-2 ">Name</div>
                                                                <div className="flex-2 border-2 p-2 ">Price</div>
                                                                <div className="flex-2 border-2 p-2 ">Discount (%)</div>
                                                                <div className="flex-2 border-2 p-2 ">Stock</div>
                                                                <div className="flex-4 border-2 p-2 ">Description</div>
                                                                {/* <div className="flex-2 border-2 p-2 ">Update</div> */}
                                                        </div>

                                                        {newProducts.map((ittr, index) => <div className="flex flex-row uppercase  justify-center overflow-y-visible" >
                                                                <div className="flex-1 border-2 p-2">{index + 1}</div>
                                                                <div className="flex-3 border-2 p-2"> {ittr.name}</div>
                                                                <div className="flex-2 border-2 p-2 ">{ittr.price}</div>
                                                                <div className="flex-2 border-2 p-2 ">{ittr.discount}</div>
                                                                <div className="flex-2 border-2 p-2 ">{ittr.stock}</div>
                                                                <div className="flex-4 border-2 p-2 ">{ittr.description} </div>

                                                        </div>)}


                                                        <div className="flex flex-row uppercase  justify-center" >
                                                                <div className="flex-1 border-2 p-2">{productSno}</div>
                                                                <div className="flex-3 border-2 p-2">  <input type="text" className="w-full border-2 rounded-md p-1" placeholder="Product Name..." onChange={e => setName(e.target.value)} value={name} /></div>
                                                                <div className="flex-2 border-2 p-2 "> <input type="text" className="w-full border-2 rounded-md p-1" placeholder="Price..." onChange={e => setPrice(e.target.value)} value={price} /></div>
                                                                <div className="flex-2 border-2 p-2 "> <input type="text" className="w-full border-2 rounded-md p-1" placeholder="Discount in %" onChange={e => setDiscount(e.target.value)} value={discount} /></div>
                                                                <div className="flex-2 border-2 p-2 "> <input type="text" className="w-full border-2 rounded-md p-1" placeholder="Stock..." onChange={e => setStock(e.target.value)} value={stock} /></div>
                                                                <div className="flex-4 border-2 p-2 "> <input type="text" className="w-full border-2 rounded-md p-1" placeholder="Description..." onChange={e => setDescription(e.target.value)} value={description} /></div>
                                                                {/* <div className="flex-2 border-2 p-2 flex flex-col justify-evenly items-center ">        
                                                                        <button className=" bg-green-400 p-1  px-4 border-2 border-gray-500 rounded-md text-white hover:bg-green-500 hover:border-cyan-400 active:text-black transition-all font-semibold">Add</button>
                                                                </div> */}
                                                        </div>

                                                        <button className="my-[20px] bg-green-400 p-1  px-4 border-2 border-gray-500 rounded-md text-white hover:bg-green-500 hover:border-cyan-400 active:text-black transition-all font-semibold text-3xl" onClick={handleUpdateProduct}>Update</button>

                                                        <button className=" bg-red-400 p-1  px-4 border-2 border-gray-500 rounded-md text-white hover:bg-red-500 hover:border-cyan-400 active:text-black transition-all font-semibold" onClick={e => setInsertButton(!insertButton)}>Hide </button>

                                                </div>

                                                :
                                                <button className=" bg-green-400 p-1  px-4 border-2 border-gray-500 rounded-md text-white hover:bg-green-500 hover:border-cyan-400 active:text-black transition-all font-semibold" onClick={e => setInsertButton(!insertButton)}>Add New Product</button>
                                        }
                                </div>

                        </div>

                </>
        );
};

export default Product 