import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
import path from "path";
dotenv.config({});


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadMedia = async (file) =>{
    try {
        const normalizedPath = path.resolve(file).replace(/\\/g, "/");
        const uploadResponse = await cloudinary.uploader.upload(normalizedPath,{
            resource_type: "auto"
        });
        return uploadResponse;
    } catch (error) {
        console.log(error);
    }
}

export const deleteMediaFromCloudinary = async (publicId) =>{
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.log(error);
    }
}

export const deleteVideoFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId,{resource_type:"video"});
    } catch (error) {
        console.log(error);
    }
}