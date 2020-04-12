import mongoose from "mongoose";

const uri: string = "mongodb://127.0.0.1:27017/kptonline";

mongoose.connect(uri, (err: any) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Successfully Connected!");
  }
});

export default mongoose;