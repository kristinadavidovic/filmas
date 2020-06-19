// 3rd
import Vue from 'vue';
import VueRouter from 'vue-router';
// views
import About from '../views/About';
import Home from '../views/Home';
import Lists from '../views/Lists';
import ListsGenre from '../views/ListsGenre';
import MovieSingle from '../views/MovieSingle';
import Movies from '../views/Movies';
import PersonSingle from '../views/PersonSingle';
// utils
import {
  ROUTE_ABOUT,
  ROUTE_GENRE,
  ROUTE_GENRES,
  ROUTE_HOME,
  ROUTE_MOVIE,
  ROUTE_MOVIES,
  ROUTE_PERSON
} from '../utils/constants';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: ROUTE_HOME,
    component: Home
  },
  {
    path: '/about',
    name: ROUTE_ABOUT,
    component: About
  },
  {
    path: '/movies',
    name: ROUTE_MOVIES,
    component: Movies
  },
  {
    path: '/movie/:movieId',
    name: ROUTE_MOVIE,
    component: MovieSingle,
    props: true
  },
  {
    path: '/movies/list/genres',
    name: ROUTE_GENRES,
    component: Lists
  },
  {
    path: '/movies/list/genres/:genreId',
    name: ROUTE_GENRE,
    component: ListsGenre
  },
  {
    path: '/person/:personId',
    name: ROUTE_PERSON,
    component: PersonSingle,
    props: true
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
