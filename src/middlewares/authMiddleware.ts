import { NextFunction, Request, Response } from "express";
import verifyJwt from "../helpers/jwtVerify";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("heteeeeeeeeeeeeeeeeeeeeeeeee");
  try {
    console.log(req.headers.authorization);

    const token = req.headers.authorization!.split(" ")[1];
    if (!token) {
      return res.status(401).send({ error: "Unauthorized please login again" });
    }
    const verify = verifyJwt(token);
    console.log(verify, "verifryyyyyyyyyyyyyyyyyyyyy");
    if (verify) {
      next();
    } else {
      return res.status(401).send({ success:false,message: "Unauthorized please login again" });
    }
  } catch (error) {
    console.log("Error \n", error);
    res
      .status(401)
      .json({ success: false, message: "Unauthorized please login again" });
  }
};

export default authMiddleware;
