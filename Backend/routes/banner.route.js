import { Router } from "express";
import { UploadBanners, getBanners} from "../controllers/banner.controller.js"

const router = Router();

router.get("/Allbanner", getBanners);
router.post("/Edit", UploadBanners);



export default router