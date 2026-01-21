import { CLOUD_NAME, API_KEY, API_SECRET } from "../config/config.js";
import { v2 as cloudinary } from 'cloudinary';
import multer from "multer";

// Configure Cloudinary
cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET
});


const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, uniqueSuffix)
    }
})

// File Filter Function (Only Allows Specific Image Formats)
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Only image files (JPEG, PNG, GIF, WEBP) are allowed!'), false); // Reject file
    }
};

// Multer Middleware (With Storage & File Filter)
export const upload = multer({ storage, fileFilter });

//file upload to cloudinary
export const fileUpload = async (filePath, folder)=>{
    try {
        let result = await cloudinary.uploader.upload(filePath, {folder: folder});
        return result;
    }catch(err){
        throw new Error("Image upload failed!");
    }
}

// Function to Delete Image from Cloudinary
export const deleteImage = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        if (result === "ok") {
            return { statusCode: 200, message: "Image deleted successfully" };
        } else {
            return {statusCode: 400, message: "Failed to delete image" }
        }
    } catch (error) {
        return {
            statusCode: 500,
            message: "Something went wrong!",
            error: error.message
        }
    }
};

//extract public ID from image url
export const getPublicID = (imageURL) => {
    return imageURL.split("/").slice(-3).join("/").split(".")[0];
};



