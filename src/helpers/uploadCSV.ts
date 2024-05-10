import multer from "multer";
import { Request, Express } from "express";

const uploadCSV = () => {    
  const storage = multer.diskStorage({
    destination: function (
      req: Request,
      file: Express.Multer.File,
      cb: Function
    ) {
      cb(null, "src/public/uploads/"); 
    },
    
    filename: function (req: Request, file: Express.Multer.File, cb: Function) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }); 

  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: Function
  ) => {    
    if (file.mimetype === "text/csv") {
      cb(null, true);
    } else {
      cb(new Error("Only CSV files allowed"), false); 
    }
  };

  return multer({ storage: storage, fileFilter: fileFilter }).single("csvFile")
};

export default uploadCSV
