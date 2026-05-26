import {Router} from "express" 
import { ordereditems, orderitem, itemDetail, cartOrder, AdminOrderList } from "../controllers/orders.controller.js"

const  router = Router()

        
        router.post("/cart/ok", cartOrder)
        router.post("/:id", orderitem)
        router.get("/useritems", ordereditems)
        router.get("/invoice/:id", itemDetail)



        router.get("/latest", AdminOrderList)


export default router;