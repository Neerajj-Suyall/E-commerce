import {Router} from "express" 
import { ordereditems, orderitem, itemDetail, cartOrder, AdminOrderList } from "../controllers/orders.controller.js"
import { verifyPayment } from "../controllers/payment.controller.js"

const  router = Router()

        
        router.post("/cart/ok", cartOrder)
        router.post("/paymentverify", verifyPayment )
        router.post("/:id", orderitem)
        router.get("/useritems", ordereditems)
        router.get("/invoice/:id", itemDetail)



        router.get("/latest", AdminOrderList)


export default router;