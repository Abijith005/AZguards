import jwt from "jsonwebtoken";
import { TokenPaylaodDto } from "../dtos/auth.dto";

export const createAccessToken = (payload: TokenPaylaodDto) => {
  try {
    const secret = process.env.JWT_SIGNATURE!;
    const token = jwt.sign(payload, secret, {
      algorithm: "HS256",
      expiresIn: "10m",
    });
    return token;
  } catch (error) {
    console.log("Error \n", error);
    throw new Error("jwt sign error");
  }
};
