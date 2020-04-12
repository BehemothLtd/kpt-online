import mongoose from "mongoose";

const uri: string = "mongodb://127.0.0.1:27017/kptonline";

mongoose.connect(uri, (err: any) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Successfully Connected!");
  }
});
export interface ISticky extends mongoose.Document {
  title: string;
  author: string;
  content: string;
}

export const StickySchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true }
});

const Sticky = mongoose.model<ISticky>("Sticky", StickySchema);
export default Sticky;