import { createApp } from 'vue';
import VueCookies from 'vue-cookies';
// @ts-ignore
import App from './App.vue';

const app = createApp(App);

// Install VueCookies plugin
app.use(VueCookies);

app.mount('#app');

