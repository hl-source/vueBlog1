import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';
import {Button,Submenu,Menu,MenuItem,Input,Divider,Backtop,
  Container,Main,Aside,MessageBox,Form,FormItem,Timeline,TimelineItem,Card,Dialog,Avatar,Tooltip,Upload } from 'element-ui';

Vue.use(Button).use(Submenu).use(Menu).use(MenuItem).use(Input).use(Divider)
  .use(Backtop).use(Container).use(Main).use(Aside).use(Form).use(FormItem).use(TimelineItem)
  .use(Timeline).use(Card).use(Dialog).use(Avatar).use(Tooltip).use(Upload);

Vue.prototype.$msgbox = MessageBox;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
