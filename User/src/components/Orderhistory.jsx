import { useEffect } from "react";
import "../App.css"
import OrderCard from './OrderCard.jsx'; 
import { useState } from "react";
import constant from "../../constant.js";


function Orderhistory() {
	    const [orderDatas, setOrderDatas] = useState([])

    useEffect(() => {
        fetch(`${constant.domain}/order/useritems`, {
            method: "GET",
             credentials: "include" 
        }).then(res => {
            return res.json();
        }).then(res => {
            console.log(res);
            console.log(res[0]);  /// jabhi order list empty ho wo condition ka sochana
            setOrderDatas(res);  
            });
    }, [])


//    const OrderClick = (e)=>{
//     console.log(e.target.id);
//     // console.log(e.target.id == undefined);
//    }

	return (
		<>
			{/* <div className="home_main" onClick={OrderClick}> */}
			<div className="home_main">
                {/* <div>{orderDatas?.length  }</div>S */}
					{orderDatas?.length >1 &&
							orderDatas.map((ittr )=>(
                                <OrderCard order={ittr}  setOrderDatas={setOrderDatas} orderDatas={orderDatas}/>
                            ))
					}

				{
                    orderDatas?.length <= 1 &&
						<div>empty</div>
                        }

			</div>
		</>
	);
};


export default Orderhistory 