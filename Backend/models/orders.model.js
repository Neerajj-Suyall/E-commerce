import mongoose from "mongoose"

try {
        await mongoose.connect("mongodb://127.0.0.1/ecommerce")
} catch (error) {
        console.log(error);
        process.exit()
}

const DetailSchema = mongoose.Schema({
                                name: String,
                                productid:new mongoose.Schema.Types.ObjectId,
                                price: Number,
                                discount: {type:Number, min:0, max:99 },
                                description: String,
                                quantity: { type: Number, min:1 },
                                review:{type:Boolean,
                                        default:false,
                                        required:true
                                },
        
}, { _id: false })


const OrderSchema = mongoose.Schema({
        userid: new mongoose.Schema.Types.ObjectId,
        orderdetail: [DetailSchema],
        ordered: {
                type:Date,
                default:Date.now,
                required:true
        },
        delivered: Date,
        shippingdetail: {
                name: String,
                city: String,
                state: String,
                address: String,
                zip: {
                        type: String,
                        max: 6
                },
                phoneNo: {
                        type: String,
                        maxlength: 10,
                        minlength: 8,
                },

        }
})

const Orders = mongoose.model("orders", OrderSchema);

export default Orders;