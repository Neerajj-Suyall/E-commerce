import { Router } from "express";
import { login, registration, handleAddress, handleAddressData, userName, userProfile, addressDefault, logout,  } from "../controllers/users.controller.js";
import { authLogin } from "../middleware/auth.middleware.js";


const router = Router();

// function userRoute(){
        router.post("/login",  login)
        router.post("/logout",  logout)
        router.get("/header/name", authLogin, userName)
        router.get("/profile", authLogin, userProfile)          
        router.post("/setDefault", authLogin, addressDefault)          
        router.post("/registration", registration)
        router.post("/Address", authLogin, handleAddress)
        router.get("/Addressdetail", authLogin, handleAddressData)

        // router.post("/Adminlogin",  Adminlogin)
        // router.get("/userdata",  handleAdminUsersData)
        // router.post("/:id",  handleAdminUsersAccess)

// }

// userRoute();
export default router;