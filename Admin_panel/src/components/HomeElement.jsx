import { useEffect, useState } from "react";
import constant from "../../constant"
import "../App.css"

function HomeElement({
        ittr,
        index,
        setDatas,
        count
}) {

        const [editButton, setEditButton] = useState(false);
        const [access, setAccess] = useState(ittr.admin);

         const editUpdate = (e)=>{
                setEditButton(!editButton);

                console.log("access =   ", access);
                console.log("ittr =   ", ittr);
                

                if (access == ittr.admin) return


                 if (e.target.innerText == "Update") {
                          fetch(`${constant.domain}/admin/${ittr._id}`, {
                                        method: "POST",
                                                    headers: {
                                                                "Content-Type": "application/json"
                                                        },
                                                                 body: JSON.stringify({
                                                                admin: access
                                                        }),
                                        credentials: "include"
                                }).then(res => {
                                        return res.json();
                                }).then(res => {
                                        console.log("res = ", res);
                        //                 let temp = {admin: access}
                                        setDatas(val =>( val.map(e => (e._id == ittr._id ? {...e, admin: access } : e ))))

                                        // setCount(count + res.length)
                                });

                        return
                 }
                }

                // useEffect(() => {
       


        return (
                <>
                        <div className="flex flex-row uppercase   ">
                                <div className="flex-1 border-2 p-2 overflow-hidden">{count}</div>
                                <div className="flex-2 border-2 p-2  overflow-hidden">{ittr.name}</div>
                                <div className="flex-2 border-2 p-2  overflow-hidden">{ittr.phoneNo}</div>
                                <div className="flex-3 border-2 p-2  overflow-hidden">{ittr.email}</div>
                                {editUpdate &&<div className="flex-2 border-2 p-2">
                                        {editButton ?
                                                <div>
                                                        <button className=" bg-green-400 mx-1 p-1 px-4 border-2 border-gray-500 rounded-md text-white hover:bg-green-500 hover:border-cyan-400 active:text-black transition-all font-semibold " onClick={e=>setAccess(true)}>Admin</button>
                                                        <button className=" bg-red-400 mx-1 p-1 px-4 border-2 border-gray-500 rounded-md text-white hover:bg-red-500 hover:border-cyan-400 active:text-black transition-all font-semibold " onClick={e=>setAccess(false)}>User</button>
                                                </div>
                                                :(ittr.admin? "Admin": "User")}
                                        </div>}
                                        <div className="flex-2 border-2 p-2 flex flex-col justify-evenly items-center ">        
                                                <button className=" bg-green-400 p-1 px-4 border-2 border-gray-500 rounded-md text-white hover:bg-green-500 hover:border-cyan-400 active:text-black transition-all font-semibold " onClick={editUpdate} id={ittr._id}>{editButton ?  "Update": "Edit"}</button>
                                </div>
                        </div>
                </>
        )
}

export default HomeElement
