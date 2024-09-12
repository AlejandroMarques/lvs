import Actor from '../models/actor';
import Director from '../models/director';
import Genre from '../models/genre';
import Movie from '../models/movie';
import { getMovieById, searchMovieByTitle } from '../utils/tmdbAPI';

// Insertar géneros en la base de datos
export async function insertGenres(genreNames: string[]): Promise<string[]> {
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

// Insertar actores en la base de datos
export async function insertActor(actorData: { name: string; role: string; profilePath: string }): Promise<{ actorId: string; role: string; thumb: string }> {
  const { name, role, profilePath } = actorData;
  let actor = await Actor.findOne({ name });
  if (!actor) {
    actor = new Actor({ name, profile: profilePath, movies: [] });
    await actor.save();
  }
  return { actorId: actor._id.toString(), role, thumb: profilePath };
}

// Insertar película utilizando el ID de TMDb
export async function insertMovieByTMDbId(movieId: number): Promise<string> {
  try {
    const movieData = await getMovieById(movieId);

    const genres = await insertGenres(movieData.genres.map((genre: { name: string }) => genre.name));
    const actors = await Promise.all(movieData.credits.cast.slice(0, 5).map((actor: any) => insertActor({
      name: actor.name,
      role: actor.character,
      profilePath: actor.profile_path
    })));

    const newMovie = new Movie({
      title: movieData.title,
      originalTitle: movieData.original_title,
      year: parseInt(movieData.release_date.split('-')[0]),
      ratings: [
        {
          source: 'TMDb',
          value: movieData.vote_average,
          votes: movieData.vote_count
        }
      ],
      plot: movieData.overview,
      runtime: movieData.runtime,
      poster: movieData.poster_path,
      tmdbId: movieData.id,
      imdbId: movieData.external_ids.imdb_id,
      premiered: new Date(movieData.release_date),
      genres,
      studio: movieData.production_companies.length > 0 ? movieData.production_companies[0].name : 'Unknown',
      directors: movieData.credits.crew.filter((person: any) => person.job === 'Director').map((director: any) => director.name),
      actors,
      tags: movieData.tagline ? [movieData.tagline] : []
    });

    await newMovie.save();
    console.log(`Película "${newMovie.title}" insertada con éxito.`);
    return newMovie._id.toString();
  } catch (error) {
    console.error('Error al insertar la película:', error);
    throw error;
  }
}
