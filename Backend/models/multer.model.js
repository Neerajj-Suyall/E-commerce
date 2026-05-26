import multer from "multer";
import path from "path";



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, );
//     cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// const upload = multer({dest: 'uploads/'});
export default upload