import axios from 'axios';
import {config as configDotenv} from 'dotenv'

configDotenv()
const API_KEY = process.env.tmdbAPIKey;
const BASE_URL = 'https://api.themoviedb.org/3';
console.log(API_KEY)

export async function getMovieById(movieId: number) {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      params: {
        append_to_response: 'credits,release_dates,external_ids'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los detalles de la película:', error);
    throw error;
  }
}

export async function searchMovieByTitle(title: string) {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      params: {
        query: title,
        include_adult: false,
      }
    });
    return response.data.results;
  } catch (error) {
    console.error('Error al buscar la película por título:', error);
    throw error;
  }
}
