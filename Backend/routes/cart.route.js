import {Router} from "express";
import { cartProduct ,addCart, minusCart, cartProductDetail, countCart, deleteCart, handleCartData} from "../controllers/carts.controller.js";

const router = Router();

// function cartRouter() {
        router.get("/items", cartProduct )
        router.post("/itemsDetail", cartProductDetail )
        router.get("/cartDatas", handleCartData )
        
        router.post("/additems", addCart ) 
        router.post("/removeitems", minusCart  )
        router.post("/cartcount", countCart  )
        router.post("/cartdelete", deleteCart  )
// }


// cartRouter()
export default router