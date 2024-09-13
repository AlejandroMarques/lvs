import Movie from '../models/movie.js';
import { getMovieById, searchMovieByTitle } from '../utils/tmdbAPI.js';
import { Request, Response } from "express";
import GenreController from './genreController.js';
import ActorController from './actorController.js';
import DirectorController from './directorController.js';
import {Types} from 'mongoose';

export default class MovieController {
  public search = (req: Request, res: Response): void => {
    const title = req.params.title;
    if(!title) res.status(500).json({message: 'Title is required'})
    searchMovieByTitle(title)
      .then((movies) => {
        res.status(200).json(movies);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "Error al buscar películas" });
      });
  }

  public save = async (req: Request, res: Response): Promise<void> => {
    const movieId = req.params.id;
    if (!movieId || isNaN(parseInt(movieId))) {
        res.status(500).json({ message: "El id no es correcto", id: req.params.id });
        return; // Asegúrate de retornar si el id es incorrecto
    }

    try {
        const movieData = await getMovieById(parseInt(movieId)); // Si necesitas usar el movieId como número aquí
        const genreController = new GenreController();
        const actorController = new ActorController();
        const directorController = new DirectorController();

        const genres = await genreController.save(movieData.genres.map((genre: { name: string }) => genre.name));


        // Primero crea la película pero no la guardes aún
        const newMovie = new Movie({
            title: movieData.title,
            originalTitle: movieData.original_title,
            year: movieData.release_date ? parseInt(movieData.release_date.split('-')[0]) : undefined,
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
            premiered: movieData.release_date ? new Date(movieData.release_date) : undefined,
            genres,
            studio: movieData.production_companies.length > 0 ? movieData.production_companies[0].name : 'Unknown',
            tags: movieData.tagline ? [movieData.tagline] : []
        });

        // Guardamos la película para obtener el _id generado por MongoDB
        const savedMovie = await newMovie.save(); // Aseguramos que _id sea ObjectId

        // Ahora usamos el _id de la película guardada como movieId para los actores
        const actors = await Promise.all(movieData.credits.cast.map((actor: any) =>
            actorController.save({
                name: actor.name,
                role: actor.character,
                profilePath: actor.profile_path,
                movie: savedMovie._id.toString(), // Usamos el _id de la película guardada
            })
        ));

        const directors = await directorController.save(
          movieData.credits.crew
              .filter((person: any) => person.job === 'Director')
              .map((director: any) => director.name), savedMovie._id.toString()
      );

        // Después de guardar los actores, extraemos sus IDs

        // Ahora actualizamos la película con los IDs de los actores
        savedMovie.actors = actors;
        savedMovie.directors = directors;
        await savedMovie.save(); // Guardamos nuevamente la película

        res.status(200).json({ message: `Película ${savedMovie.title} insertada con éxito.`, movie: savedMovie });
    } catch (error) {
        const errorMessage = `Error al insertar la película: ${error}`;
        res.status(500).json({ message: errorMessage, movieId });
    }
};

}