// 3rd
import { Model } from '@vuex-orm/core';
// utils
import { api } from '../utils/api';
import { API_ENDPOINT_PERSON, API_KEY } from '../utils/constants';
import { getImages } from '../utils/helpers';

class Person extends Model {
  static get entity() {
    return 'people';
  }

  static fields() {
    return {
      id: this.number(null),
      biography: this.string(''),
      birthday: this.attr(null),
      credits: this.attr(null),
      deathday: this.attr(null),
      gender: this.number(0),
      homepage: this.attr(null),
      images: this.attr(null),
      known_for_department: this.string(null),
      name: this.string(null),
      place_of_birth: this.attr(null),
      popularity: this.number(0),
      profile_path: this.string('')
    };
  }

  // api calls
  static async fetchPerson(id) {
    const response = await api.get(
      `${API_ENDPOINT_PERSON}/${id}${API_KEY}&append_to_response=images%2Ccredits`
    );
    if (!response) return;

    let { data } = response;
    data = await getImages(data);

    Person.insert({ data });
  }

  // getters
  static getDetails(id) {
    return Person.query().find(id);
  }
}

export default Person;
