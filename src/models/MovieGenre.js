// 3rd
import { Model } from '@vuex-orm/core';

class MovieGenre extends Model {
  static get entity() {
    return 'movie-genre';
  }

  static get primaryKey() {
    return ['movie_id', 'genre_id'];
  }

  static fields() {
    return {
      movie_id: this.attr(null),
      genre_id: this.attr(null)
    };
  }
}

export default MovieGenre;
