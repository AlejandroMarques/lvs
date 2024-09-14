import axios from 'axios';
import config from '../config.js'


const API_KEY = config.tmdbAPIKey;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function getMovieById(movieId: number) {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      params: {
        append_to_response: 'credits,release_dates,external_ids',
        language: config.LANGUAGE
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
        language: config.LANGUAGE
      }
    });
    return response.data.results;
  } catch (error) {
    console.error('Error al buscar la película por título:', error);
    throw error;
  }
}
