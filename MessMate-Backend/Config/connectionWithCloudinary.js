import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const cloudinaryConnect = () => {
    try {
        cloudinary.v2.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        });
        console.log("Cloudinary configuration successful");
    } catch (err) {
        console.error("Cloudinary configuration error: ", err);
    }
};

export default cloudinaryConnect;

