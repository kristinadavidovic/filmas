// 3rd
import { Model } from '@vuex-orm/core';

class Gender extends Model {
  static get entity() {
    return 'genders';
  }

  static fields() {
    return {
      id: this.number(0),
      value: this.string('')
    };
  }

  // set up data
  static fetch() {
    const data = [
      {
        id: 0,
        value: 'Unspecified'
      },
      {
        id: 1,
        value: 'Female'
      },
      {
        id: 2,
        value: 'Male'
      }
    ];

    Gender.insert({ data });
  }

  static getGender(id) {
    return Gender.query().find(id);
  }
}

export default Gender;
