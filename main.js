import Vue from 'vue';
// @ts-ignore
import App from './App.vue';
import router from './router';

// @ts-ignore
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

