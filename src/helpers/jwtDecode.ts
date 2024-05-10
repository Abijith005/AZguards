import jwt from "jsonwebtoken";
import { tokenPaylaodDto } from "../dtos/auth.dto";

const jwtDecode = (token: string): tokenPaylaodDto => {
  try {
    const decode = jwt.decode(token) as tokenPaylaodDto;

    return decode;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

export default jwtDecode;
