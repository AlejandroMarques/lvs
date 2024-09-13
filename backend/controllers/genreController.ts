import Genre from '../models/genre.js';

export default class GenreController {
  public async save(genreNames: string[]): Promise<string[]> {
    const genreIds: string[] = [];
    for (const name of genreNames) {
      let genre = await Genre.findOne({ name });
      if (!genre) {
        genre = new Genre({ name });
        await genre.save();
      }
      genreIds.push(genre._id.toString());
    }
    return genreIds;
  }
}