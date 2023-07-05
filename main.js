import { createApp } from 'vue';
import VueCookies from 'vue-cookies';
// @ts-ignore
import App from './App.vue';

createApp(App).use(VueCookies).mount('#app');


