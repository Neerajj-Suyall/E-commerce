import Orderlists from "../models/orders.model.js";
import productdb from "../models/products.model.js"
import cartsdb from "../models/carts.model.js";
import mongoose from "mongoose";

// for all history
const ordereditems = async (req, res) => {
       let id = new mongoose.Types.ObjectId(req.authData.id)
       // const orders = await Orderlists.find({ userid: id }).limit(25)
       const orders = await Orderlists.find({userid: id }).limit(25)
       console.log("ordereditems",id);
       let data = (orders.length >= 1) ? orders : null;
       // console.log("ordereditems", data);
       if (data != null) {
              res.status(200).json(data).end()
              return
       }
       res.status(500).json(data).end()
       return
}

//for new Entry
const orderitem = async (req, res) => {
       let userdata = req.body.userdata;
       let productdata = req.body.productdata;

       let id = req.authData.id

       console.log("productdata = ", productdata);
       console.log("productdata = ", productdata);
       // console.log("req.body", req.body.userdata);

       // let result = await Orderlists.insertOne({ userid: id, orderdetail:  productdata  ,shippingdetail: userdata})
              let result = await Orderlists.insertOne({ userid: id, orderdetail:{...productdata, productid: productdata._id} ,shippingdetail: userdata})

       console.log("result", result);

       if (req.body.userdata.name == result.orderdetail.userdata.name) {
              res.status(200).json(result[0]).end()
              return
       }
       res.status(500).end()
       return;
}

// for one Detail
const itemDetail = async (req, res) => {

       let id = req.params.id
       const orders = await Orderlists.find({ _id: id })
       let data = (orders.length >= 1) ? orders : null;
       console.log("itemDetail", data);
       res.status(200).json(data[0]).end()
}

//for Cart Entry
const cartOrder = async (req, res) => {
       // console.log("mai yaha hu");
       // console.log("cartOrder");
       let userdata = req.body.userdata;
       let productdata = req.body.productdata;
       let id = req.authData.id
       // console.log("userdata =  ", userdata );
       // console.log("productdata =  ", productdata );

       let productids = productdata.map((ittr) => ittr.productid)

       let result = await productdb.find({ _id: { $in: productids } })
       // console.log("result result result = ",result);
       let finalResult = result.map(e=> {
                const value = productdata.find(ittr=> e._id == ittr.productid )
                console.log("value",e);
                let a = e.toObject();      /////kya yai karna sahi hai ya galat mujhe nahi pata
                return {...a, quantity:value.quantity, productid:e._id }      
       })

       console.log("finalResult= = ",finalResult);
       
       // let checkValid = result.every(e =>
       //             productdata.some(val => val.productid ==e._id && e.stock>=val.quantity)
       //  )

        let checkValid = finalResult.every(e =>e.stock >=e.quantity)
        
       // console.log("checkValid", checkValid);
       if(checkValid == false || checkValid != true ){
              res.status(500).end()
              return;
       }


       //update product collections
       for (let i = 0; i < productdata.length; i++) {
            await productdb.updateOne({ _id: { $in: productdata[i].productid} }, {$inc: { stock: -productdata[i].quantity }})
       }
 
              //update order collections
        await Orderlists.insertMany({ userid: id, orderdetail: finalResult , shippingdetail: userdata  })


          let uncart = await cartsdb.updateMany({ userid: id },  {$pull: { cartData: { productid:{ $in: productids }  } }})


       // console.log("abc = ",result);       
       console.log("abc = ",uncart);       
       
          if (uncart.modifiedCount >=1) {
                     res.status(200).json(uncart).end()
                     return
       // res.status(200).end()
             }
              res.status(500).end()
              return;
}



const AdminOrderList = async (req, res) => {

       const orders = await Orderlists.find().limit(10).sort({ordered : -1})
       let data = (orders.length >= 1) ? orders : null;
       res.status(200).json(data).end()
}


export { ordereditems, orderitem, itemDetail, cartOrder, AdminOrderList }