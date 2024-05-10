import jwt from "jsonwebtoken";
import { tokenPaylaodDto } from "../dtos/auth.dto";

export const createAccessToken = (payload: tokenPaylaodDto) => {
  try {
    const secret = process.env.JWT_SIGNATURE!;
    const token = jwt.sign(payload, secret, {
      algorithm: "HS256",
      expiresIn: "1d",
    });
    return token;
  } catch (error) {
    console.log("Error \n", error);
    throw new Error("jwt sign error");
  }
};
