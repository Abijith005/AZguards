import { Request, Response } from "express";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import { createAccessToken } from "../helpers/jwtSign";
import { validateCredentials } from "../helpers/inputValidation";
export const userRegister = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const validator = validateCredentials(req.body, true);

    if (!validator.valid) {
      return res
        .status(400)
        .json({ success: false, message: validator.message });
    }
    const user = await userModel.findOne({ email: email });

    if (user) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists" });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    await userModel.create({ name, email, password: hashedPassword });
    return res
      .status(200)
      .json({ success: true, message: "User registration successfull" });
  } catch (error) {
    console.log(`error/n ${error}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const validator = validateCredentials(req.body, false);

    if (!validator.valid) {
      return res
        .status(400)
        .json({ success: false, message: validator.message });
    }
    const user = await userModel.findOne({ email: email });
    if (user) {
      const verifyPassword = await bcrypt.compare(password, user.password);
      if (verifyPassword) {
        const accessToken = createAccessToken({
          id: user.id,
          email: user.email,
        });
        return res.status(200).json({
          success: true,
          message: "Login successfull",
          accessToken,
        });
      } else {
        return res
          .status(401)
          .json({ success: false, message: "Incorrect password" });
      }
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.log(`error/n ${error}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
