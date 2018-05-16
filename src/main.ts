// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import router from './router';

// vuetify
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'; // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css';
Vue.use(Vuetify);

// vuex
import Vuex from 'vuex';
import store from './store';
Vue.use(Vuex);

Vue.config.productionTip = false;

// preloads
store.dispatch('Dimension/onWindowResize');
store.dispatch('Video/fetchData');
window.addEventListener('resize', () => {
  store.dispatch('Dimension/onWindowResize');
});

const vueApp = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
