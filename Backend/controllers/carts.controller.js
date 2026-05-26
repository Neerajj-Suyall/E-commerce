import cartsdb from "../models/carts.model.js";
import productdb from "../models/products.model.js"     
import mongoose from "mongoose";

//id aur quantity
const cartProduct = async (req, res) => {
       // console.log("cartProduct");
       let id = req.authData.id   
       const cart = await cartsdb.find({ userid: id })
       let data = (cart.length >= 1) ? cart[0].cartData : null;
       // console.log("data", data);

       res.status(200).json(data).end()
}

// //id aur quantity kai sath product ka detail
const handleCartData = async (req, res) => {
       // console.log(req.authData.id);
       // let id = new mongoose.Types.ObjectId(req.authData.id)
       let id = req.authData.id

       console.log(id);
       
       
       const cart = await cartsdb.aggregate([
              {
              $match: { userid: new mongoose.Types.ObjectId(id) },
              },
             {
              $unwind: "$cartData"
              }, 
              {
                     $lookup: {
                            from: "products",  // The second collection's name
                            localField: "cartData.productid",   // Field from the first collection
                            foreignField: "_id",         // Field from the second collection
                            as: "product_details"       // Alias for the resulting joined data
                     }
              },
              {
                     $project: {
                            "cartData.productid" : 0,
                            "product_details.id" : 0
                     }
                     }, 

       ])

       console.log("cart = ",cart);
       
       if (cart.length >= 1) {
            res.status(200).json(cart).end()
            return  
       }

       res.status(500).end()
}

// id akai base par products ka detail 
const cartProductDetail = async (req, res) => {
       // console.log(req.body);
       // console.log("cartProductDetail");
       // let id = req.authData.id
       let ids = req.body
       console.log(ids)
       
       // const cart = await productdb.find({ _id: { $in: ids } }, { id: 0, description: 0 })
       const cart = await productdb.find({ _id: { $in: ids } })
       // console.log("cart", cart);

       res.status(200).json(cart).end()
}

const  minusCart = async (req, res) => {
       let id = req.authData.id
       let productid =new mongoose.Types.ObjectId(req.body.productid);
       // console.log(id);
       

       let result = await cartsdb.updateOne({ userid: id }, { $pull: { cartData: { productid:productid} } })
       // let result = await cartsdb.find({ userid: id })
       // let temp = await cartsdb.find()
       // console.log("productid result = ", result);
       res.status(200).json(result).end()
}

const addCart = async (req, res) => {
       // let productid = req.body.productId;
       let productid = req.body.productid;
       // console.log("productid = ", productid);
       
       let id =  req.authData.id
       let result = await cartsdb.updateOne({ userid: id }, { $push: { cartData: { productid:productid, quantity: 1 } } })
       // let result = await cartsdb.find({ userid: id })

       //  console.log("productid result = ", result);

       if (result.acknowledged == true || result.modifiedCount != 0) {
              res.status(200).end()
              return
       }
       res.status(500).end()
       return;
}

// quantiy change 
const countCart = async (req, res) => {

       //  console.log("countCart");
       console.log("countCart",req.body);
       let product = new mongoose.Types.ObjectId(req.body.productid);
       // console.log(product);
       

       let id = req.authData.id
       if (req.body.productid != null && req.body.quantity >= 1) {
              let result = await cartsdb.updateOne({ userid: id, "cartData.productid": product }, { $set: { "cartData.$.quantity": req.body.quantity } })
              console.log("result 104 cart", result);

                if (result.modifiedCount >=1) {     
                            res.status(200).json(result).end()
                            return
                    }
                     res.status(500).json(result).end()
                     return;
       }

}

const deleteCart = async (req, res) => {
       // console.log(req.body);

       // frontend sai object mai 2 data ayege
       //! aak mai count hoga dusere ami id 
       
       let id = req.authData.id
       let productdelete = new mongoose.Types.ObjectId(req.body.productid);
       // console.log(productdelete);
       
       if (req.body.productid != null) {

              let result = await cartsdb.updateOne({ userid: id },  {$pull: { cartData: { productid:productdelete } }})
              // console.log("result", result);

              if (result.modifiedCount >= 1) {
                     res.status(200).end()
                     return
              }
              res.status(500).end()
              return;
       }

}



export { cartProduct, addCart, minusCart, cartProductDetail, countCart, deleteCart , handleCartData}
