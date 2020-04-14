import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import routerList from './routerList';

Vue.use(VueRouter);

const routes = routerList.map(item=>{
  item.component = ()=>import('../views/'+ item.name);
  return item;
});

const router = new VueRouter({
  routes,
});

export default router;
