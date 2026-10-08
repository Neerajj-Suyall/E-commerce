import mongoose from "mongoose";

try {
        await mongoose.connect("mongodb://127.0.0.1/ecommerce")
} catch (error) {
        console.log(error);
        process.exit()
}


const BannerSchema = mongoose.Schema({
        banner1: {
                type: String,
                required: true,
                trim: true,
                validate: {
                        validator: function (value) {
                                return value.length > 0;
                        },
                        message: "Banner 1 cannot be empty"
                },
                 timestamps: true, 
        },
        banner2: {
                type: String,
                required: true,
                trim: true,
                validate: {
                        validator: function (value) {
                                return value.length > 0;
                        },
                        message: "Banner 2 cannot be empty"
                },
                 timestamps: true, 
        },
        banner3: {
                type: String,
                required: false,
                trim: true,
                validate: {
                        validator: function (value) {
                                return !value || value.length > 0;
                        },
                        message: "Banner 3 cannot be empty"
                },
                 timestamps: true, 
        },
        banner4: {
                type: String,
                required: false,
                trim: true,
                validate: {
                        validator: function (value) {
                                return !value || value.length > 0;
                        },
                        message: "Banner 4 cannot be empty"
                },
                 timestamps: true, 
        },
        banner5: {
                type: String,
                required: false,
                trim: true,
                validate: {
                        validator: function (value) {
                                return !value || value.length > 0;
                        },
                        message: "Banner 5 cannot be empty"
                },
                 timestamps: true, 
        },
        banner6: {
                type: String,
                required: false,
                trim: true,
                validate: {
                        validator: function (value) {
                                return !value || value.length > 0;
                        },
                        message: "Banner 6 cannot be empty"
                },
                 timestamps: true, 
        },

        banner7: {
                type: String,
                required: false,
                trim: true,
                validate: {
                        validator: function (value) {
                                return !value || value.length > 0;
                        },
                        message: "Banner 7 cannot be empty"
                },
                 timestamps: true, 
        },

        banner8: {
                type: String,
                required: false,
                trim: true,
                validate: {
                        validator: function (value) {
                                return !value || value.length > 0;
                        },
                        message: "Banner 8 cannot be empty"
                },
                 timestamps: true, 
        },


        banner9: {
                type: String,
                required: false,
                trim: true,
                validate: {
                        validator: function (value) {
                                return !value || value.length > 0;
                        },
                        message: "Banner 9 cannot be empty"
                },
                 timestamps: true, 
        },


        banner10: {
                type: String,
                required: false,
                trim: true,
                validate: {
                        validator: function (value) {
                                return !value || value.length > 0;
                        },
                        message: "Banner 10 cannot be empty"
                },
                 timestamps: true, 
        },

})

const banners = mongoose.model("banners", BannerSchema);

export default banners;