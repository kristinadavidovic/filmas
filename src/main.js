import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

// icons
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCalendarCheck,
  faCalendar,
  faClock,
  faQuoteLeft,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faCalendarCheck, faCalendar, faClock, faQuoteLeft, faInfoCircle);

Vue.component('fa-icon', FontAwesomeIcon);

// stylings
import './scss/app.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  }
}).$mount('#app');
