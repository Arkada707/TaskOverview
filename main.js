import { createApp } from 'vue';
import VueCookies from 'vue-cookies';
// @ts-ignore
import App from './App.vue';

const app = createApp(App);

// Retrieve tasks from cookies
const tasks = app.config.globalProperties.$cookies.get('tasks');
if (tasks) {
  app.config.globalProperties.$tasks = tasks;
}

createApp(App).use(VueCookies).mount('#app');


