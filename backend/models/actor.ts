import { Schema, model, Document, ObjectId } from 'mongoose';

interface IActor extends Document {
  name: string;
  profile: string;
  movies: string[];
}

const actorSchema = new Schema<IActor>({
  name: { type: String, required: true },
  profile: { type: String },
  movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }]
});

export default model<IActor>('Actor', actorSchema);
