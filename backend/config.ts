import dotenv from "dotenv";
import path from 'path';
const __dirname = path.resolve();
dotenv.config({path: __dirname+'\\backend\\.env'});

interface Config {
  moviesURL: string,
  seriesURL: string,
  mongoURL: string,
  tmdbAPIKey: string
  PORT: number,
  HOSTNAME: string
}

const config:Config = {
    moviesURL: process.env.moviesURL || "http://localhost/movies",
    seriesURL: process.env.seriesURL || "http://localhost/series",
    mongoURL: process.env.mongoURL || 'mongodb://localhost:27017',
    tmdbAPIKey: process.env.tmdbAPIKey || "YOUR_API_KEY",
    PORT: parseInt(process.env.port) || 3000,
    HOSTNAME: process.env.hostname || 'http://0.0.0.0'
};

export default config;