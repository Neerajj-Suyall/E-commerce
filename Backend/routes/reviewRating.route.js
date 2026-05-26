import {Router} from "express" 
import { insertReview, productReview, editReview, deleteReview } from "../controllers/review.controller.js"

const  router = Router()

        
        router.post("/insert", insertReview)
        router.post("/edit", editReview)
        router.post("/delete", deleteReview)
        router.get("/feedback/:id", productReview)


export default router;