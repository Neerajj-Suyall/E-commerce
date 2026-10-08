import mongoose from "mongoose";
import Banner from "../models/banner.model.js";
import cloudinary from "../config/cloudinary.js";



const UploadBanners = async (req, res) => {
    try {
        console.log("req.body.Banner = ", req.body);      
                
                console.log("req.files = ", req.files); 

        const bannerData =  {};

        for (const fieldName in req.files) {
            console.log(" req.files", [fieldName][0]);
            
            const file = req.files[fieldName][0];

            const result = await cloudinary.uploader.upload(file.path, {
                folder: "banner"
            });

            bannerData[fieldName] = result.secure_url;
        }

        console.log("bannerData:", bannerData); 

        const savedBanners = await Banner.create(bannerData);

        return res.status(200).json({
            success: true,
            message: "Banners uploaded successfully",
            banners: savedBanners
        });

    } catch (error) {
        console.error("BANNER UPLOAD ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



const getBanners = async (req, res)=>{
        try {
            const bannerimages = await Banner.find()
            // console.log(bannerimages);
            
            res.status(200).json(bannerimages).end()
            return;
        } catch (error) {

             console.error("Error fetching banners:", error);

         res.status(500).json({
            message: "Failed to fetch banners",
            error: error.message
        }).end();
            
        }


};


export {
        UploadBanners,
        getBanners

}