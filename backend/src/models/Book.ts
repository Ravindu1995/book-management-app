import mongoose, { Document, Schema } from "mongoose";

interface IBook extends Document {
  title: string;
  author: string;
  genre: string;
  publicationDate: Date;
}

const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  publicationDate: { type: Date, required: true },
});

const Book = mongoose.model<IBook>("Book", BookSchema);

export default Book;
