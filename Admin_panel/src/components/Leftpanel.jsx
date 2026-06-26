import { useState } from 'react'
import image from '../assets/Image/index.js'
import "../App.css"
import { NavLink } from 'react-router-dom'





function Leftpanel({
        adminName
}) {



        return (

                <div className='w-[15vw] shadow-2xl h-[100vh] fixed left-0 top-0 bottom-0 pb-[150px]'>
                        <div className="header1 p-2"><img src={image.Logo} alt="" /></div>
                       <div className=" p-4 flex flex-col justify-evenly h-full">

                                         <NavLink to='/Admin/Home' className={({ isActive }) => `  header_button  center ${isActive ? " bg-cyan-100 " : "bg-gray-300"}`}> Home </NavLink>

                                         <NavLink to='/Admin/Product' className={({ isActive }) => ` header_button center ${isActive ? " bg-cyan-100" : "bg-gray-300"}`}>Product</NavLink>
                               
                                        <NavLink to='/Admin/Report' className={({ isActive }) => ` header_button center ${isActive ? " bg-cyan-100" : "bg-gray-300"}`}>Report</NavLink>

                                        {/* <NavLink to='/Logout' className={({ isActive }) => ` mt-[50px] header_button center ${isActive ? " bg-cyan-100" : "bg-gray-300"}`}>hi {adminName}</NavLink> */}


                                          {(adminName !== null) &&
                                                <div className="group  relative">
                                                        <button type="button" className="text-3xl header_button inline-flex justify-center w-full rounded-md border border-gray-300 bg-gray-200  font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 uppercase" >
                                                                <img src={image.DropDown} alt="DropDown" className='h-10 pr-4 ' />
                                                                {/* <span className='rotate-180 font-extrabold '>^  </span> */}
                                                                {adminName}
                                                        </button>

                                                        {/* Dropdown Menu (Visible on Hover) */}
                                                        <div
                                                                className="group-hover:block w-full bg-gray-100 absolute  group-hover:h-fit  hidden  border-2 border-gray-400 rounded-md">
                                                                <div className="p-1 flex flex-col gap-1 ">
                                                                        <NavLink to="/Logout" className={({ isActive }) => ` block px-4 py-1 text-2xl text-center font-bold text-gray-700 hover:bg-gray-300 hover:border-cyan-500 border-2 border-gray-300 rounded-md ${isActive ? " bg-cyan-100 " : "bg-gray-200"}`}>
                                                                                Log Out
                                                                        </NavLink>
                                                                </div>
                                                        </div>
                                                </div>
                                        }




                                 </div>


                        
                </div>
        )
}

export default Leftpanel





// import { useState } from 'react'
// import image from '../assets/Image/index.js'
// import "../App.css"
// import { NavLink } from 'react-router-dom'





// function Leftpanel() {
//         const [username, setUsername] = useState("Admin");


//         return (

//                 <div className='header_main relative '>
//                         <div className="header_flex_row center w-[100vw] ">
//                                 <div className="header1 p-2"><img src={image.Logo} alt="" /></div>
//                                 <div className="header2 header_flex_row flex-8 ">

//                                         <NavLink to='/app/home' className={({ isActive }) => ` header_button center ${isActive ? " bg-cyan-100 " : "bg-gray-200"}`}> Home </NavLink>

//                                         <NavLink to='/app/Product' className={({ isActive }) => ` header_button center ${isActive ? " bg-cyan-100" : "bg-gray-200"}`}>Product</NavLink>
                               
//                                         <NavLink to='/app/report' className={({ isActive }) => ` header_button center ${isActive ? " bg-cyan-100" : "bg-gray-200"}`}>Report</NavLink>


//                                 </div>




//                                 <div>
//                                         {(username === null) &&
//                                                 <NavLink to="/login" className="header3 header_flex_row ">
//                                                         <button className=' header_button center '> Log in</button>
//                                                 </NavLink>
//                                         }

//                                         {(username != null) &&
//                                                 <NavLink to="/Logout" className="header3 header_flex_row ">
//                                                         <button className=' header_button center '> Log Out</button>
//                                                 </NavLink>
//                                         }

//                                 </div>

//                         </div>
//                 </div>
//         )
// }

// export default Leftpanel
