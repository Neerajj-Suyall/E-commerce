import { Link } from 'react-router-dom'
import "../App.css"
import image from '../assets/Image/index.js'
import { useEffect, useState } from 'react';
import constant from "../../constant.js";
// import { userNotification } from "../../slice/notificationSlice.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";





function OrderCard({
	order,
	setOrderDatas,
	orderDatas
}) {
	const [rating, setRating] = useState(false) //db ka productdetail
	const [edit, setEdit] = useState(false) //db ka productdetail
	const [editRating, setEditRating] = useState(null) //db ka productdetail
	const [editReview, setEditReview] = useState(null) //db ka productdetail
	const [reviewDatas, setReviewDatas] = useState(null) //db ka productdetail
	const [editProductid, setEditProductid] = useState(null) //id
	const [handleRating, setHandleRating] = useState(null) //new star
	const [handleReview, setHandleReview] = useState(null) //new feedbACK
	// const [product, setProduct] = useState(null) //db ka productdetail
	const [productid, setProductid] = useState(null) //id
	const dispatch = useDispatch();


	// useEffect((e=>{
	// 	console.log(rating);

	// }),[rating, setRating])



	const userfeedback = () => {
		console.log("hello");
		// console.log("product",product);
		console.log("productid", productid);

		if (rating == null) return
		if (handleRating == null) return
		// if (product ==null ) return
		if (productid == null) return

		let ratingData = {
			orderid: order?._id,
			rating: handleRating,
			review: (handleReview == null) ? null : handleReview,
			productid
		}

		fetch(`${constant.domain}/review/insert`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(ratingData),
			credentials: "include"
		}).then(res => {
			return res.json();
		}).then(res => {
			console.log("POST", res);
			alert("review updated")
			console.log("reviewDatas", reviewDatas);
			const temp = [...reviewDatas, ratingData]
			setReviewDatas(temp)
			console.log("reviewDatas", reviewDatas);

			setHandleReview(null)
			setHandleRating(null);
			//  dispatch(userNotification("Thanks for the feedback"))
			toast.success("Thanks for the feedback ");
			setOrderDatas(orderDatas.map(e => {
				if (e._id == ratingData.orderid) {
					e.orderdetail.map(ittr => {
						if (ittr.productid == ratingData.productid) {
							ittr.review = true
							return { ...ittr }
						}
						return ittr
					})
				}
				return e
			}))

		});
	}
	//   fetch(`http://localhost:3002/user/Address`, {
	//     method: "POST",
	//     headers: {
	//         "Content-Type": "application/json"
	//     },
	//     body: JSON.stringify(ratingData),
	//     credentials: "include"
	// }).then(res => {
	//     return res.json();
	// }).then(res => {
	//     console.log("POST",res);
	//     alert("Adress saved")
	// });


	// getting old reviews
	const userReviews = (e) => {
		console.log("hello", e.target.id);
		// console.log("product",product);

		if (e.target.id == null) return


		fetch(`${constant.domain}/review/feedback/${e.target.id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			},
			credentials: "include"
		}).then(res => {
			return res.json();
		}).then(res => {
			console.log("get", res);
			if (res.length >= 1) {
				setReviewDatas(res)
				setOrderDatas(orderDatas.map(e => {
					if (e._id == deleteData.orderid) {
						e.orderdetail.map(ittr => {
							if (ittr.productid == deleteData.productid) {
								ittr.review = false
								return { ...ittr }
							}
							return ittr
						})
					}
					return e
				}))

				return
			}
		});
	}

	const editFeedback = () => {
		if (editRating == null) return
		if (editReview == null) return
		// if (product ==null ) return
		if (editProductid == null) return

		let ratingData = {
			orderid: order?._id,
			rating: editRating,
			review: (editReview == null) ? null : editReview,
			productid: editProductid
		}

		fetch(`${constant.domain}/review/edit`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(ratingData),
			credentials: "include"
		}).then(res => {
			return res.json();
		}).then(res => {
			console.log("POST", res);
			setEditProductid(null)
			setEditReview(null)
			alert("review updated", reviewDatas)
			//  dispatch(userNotification("Feedback Updated"))
			toast.success("Feedback Updated ");
			setReviewDatas(reviewDatas.map(e => {
				if (e.orderid == ratingData.orderid && e.productid == ratingData.productid) {
					return {
						userid: e.userid,
						...ratingData
					}
				}
				return e
			}))
		});
	}

	const deletefeedback = () => {
		let deleteData = {
			orderid: order?._id,
			productid: editProductid
		}
		fetch(`${constant.domain}/review/delete`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(deleteData),
			credentials: "include"
		}).then(res => {
			return res.json();
		}).then(res => {
			console.log("POST", res);
			setEditProductid(null)
			setReviewDatas(null)
			setEditReview(null)
			// alert("review delete")
			//  dispatch(userNotification("Delete Feedback"))
			toast.success("Delete Feedback");
			setReviewDatas(reviewDatas.filter(e => {
				if (e.orderid == deleteData.orderid && e.productid == deleteData.productid) {
					return
				} else {
					return e
				}
			}))

			setOrderDatas(orderDatas.map(e => {
				if (e._id == deleteData.orderid) {
					e.orderdetail.map(ittr => {
						if (ittr.productid == deleteData.productid) {
							ittr.review = false
							return { ...ittr }
						}
						return ittr
					})
				}
				return e
			}))

		});
	}




	return (
		<div id={order?._id}>
			<div className='p-2 flex flex-col bg-gray-200  m-6 border-3 shadow-md border-gray-300 rounded-md justify-between w-[90vw] text-3xl  hover:border-cyan-400 '>
				<div className=' mb-4 mt-2 pb-1 flex flex-row justify-around border-2 border-transparent border-b-black '>
					<div className='text-[30px] flex-1 font-bold  '>Order No. : {order?._id}</div>
					<span className='text-[30px] flex-1 font-semibold  text-right'>
						{order?.ordered}
					</span>
				</div>

				<article className="flex flex-row   w-full gap-2 rounded-md " id="order._id">
					<div className=" flex-1 ">
						<img src={image.E3} alt="" className="rounded-md" />
					</div>
					<div className=" justify-between flex flex-col pl-[25px] flex-1">
						<div className="text-3xl font-bold font-serif">{order?.orderdetail[0]?.name}  {order?.product_details?.length < 1 && <div> + {order?.product_details?.length} </div>}</div>

						<div className="flex flex-col justify-evenly  h-full">

							<div className="text-2xl">Status :<span className="text-3xl  font-bold "> Delivered</span> </div>
							<div className="text-2xl">Delivery Date : 20 Dec 2025 </div>
							<div className="text-2xl">quantity :<span className="font-semibold ">{order?.orderdetail[0]?.quantity}</span> </div>



						</div>


					</div>

					<div className='px-[15px]    flex flex-col  flex-1 justify-around '>
						<div className="text-3xl font-bold font-sans pb-[12px]"> Shipping Info</div>
						<div className="text-2xl   font-semibold">{order.shippingdetail?.name}</div>
						<div className="text-2xl  font-semibold ">mob no. {order.shippingdetail?.phoneNo}</div>
						<div className="text-2xl  font-semibold">{order.shippingdetail?.address}</div>
						<div className="text-2xl  font-semibold ">{order.shippingdetail?.state}</div>
						<div className="text-2xl  font-semibold ">{order.shippingdetail?.zip}</div>
						<Link
							to={`/app/invoice/${order._id}`}
							className="bg-red-200 p-3 transition ease-in-out font-semibold text-gray-500 shadow-gray-500 rounded-lg border-2 border-cyan-200 hover:bg-red-300 hover:text-black hover:border-cyan-500 active:text-white active:bg-red-400 text-center "
							id="deleteCart">
							Detail
						</Link>
					</div>

					{/* <div className="flex flex-col text-2xl px-4 py-2 items-center justify-between h-full  font-bold">
						<div className="text-2xl">quantity :<span className="text-3xl  font-bold "> 1</span> </div>
							<div className="text-2xl">price :<span className="text-3xl  font-bold "> 999</span> </div>
							<div className="text-2xl">total :<span className="text-3xl  font-bold "> 999</span> </div>
						<button className="bg-red-200 p-3 transition ease-in-out text-gray-500 shadow-gray-500 rounded-lg border-2 border-cyan-200 hover:bg-red-300 hover:text-black hover:border-cyan-500 active:text-white active:bg-red-400 " id="deleteCart">Detail </button>
					</div> */}

				</article>
				{/* <div>{order?.orderdetail?.length}</div>
				{order?.orderdetail.length == 1 &&
					<div className="flex flex-col; text-2xl px-4 py-2 items-center justify-between h-full  font-bold">
						<div>{order?.orderdetail?.length}</div>
						<div className="text-3xl p-2">Rating :<input type="number" className="font-bold w-[100px] p-1 pl-2 text-2xl border-2 rounded-md"  id='Rating'/> </div>
						<div className="text-3xl">Review :<input type="text" className="font-bold w-[150px] p-1 pl-2 text-2xl border-2 rounded-md"  id='Review' /> </div>
						<button className="bg-green-200 p-3 transition ease-in-out text-gray-600 shadow-gray-500 rounded-lg border-2 border-gray-400 hover:bg-green-300 hover:text-black hover:border-cyan-500 active:text-white active:bg-green-400 " id="deleteCart">submit </button>
					</div>
				} */}
				<div className='w-[100%] flex flex-col justify-center '>
					{order?.orderdetail.some(e => e?.review == false) &&
						(rating ?

							<div className='flex flex-row m-4  justify-center items-center w-[95%]'>
								<select
									value={productid}
									onChange={(e) => {
										setProductid(e.target.value);
									}}
									className="flex-1 text-2xl px-4 py-2 items-center justify-between h-full  font-bold border-2 rounded-lg">

									<option value="">Select Product</option>
									{order?.orderdetail.map((ittr, index) => {
										if (ittr?.review == false) {
											return <option key={index} value={ittr.productid}>
												{ittr.name}
											</option>
										}
									})}

								</select>
								<div className="text-3xl p-2 flex-1">Rating :<input type="number" placeholder="1-5" className="font-bold w-[100px] p-1 pl-2 text-2xl border-2 rounded-md" value={handleRating} onChange={e => setHandleRating(e.target.value)} id='Rating' /> </div>
								<div className="text-3xl  flex-2">Review :<textarea placeholder="write your review here..." className="font-bold  p-1 pl-2 text-2xl border-2 rounded-md min-h-[45px]" value={handleReview} onChange={e => setHandleReview(e.target.value)} id="Review"></textarea> </div>
								<button className="bg-green-200 p-3 transition ease-in-out text-gray-600 shadow-gray-500 rounded-lg border-2 border-gray-400 hover:bg-green-300 hover:text-black hover:border-cyan-500 active:text-white active:bg-green-400 font-semibold" id="deleteCart" onClick={userfeedback}>submit </button>
							</div>
							:
							<button className="w-[95%] bg-green-200  m-4 p-3 transition ease-in-out text-gray-600 shadow-gray-500 rounded-lg border-2 border-gray-400 hover:bg-green-300 hover:text-black hover:border-cyan-500 active:text-white active:bg-green-400 font-semibold" onClick={() => { setRating(!rating) }}>rating </button>
						)
					}
					{order?.orderdetail.some(e => e?.review == true) &&
						(edit ?
							<div className='flex flex-row m-4  justify-center items-center w-[95%]'>
								<select
									value={editProductid}
									onChange={(e) => {
										setEditProductid(e.target.value);
										const data = reviewDatas.find(ittr => (e.target.value == ittr.productid))
										setEditRating(data.rating)
										setEditReview(data.review)
									}}
									className="flex-1 text-2xl px-4 py-2 items-center justify-between h-full  font-bold border-2 rounded-lg">

									<option value="">Select Product</option>
									{order?.orderdetail.map((ittr, index) => {
										if (ittr?.review == true) {
											return <option key={index} value={ittr.productid}>
												{ittr.name}
											</option>
										}
									})}

								</select>
								<div className="text-3xl p-2 flex-1">Rating :<input type="number" placeholder="1-5" className="font-bold w-[100px] p-1 pl-2 text-2xl border-2 rounded-md" value={editRating} onChange={e => setEditRating(e.target.value)} /> </div>
								<div className="text-3xl  flex-2">Review :<textarea placeholder="write your review here..." className="font-bold  p-1 pl-2 text-2xl border-2 rounded-md min-h-[45px]" value={editReview} onChange={e => setEditReview(e.target.value)}></textarea> </div>
								<button className="bg-green-200 p-3 transition ease-in-out text-gray-600 shadow-gray-500 rounded-lg border-2 border-gray-400 hover:bg-green-300 hover:text-black hover:border-cyan-500 active:text-white active:bg-green-400 font-semibold" onClick={editFeedback}>Edit </button>
								<button className="bg-red-200 p-3 transition ease-in-out text-gray-600 shadow-gray-500 rounded-lg border-2 border-gray-400 hover:bg-red-300 hover:text-black hover:border-cyan-500 active:text-white active:bg-red-400 mx-3 font-semibold " onClick={deletefeedback}>Delete </button>
								{/* <button className="bg-red-200 p-3 transition ease-in-out text-gray-600 shadow-gray-500 rounded-lg border-2 border-gray-400 hover:bg-red-300 hover:text-black hover:border-cyan-500 active:text-white active:bg-red-400 mx-3 font-semibold" >Delete </button> */}
							</div>
							:
							<button className="w-[95%] bg-green-200  m-4 p-3 transition ease-in-out text-gray-600 shadow-gray-500 rounded-lg border-2 border-gray-400 hover:bg-green-300 hover:text-black hover:border-cyan-500 active:text-white active:bg-green-400 font-semibold" onClick={(e) => { userReviews(e), setEdit(!editReview) }} id={order?._id}  >Edit </button>
						)
					}
				</div>
			</div>
		</div>
	);
};


export default OrderCard 