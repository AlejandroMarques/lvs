import { insertMovieByTMDbId } from './controllers/movieController';
import { searchMovieByTitle } from './utils/tmdbAPI';
import {connect} from 'mongoose';
import {config as configDotenv} from 'dotenv'

async function searchAndInsertMovies(title: string) {
  try {
    const movies = await searchMovieByTitle(title);
    if (movies.length === 0) {
      console.log(`No se encontraron películas con el título "${title}".`);
      return;
    }

    for (const movie of movies) {
      await insertMovieByTMDbId(movie.id);
    }

    console.log('Películas procesadas con éxito.');
  } catch (error) {
    console.error('Error al buscar e insertar las películas:', error);
  }
}

configDotenv();

connect(process.env.mongoURL || 'mongodb://localhost:27017').then(() => console.log('Conexión a MongoDB exitosa'))
.catch((err) => console.error('Error conectando a MongoDB:', err));

searchAndInsertMovies('Interstellar');