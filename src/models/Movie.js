// 3rd
import { Model } from '@vuex-orm/core';
// utils
import { api } from '../utils/api';
import { API_ENDPOINT_MOVIE_TRENDING_WEEK } from '../utils/constants';
import env from '../utils/env';

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
      `${API_ENDPOINT_MOVIE_TRENDING_WEEK}?api_key=${env('api-key')}`
    );
    if (!response) return;

    const { data } = response;
    const { results } = data;

    Movie.insert({
      data: results
    });

    //? Movie.store().dispatch('wait/end', LOADER_FETCH_MOVIES);
  }

  // getters
  static getTrendingWeek() {
    return Movie.query()
      .orderBy('popularity')
      .get();
  }
}

export default Movie;
