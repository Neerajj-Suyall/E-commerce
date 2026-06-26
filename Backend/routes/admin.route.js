import { Router } from "express";
import { handleAdminUsersData , handleAdminAccess, Adminlogin, Adminlogout, handleAdminName, AdminTesting ,handleImage, handleAdminProductAdd } from "../controllers/admins.controller.js";
import { authadminLogin } from "../middleware/adminAuth.middleware.js";
import upload from "../models/multer.model.js";

const router = Router();



        router.post("/login",  Adminlogin)
        router.post("/Testing", handleImage, AdminTesting)
        // router.post("/Testing", AdminTesting)
        // router.get("/adminData", (req, res)=>{console.log('first'); return res.end();}, authadminLogin, (req, res)=>{ console.log("second"); return res.end()}, handleAdminName)
        router.get("/adminData", authadminLogin, handleAdminName)
        router.post("/logout", Adminlogout)
        router.get("/userdata", authadminLogin, handleAdminUsersData)
        router.post("/ProductAdd", authadminLogin, handleAdminProductAdd)
        router.post("/:id", authadminLogin, handleAdminAccess)
        

export default router;