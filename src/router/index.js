// 3rd
import Vue from 'vue';
import VueRouter from 'vue-router';
// views
import Home from '../views/Home';
import About from '../views/About';
// utils
import { ROUTE_HOME, ROUTE_ABOUT } from '../utils/constants';

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
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
