// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './app.vue';
import router from './router';
import axios from 'axios';

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
// store - dimension
store.dispatch('Dimension/onWindowResize');
store.dispatch('Video/fetchData');
window.addEventListener('resize', () => {
  store.dispatch('Dimension/onWindowResize');
});
// store - lazyload
function checkAfterSecond(): void {
  setTimeout(() => {
    let timeInterval = 1000;
    if (store.getters['LazyStore/isAllLoaded']) timeInterval = 60000;
    store.dispatch('LazyStore/updateVisibleStatus');
    checkAfterSecond();
  },1000)
}
setTimeout(() => {
  checkAfterSecond();
},1000)
// axios
axios.interceptors.response.use((response: any) => {
  if (response.status === 200 && response.data.success) return response.data;
  else return Promise.reject('failed');
}, (error: any) => {
  return Promise.reject(error);
})

const vueApp = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
