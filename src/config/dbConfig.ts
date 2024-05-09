import mongoose from "mongoose";
 function dbConnect(){
  mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`).then(()=>{
    console.log('DB connected successfully');
  }).catch(err=>{
    console.log("Error while connecting DB\n",err);
  })
}

export default dbConnect