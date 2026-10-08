import { Router } from "express";
import { handleAdminUsersData , handleAdminAccess, Adminlogin, Adminlogout, handleAdminName, AdminTesting ,handleImage, handleAdminProductAdd } from "../controllers/admins.controller.js";
import { authadminLogin } from "../middleware/adminAuth.middleware.js";
import { uploadProductImages } from "../middleware/upload.middleware.js";
import {uploadBanners} from "../middleware/banner.middleware.js"
import { UploadBanners, getBanners} from "../controllers/banner.controller.js"
// import upload from "../models/multer.model.js";
import multer from "multer";



const router = Router();
const upload = multer({ dest: "uploads/" }); 



        router.post("/login",  Adminlogin)
        router.post("/Testing", handleImage, AdminTesting)
        // router.use("/banner", authLogin, bannerRoute)
        router.get("/AllBanner",  getBanners);
        router.post("/EditBanner",  uploadBanners, UploadBanners);

        // router.post("/Testing", AdminTesting)
        // router.get("/adminData", (req, res)=>{console.log('first'); return res.end();}, authadminLogin, (req, res)=>{ console.log("second"); return res.end()}, handleAdminName)
        router.get("/adminData", authadminLogin, handleAdminName)
        router.post("/logout", Adminlogout)
        router.get("/userdata", authadminLogin, handleAdminUsersData)
        // router.post("/ProductAdd", authadminLogin, handleAdminProductAdd) //original 
        router.post("/ProductAdd",  uploadProductImages,  handleAdminProductAdd)
        router.post("/:id", authadminLogin, handleAdminAccess)
        

export default router;