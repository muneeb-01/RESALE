import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["*", "webp", "jpg", "jpeg", "png", "gif"],
  },
});
const upload = multer({ storage: storage });

module.exports.upload = upload;
