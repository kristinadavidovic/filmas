// 3rd
import { Model } from '@vuex-orm/core';
// utils
import { api } from '../utils/api';
import {
  API_ENDPOINT_MOVIE_DETAILS,
  API_ENDPOINT_MOVIE_DISCOVER,
  API_KEY
} from '../utils/constants';
import { getImages } from '../utils/helpers';

class Movie extends Model {
  static get entity() {
    return 'movies';
  }

  static fields() {
    return {
      id: this.attr(null),
      adult: this.boolean(false),
      backdrop_path: this.string(null),
      genre_ids: this.attr(null),
      media_type: this.string('movie'),
      original_language: this.string('en'),
      original_title: this.string(null),
      overview: this.string(null),
      popularity: this.number(null),
      poster_path: this.string(null),
      release_date: this.attr(null),
      title: this.string(null),
      vote_average: this.number(null)
    };
  }

  // api calls
  static async fetch() {
    //? Movie.store().dispatch('wait/start', LOADER_FETCH_MOVIES);

    const response = await api.get(
      `${API_ENDPOINT_MOVIE_DISCOVER}${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
    );
    if (!response) return;

    const { data } = response;
    let { results } = data;

    results = await getImages(results);

    Movie.insert({
      data: results
    });

    //? Movie.store().dispatch('wait/end', LOADER_FETCH_MOVIES);
  }

  static async fetchDetails(id) {
    const response = await api.get(
      `${API_ENDPOINT_MOVIE_DETAILS}/${id}${API_KEY}`
    );
    let { data } = response;
    data = await getImages(data);

    Movie.insert({
      data
    });
  }

  // getters
  static getAll() {
    return Movie.query()
      .orderBy('popularity')
      .get();
  }

  static getDetails(id) {
    return Movie.query().find(id);
  }
}

export default Movie;
