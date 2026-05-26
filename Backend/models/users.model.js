import mongoose from "mongoose"

try {
        await mongoose.connect("mongodb://127.0.0.1/ecommerce")
} catch (error) {
        console.log(error);
        process.exit()
}

const AddressSchema = mongoose.Schema({
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

        }, {_id:false})

const UserSchema = mongoose.Schema({
        name: String,
        phoneNo: {
                        type: Number,
                        maxlength: 10,
                        minlength: 8,
                },
        dateofBirth: String,
        email: String,
        admin : Boolean,
        password: {
                        type: String,
                        max:20,
                        min: 8,
                },     
        address: [AddressSchema],
        defaultAddress: AddressSchema,
})

const User = mongoose.model("users", UserSchema);

export default User;