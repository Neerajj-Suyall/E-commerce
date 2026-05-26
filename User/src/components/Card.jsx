import { Link, NavLink } from 'react-router-dom'
import image from '../assets/Image/index.js'
import "../App.css"

function Card({
        cart,
        imgsrc,
        ittr,

}) {
        
        return (
                <>     
                        <article className="card_main rounded " id={ittr?._id} key={ittr?._id}>
                                <Link to={`/app/product/details/${ittr?._id}`}>
                                        <img src={image[imgsrc]} alt="CardImage" className='h-[60%] w-fit rounded' />
                                        <div className='center cart_product font-serif'>{ittr?.name}</div>
                                        <div className='flex  flex-row gap-10 '>
                                                <span className='cart_price '>Rs. {Math.floor((ittr?.price/100)*(100-ittr?.discount))} 
                                                        <span className='cart_discount'>{ ittr?.price}
                                                        </span>
                                                        <span className='text-2xl text-amber-600 '>{ittr?.discount}%
                                                        </span>
                                                </span>
                                        </div>
                                </Link>
                                <div className='cart_parent' >
                                        {(cart !== true)&&
                                                <button className='add_cart' id='addCart'>Add to cart</button>
                                        }
                                        {(cart === true)&&
                                                <button className='remove_cart ' id='removeCart'>Cart added</button>
                                        }
                                        
                                               <Link className=' cart'  to={`/app/product/booking/${ittr?._id}`}> <button id='Buy_now'>Buy now</button></Link>
                                        
                                </div>
                                 {/* <div className='cart_parent'>
                                        <button className=' w-[100%] bg-yellow-50 rounded-[4px] p-1' id='Buy_now'>Buy now</button>
                                </div> */}
                        </article>
                </>
        )
}

export default Card 