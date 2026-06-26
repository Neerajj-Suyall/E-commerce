// import { ageValidate, hello , Router as newRouter } from "./user.route.js";
import userRoute from "./user.route.js";
import productRoute from "./product.route.js";
 import offerRoute from "./offer.route.js"
 import cartRoute  from "./cart.route.js";
 import orderRoute  from "./order.route.js";
 import reviewRating  from "./reviewRating.route.js";
 import adminPanel from "./admin.route.js"
import { authLogin } from "../middleware/auth.middleware.js";
import { authadminLogin } from "../middleware/adminAuth.middleware.js";

import {Router} from "express";
const router = Router()

// function indexRoute() { 
        router.get("/", (req, res) => { res.end("hello world"); })
        // router.use("/user",authLogin,  userRoute)
        router.use("/user",   userRoute)        
        router.use("/products", authLogin, productRoute)
        router.use("/offers",authLogin,  offerRoute)
        router.use("/cart",authLogin,  cartRoute)
        router.use("/order", authLogin, orderRoute)
        router.use("/review", authLogin, reviewRating)

        // router.use("/adminproduct",  productRoute)
        // router.use("/adminproduct",  productRoute)
        router.use("/product", authadminLogin,  productRoute)
        router.use("/admin",   adminPanel)
        router.use("/userOrder", authadminLogin, orderRoute )

        // router.get("/search/:prodname", authLogin productPage)

// }

// indexRoute();
export default router;