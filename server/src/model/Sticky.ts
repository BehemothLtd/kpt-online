import mongoose from '../config/mongoose-config';
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