import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import File from "../models/File.js"; // Make sure the File model is imported

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

function uploadFileToCloudinary(file, folder, callback) {
    const options = { folder };
    console.log("file path", file.tempFilePath);
    cloudinary.v2.uploader.upload(file.tempFilePath, options, callback);
}

export const imageUpload = async (req, res) => {
    try {
        // Data fetch
        const { name } = req.body;
        console.log(name);
        const file = req.files.imageFile;
        console.log(file);

        // Validation
        const supportedTypes = ["jpeg", "jpg", "png"];
        const fileType = file.name.split('.').pop().toLowerCase();
        console.log("File type", fileType);

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported"
            });
        }

        // File format supported
        console.log("Uploading to MessMate");
        uploadFileToCloudinary(file, "MessMate", async (err, response) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "File upload failed",
                    error: err.message
                });
            }

            console.log(response);

            // DB entry
            try {
                const fileData = await File.create({
                    name,
                    imageUrl: response.secure_url
                });

                res.json({
                    success: true,
                    imageUrl: response.secure_url,
                    message: "Image Successfully Uploaded"
                });
            } catch (dbError) {
                console.log(dbError);
                res.status(500).json({
                    success: false,
                    message: "Database entry failed",
                    error: dbError.message
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};
