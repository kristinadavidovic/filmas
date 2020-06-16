// 3rd
import { Model } from '@vuex-orm/core';

export default class Movie extends Model {
  static entity = 'movies';

  static fields() {
    return {
      id: this.attr(null)
    };
  }

  // api calls
}
