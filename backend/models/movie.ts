import { Schema, model, Document, ObjectId } from 'mongoose';

interface IMovie extends Document {
  title: string;
  originalTitle: string;
  year: number;
  ratings: { source: string; value: number; votes: number }[];
  plot: string;
  runtime: number;
  poster: string;
  tmdbId: number;
  imdbId: string;
  premiered: Date;
  genres: string[];
  studio: string;
  directors: string[];
  actors: { actorId: string; role: string; thumb: string }[];
  tags: string[];
}

const movieSchema = new Schema<IMovie>({
  title: { type: String, required: true },
  originalTitle: { type: String, required: true },
  year: { type: Number },
  ratings: [
    {
      source: { type: String },
      value: { type: Number },
      votes: { type: Number }
    }
  ],
  plot: { type: String },
  runtime: { type: Number },
  poster: { type: String },
  tmdbId: { type: Number, unique: true },
  imdbId: { type: String },
  premiered: { type: Date },
  genres: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
  studio: { type: String },
  directors: [{ type: Schema.Types.ObjectId, ref: 'Director'}],
  actors: [
    {
      actorId: { type: Schema.Types.ObjectId, ref: 'Actor' },
      role: { type: String },
      thumb: { type: String }
    }
  ],
  tags: [{ type: String }]
});

export default model<IMovie>('Movie', movieSchema);
