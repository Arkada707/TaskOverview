import Vue from 'vue';
import VueRouter from 'vue-router';
import loginNsignUp from '@/loginNsignUp.vue';
import App from '@/App.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/loginNsignUp', component: loginNsignUp },
  { path: '/', component: App },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
