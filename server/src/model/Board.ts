import mongoose from '../config/mongoose-config';
export interface IBoard extends mongoose.Document {
  title: string;
  createdAt: string;
  description: string;
}

export const BoardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  createdAt: { type: String, required: true },
  description: { type: String, required: true }
});

const Board = mongoose.model<IBoard>("Board", BoardSchema);
export default Board;