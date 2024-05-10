import jwt from "jsonwebtoken";
import { tokenPaylaodDto } from "../dtos/auth.dto";

 const verifyJwt = (token:string):tokenPaylaodDto|boolean => {
  try {
    const secret = process.env.JWT_SIGNATURE!;
    const userInfo = jwt.verify(token, secret) as tokenPaylaodDto;
    return userInfo;
  } catch (error) {
    console.log("Error \n", error);
    return false
  }
};

export default verifyJwt
