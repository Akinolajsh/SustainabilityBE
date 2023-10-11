import { v2 as cloudinary } from "cloudinary";
import env from "dotenv"
env.config()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.KEY,
  api_secret: process.env.SECRET,
  secure: true,
});

export default cloudinary;