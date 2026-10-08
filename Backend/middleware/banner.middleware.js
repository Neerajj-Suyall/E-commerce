import multer from "multer";

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }

});

const upload = multer({
    storage: storage
});

export const uploadBanners = upload.fields([
    { name: "banner1", maxCount: 1 },
    { name: "banner2", maxCount: 1 },
    { name: "banner3", maxCount: 1 },
    { name: "banner4", maxCount: 1 },
    { name: "banner5", maxCount: 1 },
    { name: "banner6", maxCount: 1 },
    { name: "banner7", maxCount: 1 },
    { name: "banner8", maxCount: 1 },
    { name: "banner9", maxCount: 1 },
    { name: "banner10", maxCount: 1 }
]);

