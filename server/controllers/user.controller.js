import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
import { response } from "express";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exist with this email.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      success: true,
      message: "Account Created Successfully.",
    });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to register",
    });
  }
};

export const login = async (req, res) => {
  try {
    const {email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password.",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password,user.password);
    if(!isPasswordMatch){
        return res.status(400).json({
        success: false,
        message: "Incorrect email or password.",
      });
    }
    generateToken(res,user,`Welcome back ${user.name}`);
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to register",
    });
  }
};

export const logout = async (req,res) =>{
  try {
    return res.status(200).cookie("token","",{maxAge:0}).json({
      message:"Logged out succesfully.",
      success:true
    })
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to logout",
    });
  }
}

export const getUserProfile = async (req,res) =>{
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("-password");
    if(!user){
      res.status(404).json({
        message:"Profile not found.",
        success:false
      })
    }
    return res.status(200).json({
      success:true,
      user
    })
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to load user",
    });
  }
}

export const UpdateProfile = async (req,res) =>{
  try {
    const userId = req.id;
    const {name} = req.body;
    const profilePhoto = req.file;

    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({
        message:"User not found.",
        success:false
      })
    }
    //extract public id of the old image from url if it exists
    if(user.photoUrl){
      const publicId = user.photoUrl.split("/").pop().split(".")[0]; //extract publicId
      deleteMediaFromCloudinary(publicId);
    }
    //upload new photo 
    const cloudResponse = await uploadMedia(profilePhoto.path);
      if (!cloudResponse || !cloudResponse.secure_url) {
        return res.status(400).json({
          success: false,
          message: "Failed to upload new profile photo.",
        });
      }

    const photoUrl = cloudResponse.secure_url;
    const updatedData = {name, photoUrl};
    const updatedUser = await User.findByIdAndUpdate(userId,updatedData,{new:true}).select("-password");
    
    return res.status(200).json({
      success:true,
      user:updatedUser,
      message:"profile updated succesfully."
    })
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
    
  }
}