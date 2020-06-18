// 3rd
import Vue from 'vue';
import Vuex from 'vuex';
import VuexORM from '@vuex-orm/core';
// models
import Movie from '../models/Movie';
import MovieTrending from '../models/MovieTrending';
import Genre from '../models/Genre';
import MovieGenre from '../models/MovieGenre';

Vue.use(Vuex);

// Create a new instance of Database.
const database = new VuexORM.Database();

// Register Models to Database.
database.register(Movie);
database.register(MovieTrending);
database.register(Genre);
database.register(MovieGenre);

const store = new Vuex.Store({
  plugins: [VuexORM.install(database)],
  state: {},
  mutations: {},
  actions: {},
  modules: {}
});

export default store;
