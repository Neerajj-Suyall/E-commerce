import User from "../models/users.model.js";
import Orderlists from "../models/orders.model.js";
import cartsdb from "../models/carts.model.js";
import { authadminLogin, gernateadminToken } from "../middleware/adminAuth.middleware.js"
import productdb from "../models/products.model.js"
import cloudinary from "../config/cloudinary.js";
import mongoose from "mongoose";
import upload from "../models/multer.model.js";
import bcrypt from "bcrypt";


const Adminlogout = async (req, res) => {
        // let id = await req.authData?.id
        // if (id == null || id == undefined) return
        res.status(200).cookie("adminauth", " ", {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                maxAge: 1,
        }).end();

}


const handleAdminUsersData = async (req, res) => {
        let a = await User.find().limit(28)
        res.status(200).json(a).end();

}

const handleAdminAccess = async (req, res) => {
        const userid = req.params.id;
        console.log("userid = ", userid);

        let a = await User.updateOne({ _id: userid }, { $set: { admin: req.body.admin } })
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
                email: req.body.email
                // password: req.body.password,
        }


        //mongodb
        const result = await User.findOne(data, { _id: 1, name: 1, admin: 1, password: 1 });
        console.log(result);

        if (result === null && result.admin === false) {
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
        res.status(200).cookie("adminauth", token, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
        }).json([loginInfo]).end();
        return
}


const handleAdminName = async (req, res) => {
        const userid = req.authData.id
        console.log("userid = ", userid);

        let a = await User.find({ _id: userid }, { name: 1, admin: 1 })
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



// for multer  only// for multer  only// for multer  only// for multer  only// for multer  only// for multer  only
// const handleAdminProductAdd = async (req, res) => {
//         try {
//                 const products = JSON.parse(req.body.products);

//                 // console.log("admins.controller.js line 147",products[0]);
//                 // console.log("admins.controller.js line 148", req.files);        
//                 let images = req.files?.map((file) => file.filename) || []; 
//                 console.log("images", images);

//                 console.log(products[0].name.length >= 3 && products[0].price >= 99 && products[0].discount <= 99 && products[0].stock >= 1 && products[0].description.length >= 10);

//                 //     if (req.body[0].name >= 4 && req.body[0].price >= 99  && req.body[0].discount <= 99  && req.body[0].stock >= 1  && req.body[0].description.length >= 10 ) {
//                 if (products[0].name.length >= 3 && products[0].price >= 99 && products[0].discount <= 99 && products[0].stock >= 1 && products[0].description.length >= 10) {
//                         console.log('await productdb.create(products[0], images)lines 155', images);
//                         console.log("product 0 ", products[0]);

//                         products[0].images = images;
//                         let a = await productdb.create(products[0]);

//                         console.log("hey");
//                         res.status(200).end();
//                 }
//         } catch (error) {
//                 res.status(500).json({
//                         success: false,
//                         message: error.message
//                 }).end();
//         }
// }

const handleAdminProductAdd = async (req, res) => {

        
        
        try {
                const products = JSON.parse(req.body.products);      
                console.log("req.body.products = ", req.body.products);      
                
                console.log("req.files = ", req.files); 

                if (!req.files && req.files.length >= 1 && req.files.length <= 10) {
                        return res.status(400).json({
                                success: false,
                                message: "At least one image is required",
                        });
                }

                let images = [];
                

                for (const file of req.files) {
                        const result = await cloudinary.uploader.upload(file.path, {
                                folder: "products",
                        });

                        images.push(result.secure_url);
                }

                const product = products[0];

                console.log("product",product);

                if (
                        product.name.length >= 3 &&
                        product.price >= 99 &&
                        product.discount <= 99 &&
                        product.stock >= 1 &&
                        product.description.length >= 10
                ) {
                        product.images = images;

                        const savedProduct = await productdb.create(product);

                        return res.status(200).json({
                                success: true,
                                message: "Product added successfully",
                                product: savedProduct,
                        });
                }

                return res.status(400).json({
                        success: false,
                        message: "Invalid product data",
                });

        } catch (error) {
                console.error("PRODUCT ADD ERROR:", error);

                return res.status(500).json({
                        success: false,
                        message: error.message,
                });
        }
};



export { handleAdminUsersData, handleAdminAccess, Adminlogin, Adminlogout, handleAdminName, AdminTesting, handleImage, handleAdminProductAdd }