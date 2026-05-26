import { Router } from "express";
import {offersList} from "../controllers/offers.controller.js"
const router = Router();

// function userRoute(){
        router.get("/", offersList )

// }

// userRoute();
export default router;