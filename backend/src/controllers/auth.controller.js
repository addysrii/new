import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Input validation
    if (!username?.trim() || !email?.trim() || !password?.trim()) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Check existing user
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create new user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username: username.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

    // Save user first to ensure successful creation
    await newUser.save();
    
    // Generate token only after successful save
    generateToken(newUser._id, res);

    return res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.error("Error in signup controller:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // Use consistent error message for security
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    generateToken(user._id, res);

    return res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Error in login controller:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { 
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    // Validate image format/size if needed
    const uploadResponse = await cloudinary.uploader.upload(profilePic, {
      folder: "profile_pics",
      allowed_formats: ["jpg", "jpeg", "png"],
      max_bytes: 5000000 // 5MB limit
    });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true, select: "-password" }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in update profile:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error in checkAuth controller:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// userController.js
export const getAllUserNames = async (req, res) => {
    try {
        // Assuming 'username' is the field in your User schema
        const users = await User.find({}, 'username'); // Only fetch the 'username' field
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching usernames:", error);
        res.status(500).json({ message: "Failed to fetch usernames" });
    }
};