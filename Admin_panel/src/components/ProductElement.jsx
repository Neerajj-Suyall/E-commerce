import { useState } from "react";
import constant from "../../constant"


function ProductElement({
        ittr,
        setDatas,
        count
}) {

        const [editButton, setEditButton] = useState(false);
        const [name, setName] = useState(ittr.name);
        const [price, setPrice] = useState(ittr.price);
        const [discount, setDiscount] = useState(ittr.discount);
        const [stock, setStock] = useState(ittr.stock);
        const [description, setDescription] = useState(ittr.description);
        const [pressButton, setPressButton] = useState("");
        // const [editValue, setEditValue] = useState({});

        const editUpdate = (e)=>{
                setEditButton(!editButton);
                if (pressButton === "Delete" && e.target.innerText == "Update") {
                         fetch(`${constant.domain}/product/delete/${ittr._id}`, {
                                        method: "GET",      
                                        credentials: "include"
                                }).then(res => {
                                        return res.json();
                                }).then(res => {
                                        setDatas(val =>( val.filter(event => ((event._id != ittr._id) && event) )))
                                        return
                                        // setCount(count + res.length)
                                });
                 }else if (e.target.innerText == "Update") {
                        const change = {
                                name :name, 
                                price:price,
                                discount:discount,
                                stock:stock,
                                description:description
                        }
                        // console.log("change = ",change);

                          fetch(`${constant.domain}/product/${ittr._id}`, {
                                        method: "POST",
                                                    headers: {
                                                                "Content-Type": "application/json"
                                                        },
                                                                 body: JSON.stringify(change),
                                        credentials: "include"
                                }).then(res => {
                                        return res.json();
                                }).then(res => {
                                        console.log("res = ", res);

                                        setDatas(val =>( val.map(event => ((event._id == ittr._id) ? {...event, ...change} : event) )))

                                        // setCount(count + res.length)
                                });

                        return
                 } else if (pressButton == "Cancel") {
                        setName(ittr.name)
                        setPrice(ittr.price);
                        setDiscount(ittr.discount);
                        setStock(ittr.stock);
                        setDescription(ittr.description);
                        console.log("nothing to do its fine");
                        return
                 }
        }

        const deleteCancel = (e) =>{
                 setEditButton(!editButton) 
                  setPressButton(e.target.innerText)
                  return    
        }

        return (
                // <>
                        <div className="flex flex-row uppercase  justify-center "  key={ittr._id} >
                                <div className="flex-3 border-2 p-2">{count}</div>
                                <div className="flex-3 border-2 p-2">{editButton ?  <input type="text" className="w-full border-2 rounded-md p-1" placeholder="Product Name..." onChange={e=> setName(e.target.value)} value={name}/>: ittr.name}</div>
                                <div className="flex-2 border-2 p-2">{editButton ?  <input type="text" className="w-full border-2 rounded-md p-1" placeholder="Price..." onChange={e=> setPrice(e.target.value)} value={price}/>: ittr.price}</div>
                                <div className="flex-2 border-2 p-2">{editButton ?  <input type="text" className="w-full border-2 rounded-md p-1" placeholder="Discount in %"  onChange={e=> setDiscount(e.target.value)} value={discount}/>: ittr.discount}</div>
                                <div className="flex-2 border-2 p-2">{editButton ?  <input type="text" className="w-full border-2 rounded-md p-1" placeholder="Stock..."  onChange={e=> setStock(e.target.value)} value={stock}/>: ittr.stock}</div>
                                <div className="flex-4 border-2 p-2 overflow-clip">{editButton ?  <input type="text" className="w-full border-2 rounded-md p-1" placeholder="Description..."  onChange={e=> setDescription(e.target.value)} value={description}/>: ittr.description}</div>
                                <div className="flex-2 border-2 p-2 flex flex-col justify-evenly items-center ">
                                        <button className=" bg-green-400 p-1 px-4 border-2 border-gray-500 rounded-md text-white hover:bg-green-500 hover:border-cyan-400 active:text-black transition-all font-semibold " onClick={editUpdate} id={ittr._id}>{editButton ?  "Update": "Edit"}</button>
                                        <button className=" bg-red-400 p-1  px-4 border-2 border-gray-500 rounded-md text-white hover:bg-red-500 hover:border-cyan-400 active:text-black transition-all font-semibold"  onClick={deleteCancel}>{editButton ?  "Cancel": "Delete"}</button>
                                </div>
                        </div>



                // </>
        );
};

export default ProductElement 