import { Schema, model, Document } from 'mongoose';

interface ICollection extends Document {
  name: string;
  movies: string[];
}

const collectionSchema = new Schema<ICollection>({
  name: { type: String, required: true },
  movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }]
});

export default model<ICollection>('Director', collectionSchema);
