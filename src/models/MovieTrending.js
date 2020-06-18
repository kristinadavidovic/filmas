// 3rd
import { Model } from '@vuex-orm/core';
// utils
import { api } from '../utils/api';
import { API_ENDPOINT_MOVIE_TRENDING_WEEK, API_KEY } from '../utils/constants';
import { getImages } from '../utils/helpers';

class MovieTrending extends Model {
  static get entity() {
    return 'movies-trending';
  }

  static fields() {
    return {
      id: this.attr(null),
      adult: this.boolean(false),
      budget: this.number(0),
      original_language: this.string('en'),
      original_title: this.string(null),
      overview: this.string(null),
      popularity: this.number(null),
      poster_path: this.string(null),
      production_companies: this.attr(null),
      production_countries: this.attr(null),
      release_date: this.attr(null),
      revenue: this.number(0),
      runtime: this.number(0),
      spoken_languages: this.attr(null),
      status: this.string(''),
      title: this.string(null),
      vote_average: this.number(null),
      vote_count: this.number(null)
    };
  }

  // api calls
  static async fetchTrendingWeek() {
    const response = await api.get(
      `${API_ENDPOINT_MOVIE_TRENDING_WEEK}${API_KEY}`
    );
    if (!response) return;

    const { data } = response;
    let { results } = data;

    results = await getImages(results);

    MovieTrending.insert({
      data: results
    });
  }

  // getters
  static getTrendingWeek() {
    return MovieTrending.all();
  }
}

export default MovieTrending;
