import env from './env';

// loaders
export const LOADER_FETCH_MOVIES = 'fetch-trending-movies';

// api endpoints
export const API_KEY = `?api_key=${env('api-key')}`;
export const API_ENDPOINT_CONFIGURATION = 'configuration';
export const API_ENDPOINT_GENRES = 'genre/movie/list';
export const API_ENDPOINT_MOVIE_DETAILS = 'movie';
export const API_ENDPOINT_MOVIE_DISCOVER = 'discover/movie';
export const API_ENDPOINT_MOVIE_TRENDING_WEEK = 'trending/movie/week';

// routes
export const ROUTE_ABOUT = 'about';
export const ROUTE_GENRE = 'genre';
export const ROUTE_GENRES = 'genres';
export const ROUTE_HOME = 'home';
export const ROUTE_MOVIE = 'movie';
export const ROUTE_MOVIES = 'movies';
export const ROUTE_PERSON = 'person';
