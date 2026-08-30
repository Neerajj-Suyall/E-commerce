import User from "../models/users.model.js";
import Orderlists from "../models/orders.model.js";
import cartsdb from "../models/carts.model.js";
import { gernateToken } from "../middleware/auth.middleware.js"
import { authadminLogin, gernateadminToken } from "../middleware/adminAuth.middleware.js"
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const login = async (req, res) => {
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


        // const data = {
        //         email: req.body.email,
        //         password: req.body.password,
        // }


        // //mongodb
        // const result = await User.findOne(data, { _id: 1, name: 1, admin: 1 });
        // console.log("login result", result);



        let password = req.body.password;


        //mongodb
        const result = await User.findOne({ email: req.body.email }, { _id: 1, name: 1, admin: 1, password: 1, });
        const isMatch = await bcrypt.compare(
                req.body.password,
                result.password);


        console.log("login result", result);
        console.log("isMatch", isMatch);

        if (result === null || result?.admin === true || isMatch == false) {
                console.log("null");
                res.status(403).json([loginError]).end();
                return;
        }
        console.log("req.body = ", result?.admin == true);
        // console.log( result._id.toString());
        // console.log(result.name);


        const payload = {
                // email: req.body.email
                name: result.name,
                id: result._id.toString()
        }

        const token = gernateToken(payload);
        console.log(token);

        loginInfo.data = result;
        res.status(200).cookie("userauth", token, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
        }).json([loginInfo]).end();
}

const registration = async (req, res) => {
        console.log("mAI REGISTER");

        let registerInfo = {
                "msg": "register sucessfully",
                "success": true,
                "data": {
                        "Result": "user register success fully"
                }
        }

        let registerError = {
                "msg": "registration error",
                "success": false,
                "data": null
        }
        console.log(req.body);
        if ((req.body == null) ||
                (req.body.name == null) ||
                (req.body.email == null) ||
                (req.body.phoneNo == null) ||
                (req.body.password == null) ||
                (req.body.dateofBirth == null) ||
                (req.body.password != req.body.confirmpassword)) {
                console.log(req.body);
                res.json(registerError).end();
                return;
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        console.log("hashedPassword", hashedPassword);


        const data = {
                name: req.body.name,
                phoneNo: req.body.phoneNo,
                dateofBirth: req.body.dateofBirth,
                email: req.body.email,
                password: hashedPassword,
                address: [],
                defaultAddress: {},
                admin: false,

        }

        console.log("data is  here = ", data);



        const result = await User.create(data);

        if (result._id != null) {
                // await Orderlists.insertOne({ userid: result._id })
                await cartsdb.insertOne({ userid: result._id })
        }

        // res.status(201).json(result).end();
        res.status(201).json(registerInfo).end();
}

const handleAddress = async (req, res) => {

        let Info = {
                "msg": "address save sucessfully",
                "success": true,
                "data": {
                        "Result": "user address save sucessfully"
                }
        }

        let Error = {
                "msg": "address error",
                "success": false,
                "data": null
        }
        // console.log("req.body",req.body);
        let id = req.authData.id

        // console.log("req.body",req.body == null);
        // console.log("req.body.name",req.body.name == null);
        // console.log("req.body.address",req.body.address == null);
        // console.log("req.body.city",req.body.city == null);
        // console.log("req.body.state",req.body.state== null);
        // console.log("req.body.zip",req.body.zip == null);
        // console.log("req.body.mobile",req.body.phoneNo == null);


        if ((req.body == null) ||
                (req.body.name == null) ||
                (req.body.address == null) ||
                (req.body.city == null) ||
                (req.body.state == null) ||
                (req.body.zip == null) ||
                (req.body.phoneNo == null)) {

                console.log(req.body);
                res.json(Error).end();
                return;
        }
        let shipping = req.body;


        console.log("Address", id);

        let a = await User.updateOne({ _id: id }, { $push: { address: shipping } })
        // let a = await User.find({ _id: id })
        //       let result = await cartsdb.updateOne({ userid: id }, { $push: { productid: { cartid , cartQuantity : 1 } } })
        console.log("a", a);


        res.status(201).json(Info).end();
        // res.status(201).json(registerInfo).end();    
}

const handleAddressData = async (req, res) => {
        //     console.log("mAI handleAddressData");
        let id = req.authData.id
        let a = await User.find({ _id: id }, { address: 1, DefaultAddress: 1 })
        //   console.log("temp",a);

        res.json(a).end();
}

const userName = async (req, res) => {
        let id = req.authData?.id;
        if (id === undefined || id === null) {
                res.status(404).end();
                return
        }

        let a = await User.find({ _id: id }, { _id: 0, name: 1 })
        // console.log("userName",a);

        res.status(200).json(a).end();
        return;
}

const userProfile = async (req, res) => {
        let id = await req.authData.id
        if (id == null || id == undefined) return
        console.log(id);

        let a = await User.find({ _id: id }, { password: 0 })

        res.json(a).end();
}

const addressDefault = async (req, res) => {
        let id = await req.authData?.id
        console.log("addressDefault = ", req.body);


        if (id == null || id == undefined) return

        let a = await User.updateOne({ _id: id }, { $set: { defaultAddress: req.body } })

        // let result = await User.updateOne({ userid: id, "cartData.productid": product }, { $set: { "cartData.$.quantity": req.body.quantity } })

        // let result = await User.updateOne({ userid: id }, { $pull: { cartData: { productid } } })


        res.json(a).end();
}

const logout = async (req, res) => {
        // let id = await req.authData?.id
        // if (id == null || id == undefined) return
        res.status(200).cookie("userauth", " ", {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                maxAge: 1,
        }).end();

}




export { login, registration, handleAddress, handleAddressData, userName, userProfile, addressDefault, logout }