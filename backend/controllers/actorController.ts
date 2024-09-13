import Actor from '../models/actor.js';
import { ObjectId } from 'mongoose'

export default class ActorController {
  public async save(actorData: { name: string; role: string; profilePath: string; movie: string }): Promise<{ actorId: string; role: string; thumb: string }> {
    const { name, role, profilePath, movie } = actorData;

    let actor = await Actor.findOne({ name });
    if (actor) {
      actor.movies.push(movie); // movieId es un ObjectId aquí
    } else {
      actor = new Actor({ name, profile: profilePath, movies: [movie] }); // movieId es tratado como ObjectId
    }
    
    await actor.save();
    return { actorId: actor._id.toString(), role, thumb: profilePath };
  }

  
}