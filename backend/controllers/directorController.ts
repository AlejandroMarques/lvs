import Director from '../models/director.js';

export default class DirectorController {
  public async save(directors: string[], movie): Promise<string[]> {
    const directorIds: string[] = [];
    for (const name of directors) {
      let director = await Director.findOne({ name });
      if (director) {
        director.movies.push(movie); // movieId es un ObjectId aquí
      } else {
        director = new Director({ name, movies: [movie] }); // movieId es tratado como ObjectId
      }
      await director.save();
      
      directorIds.push(director._id.toString());
    }
    return directorIds;
  }
}