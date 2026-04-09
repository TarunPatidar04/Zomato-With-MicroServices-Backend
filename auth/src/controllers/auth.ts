import { Request, Response } from "express";
import User from "../model/User.js";
import jwt from "jsonwebtoken";
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, name, picture } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        name,
        image: picture,
      });
    }

    const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY as string, {
      expiresIn: "15d",
    });

    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
      token,
      user,
    });
  } catch (error:any) {
    res.status(500).json({
      message: error.message,
      success: false,
      error,
    });
  }
};
