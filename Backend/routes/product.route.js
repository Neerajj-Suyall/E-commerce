import { Router } from "express";
import {productSearchList, productList, productDetail, MoreProductList, handleAdminProductEdit, handleAdminProductdelete, handleAdminProductCount, nextPrevious} from "../controllers/products.controller.js";
const router = Router();

// function userRoute(){
        router.post("/moreProduct", MoreProductList )
        router.get("/search/:prodname", productSearchList )
        router.use("/search/:product/:id", nextPrevious );
        // router.post("/abcd/:product", nextPrevious )
        router.get("/:prodname", productDetail )
        router.get("/", productList )

        router.post("/count", handleAdminProductCount )
        router.post("/:id", handleAdminProductEdit )
        router.get("/delete/:id", handleAdminProductdelete)

// }

// userRoute();
export default router;

