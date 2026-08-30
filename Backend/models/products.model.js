import mongoose from "mongoose"

try {
        await mongoose.connect("mongodb://127.0.0.1/ecommerce")
} catch (error) {
        console.log(error);
        process.exit()
}


const ProductSchema = mongoose.Schema({

        name: String,
        category: String,
        productid: new mongoose.Schema.Types.ObjectId,
        price: Number,
        discount: { type: Number, max: 99 },
        stock: { type: Number, min: 0 },
        rating: { type: Number, max: 5, min: 1 },
        description: String,
        images: {
                type: [String],
                required: true,
                validate: {
                        validator: function (images) {
                                return images.length >= 1 && images.length <= 10;
                        },
                        message: "Product must have between 1 and 10 images.",
                },
        },
})

const Products = mongoose.model("products", ProductSchema);

export default Products;