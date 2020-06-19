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
    backdrop_sizes: backdropSize,
    poster_sizes: posterSize,
    profile_sizes: profileSize,
    secure_base_url: baseURL
  } = images;

  results.push(data);
  results = results.flat();

  // TODO: fix sizing
  results.map(result => {
    const posterPath = result['poster_path'];
    const backdropPath = result['backdrop_path'];
    const profilePath = result['profile_path'];
    result['backdrop_path'] = backdropPath
      ? `${baseURL}${backdropSize[3]}${backdropPath}`
      : null;
    result['poster_path'] = posterPath
      ? `${baseURL}${posterSize[3]}${posterPath}`
      : null;
    result['profile_path'] = profilePath
      ? `${baseURL}${profileSize[3]}${profilePath}`
      : null;
  });

  return results;
};
