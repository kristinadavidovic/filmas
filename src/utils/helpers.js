// utils
import { api } from './api';
import { API_ENDPOINT_CONFIGURATION, API_KEY } from './constants';

export const getImages = async data => {
  let results = [];
  const imagesResponse = await api.get(
    `${API_ENDPOINT_CONFIGURATION}${API_KEY}`
  );
  if (!imagesResponse) return;

  const { data: imgData } = imagesResponse;
  const { images } = imgData;
  const {
    base_url: baseURL,
    poster_sizes: posterSize,
    backdrop_sizes: backdropSize
  } = images;

  results.push(data);
  results = results.flat();

  // TODO: fix sizing
  results.map(result => {
    const posterPath = result['poster_path'];
    const backdropPath = result['backdrop_path'];
    result['backdrop_path'] = `${baseURL}${backdropSize[3]}${backdropPath}`;
    result['poster_path'] = `${baseURL}${posterSize[3]}${posterPath}`;
  });

  return results;
};
