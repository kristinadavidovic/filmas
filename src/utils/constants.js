import env from './env';

// loaders
export const LOADER_FETCH_MOVIES = 'fetch-trending-movies';

// api endpoints
export const API_KEY = `?api_key=${env('api-key')}`;
export const API_ENDPOINT_CONFIGURATION = 'configuration';
export const API_ENDPOINT_MOVIE_TRENDING_WEEK = 'trending/movie/week';
export const API_ENDPOINT_MOVIE_DISCOVER = 'discover/movie';
export const API_ENDPOINT_MOVIE_DETAILS = 'movie';

// routes
export const ROUTE_HOME = 'home';
export const ROUTE_ABOUT = 'about';
export const ROUTE_MOVIES = 'movies';
export const ROUTE_MOVIE = 'movie';
