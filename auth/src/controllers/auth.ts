import User from "../model/User.js";
import jwt from "jsonwebtoken";
import TryCatch from "../middlewares/trycatch.js";

export const loginUser = TryCatch(async (req, res) => {
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
    token,
    user,
    success: true,
  });
});
