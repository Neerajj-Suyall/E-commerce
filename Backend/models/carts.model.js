import mongoose from "mongoose"

try {
        await mongoose.connect("mongodb://127.0.0.1/ecommerce")
} catch (error) {
        console.log(error);
        process.exit()
}

const cartDataSchema = mongoose.Schema({
        productid:new mongoose.Schema.Types.ObjectId ,
        quantity:{type:Number} ,
}, {_id:false})

const CartSchema = mongoose.Schema({
                                userid: new mongoose.Schema.Types.ObjectId,
                                cartData: [cartDataSchema],
})      

const Carts = mongoose.model("carts", CartSchema);

export default Carts;