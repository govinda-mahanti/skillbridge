import bcrypt from "bcryptjs";
import Admin from "../models/adminModel.js";
import generateToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    if (
      !name ||
      !email ||
      !password
    ) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res
        .status(409)
        .json({ message: "Admin already exists with this email." });
    }

    const newAdmin = await Admin.create({
      name,
      email,
      password,
    });

    if (newAdmin) {
      const token = generateToken(newAdmin._id);
      res.status(201).json({
        _id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        token,
      });
    } else {
      res.status(400).json({ message: "Invalid Admin data." });
    }
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const Admin = await Admin.findOne({ email });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      Admin?.password || ""
    );

    if (!Admin || !isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = generateToken(Admin._id);

    res.status(200).json({
      _id: Admin._id,
      name: Admin.name,
      email: Admin.email,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};

export const getAdminProfile = async (req, res) => {
  try {
    const Admin = await Admin.findById(req.Admin);

    if (!Admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({
      _id: Admin._id,
      name: Admin.name,
      email: Admin.email,
    });
  } catch (error) {
    console.error("Get Admin Profile Error:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export const updateAdminProfile = async (req, res) => {
  try {
    const Admin = await Admin.findById(req.Admin);

    if (!Admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const {
      name,
      email,
    } = req.body;

    Admin.name = name || Admin.name;
    Admin.email = email || Admin.email;
   

    await Admin.save();

    res.status(200).json({
      message: "Admin profile updated successfully",
      Admin: {
        _id: Admin._id,
        name: Admin.name,
        email: Admin.email,
      },
    });
  } catch (error) {
    console.error("Update Admin Profile Error:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const Admin = await Admin.findById(req.Admin);

    if (!Admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res
        .status(400)
        .json({ message: "Please fill all password fields." });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "New passwords do not match." });
    }

    const isPasswordCorrect = await Admin.matchPassword(currentPassword);

    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ message: "Current password is incorrect." });
    }

    Admin.password = newPassword; 
    await Admin.save();

    const token = generateToken(Admin._id);

    res.status(200).json({
      message: "Password updated successfully",
      Admin: {
        _id: Admin._id,
        name: Admin.name,
        email: Admin.email,
      },
      token,
    });
  } catch (error) {
    console.error("Update Password Error:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
