import Vue from 'vue';
import VueRouter from 'vue-router';
// @ts-ignore
import loginNsignUp from '@/loginNsignUp.vue';
// @ts-ignore
import App from '@/App.vue';

// @ts-ignore
Vue.use(VueRouter);

const routes = [
  { path: '/loginNsignUp', component: loginNsignUp },
  { path: '/', component: App },
];

// @ts-ignore
const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
