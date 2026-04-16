import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isImage = file.mimetype.startsWith("image/");
    const isPDF = file.mimetype === "application/pdf";

    return {
      folder: isImage ? "images" : "documents",

      resource_type: isImage ? "image" : "raw", // ✅ important

      allowed_formats: isImage
        ? ["jpg", "jpeg", "png", "webp"]
        : ["pdf"],

      public_id: Date.now() + "-" + file.originalname,
    };
  },
});

const uploadMiddleware = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only images and PDFs are allowed"), false);
    }
  },
});

export default uploadMiddleware;