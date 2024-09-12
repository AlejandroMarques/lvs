import { Schema, model, Document } from 'mongoose';

interface IDirector extends Document {
  name: string;
  movies: string[];
}

const directorSchema = new Schema<IDirector>({
  name: { type: String, required: true },
  movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }]
});

export default model<IDirector>('Director', directorSchema);
