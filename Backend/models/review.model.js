import mongoose, { Types } from "mongoose"

try {
        await mongoose.connect("mongodb://127.0.0.1/ecommerce")
} catch (error) {
        console.log(error);
        process.exit()
}


const reviewRatingSchema = mongoose.Schema({
                                // userid: new mongoose.Schema.Types.ObjectId,
                                userid:  mongoose.Schema.Types.ObjectId,
                                username:String,
                                // productid:new mongoose.Schema.Types.ObjectId ,
                                productid: mongoose.Schema.Types.ObjectId ,
                                // orderid:new mongoose.Schema.Types.ObjectId ,
                                orderid: mongoose.Schema.Types.ObjectId ,
                                rating:{
                                        type:Number,
                                        min:1,
                                        max:5,
                                        
                                },
                                review:String
})      

const reviewRatings = mongoose.model("reviewRatings", reviewRatingSchema);

export default reviewRatings;