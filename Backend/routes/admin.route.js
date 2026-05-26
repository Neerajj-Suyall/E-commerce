import { Router } from "express";
import { handleAdminUsersData , handleAdminAccess, Adminlogin, Adminlogout, handleAdminName, AdminTesting ,handleImage } from "../controllers/admins.controller.js";
import { authadminLogin } from "../middleware/adminAuth.middleware.js";
import upload from "../models/multer.model.js";

const router = Router();

        router.post("/login",  Adminlogin)
        router.post("/Testing", handleImage, AdminTesting)
        // router.post("/Testing", AdminTesting)
        router.get("/adminData", authadminLogin, handleAdminName)
        router.post("/logout",  Adminlogout)
        router.get("/userdata", authadminLogin, handleAdminUsersData)
        router.post("/:id", authadminLogin,  handleAdminAccess)

export default router;