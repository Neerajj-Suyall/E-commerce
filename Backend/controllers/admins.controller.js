import User from "../models/users.model.js";
import Orderlists from "../models/orders.model.js";
import cartsdb from "../models/carts.model.js";
import {authadminLogin, gernateadminToken} from "../middleware/adminAuth.middleware.js"
import mongoose from "mongoose";
import upload from "../models/multer.model.js";


const Adminlogout = async (req, res) => {
        // let id = await req.authData?.id
        // if (id == null || id == undefined) return
        res.status(200).cookie("auth", " ", {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                maxAge:1,       
        }).end();

}


const handleAdminUsersData = async (req, res) => {
        let a = await User.find().limit(28)
        res.status(200).json(a).end();

}

const handleAdminAccess = async (req, res) => {
          const userid = req.params.id;
          console.log("userid = ",userid);
          
        let a = await User.updateOne({_id: userid}, {$set:{admin : req.body.admin}})
        // console.log(a);
        
        res.status(200).json(a).end();
        // res.status(200).end();

}


const Adminlogin = async (req, res) => {
        let loginInfo = {
                "msg": "Success Login",
                "success": true,
                "data": null
        }

        let loginError = {
                "msg": "email/password something wrong",
                "success": false,
                "data": null
        }

        if (req.body == null) {
                res.json(loginError).end()
                return
        }
        if (req.body.email < 10) {
                res.json(loginError).end()
                return
        }
        if (req.body.password < 8) {
                res.json(loginError).end()
                return
        }

        const data = {
                email: req.body.email,
                password: req.body.password,
        }


        //mongodb
        const result = await User.findOne(data, { _id: 1, name: 1 , admin : 1 });
        console.log(result);

        if (result === null && result.admin === false ) {
                console.log("null");
                res.status(403).end("error"); return;
        }
   
        const payload = {
                // email: req.body.email
                name: result.name,
                id: result._id.toString()
        }

        const token = gernateadminToken(payload);
        console.log("token = ", token);

        loginInfo.data = result;
        res.status(200).cookie("auth", token, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
        }).json([loginInfo]).end();
        return
}


const handleAdminName = async (req, res) => {
        const userid = req.authData.id   
          console.log("userid = ",userid);
          
        let a = await User.find({_id: userid}, {name:1, admin:1})
        // console.log(a);
        if (a != null && a[0].admin == true) {
             res.status(200).json(a).end();  
             return 
        }
        // res.status(200).end();
         res.status(500).end();  

}


const AdminTesting = async (req, res) => {
       console.log("file will be here")
       res.status(200).end(); 

}


const handleImage = async (req, res) => {
        const temp = req.body
        // const temp2 = req.file
        console.log("req.bodylkdjfljfl =", temp);
        // console.log("req.files =", temp2);
        
        
//      upload.single("imageFile")(req, res, (err) => {
//     if (err) {
//       return res.status(500).send('Error uploading file');
//     }
    res.send('File uploaded successfully');
//   });

}






export { handleAdminUsersData, handleAdminAccess, Adminlogin, Adminlogout, handleAdminName, AdminTesting, handleImage }