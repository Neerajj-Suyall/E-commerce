import "../App.css"

function Detail() {



        return (
                <>
                        <div className='home_main rounded pb-[0] justify-center' >
                                <div className='detail_main  rounded p-0 m-0 justify-center border-2 border-gray-300 shadow-sm '>
                                        <div className=' detail_top  rounded '>
                                                <img src={item} alt="CardImage" className=' rounded ' />
                                        </div>
                                        <div className='detail_top rounded bg-gray-100'>

                                                <div className='center detail_product'>{storeinput.detail[0].name}</div>
                                                <div className='flex  flex-row gap-10   justify-center '>
                                                        <span className='detail_price'>Rs. {Math.floor((storeinput.detail[0].price/100)*(100-storeinput.detail[0].discount))} 
                                                                <span className='detail_discount'>{storeinput.detail[0].price}
                                                                </span>
                                                        </span>
                                                </div>
                                                <div className="detail_percentage ">
                                                        <span className="text-gray-500 font-normal">Discount    </span>
                                                        {storeinput.detail[0].discount}%
                                                </div>
                                                <div className="detail_stock ">
                                                        <span className="text-gray-500 font-medium">Stock </span>
                                                       {storeinput.detail[0].stock}
                                                </div>
                                                <div className="detail_stock">
                                                        <span className="text-gray-500  font-medium">Rating </span>
                                                        {storeinput.detail[0].rating}*
                                                </div>
                                                <div className="detail_stock text-blue-400">
                                                        {storeinput.detail[0].category}
                                                </div>
                                                <div className="detail_discription">
                                                       {storeinput.detail[0].description}
                                                </div>

                                                <div className='detail_like'>
                                                        <div className='cart_heart'>heart</div>
                                                        {/* <img src="{item}" alt="heart" /> */}
                                                        <div className=' cart'>Add to cart</div>
                                                </div>

                                                <div className='detail_like rounded detail_button'>
                                                        <div className='w-[100%] bg-yellow-50 border border-gray-300 rounded'>Proceed to pay</div>
                                                </div>

                                        </div>
                                </div>
                        </div>
                </>
        )
}

export default Detail