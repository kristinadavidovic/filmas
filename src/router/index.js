// 3rd
import Vue from 'vue';
import VueRouter from 'vue-router';
// views
import Home from '../views/Home';
import About from '../views/About';
import Movies from '../views/Movies';
import MovieSingle from '../views/MovieSingle';
// utils
import {
  ROUTE_HOME,
  ROUTE_ABOUT,
  ROUTE_MOVIES,
  ROUTE_MOVIE
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
    path: '/movies/:movieId',
    name: ROUTE_MOVIE,
    component: MovieSingle,
    props: true
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
