// 3rd
import { Model } from '@vuex-orm/core';
// utils
import { api } from '../utils/api';
import { API_ENDPOINT_GENRES, API_KEY } from '../utils/constants';

class Genre extends Model {
  static get entity() {
    return 'genres';
  }

  static fields() {
    return {
      id: this.attr(null),
      genre_id: this.attr(null),
      name: this.string('')
    };
  }

  // api calls
  static async fetch() {
    const response = await api.get(`${API_ENDPOINT_GENRES}${API_KEY}`);

    const { data } = response;
    const { genres } = data;

    Genre.insert({
      data: genres
    });
  }

  // getters
  static getGenre(id) {
    return Genre.find(id);
  }
}

export default Genre;
