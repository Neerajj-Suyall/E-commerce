import { useEffect, useState } from "react";
import constant from "../../constant"
import "../App.css"


function Testing() {


        return (        
                <>
                        <form action="http://localhost:3002/admin/Testing"  enctype="multipart/form-data" method="post">
                                {/* <input type="file" name="imageFile" className="bg-red-400 m-10" /> */}
                                <input type="text" name="username" value="nerraj" className="bg-red-400 m-10" />
                                <input type="submit" value="Upload Image"   className="bg-yellow-400 m-10"  />
                        </form>

{/*                     <form action="http://localhost:3002/admin/Testing" enctype="multipart/form-data" method="post">
                                <input type="file" name="imageFile" className="bg-red-400 m-10" />
                                <input type="submit" value="Upload Image" className="bg-yellow-400 m-10" />
                        </form> */}
                </>
        )
}

export default Testing
