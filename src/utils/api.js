// 3rd
import axios from 'axios';
// utils
import env from './env';

export const api = axios.create({
  baseURL: `${env('api-base')}/`
});
// export const api = axios.create({
//   baseURL: `${env('api-base')}/`
// });
