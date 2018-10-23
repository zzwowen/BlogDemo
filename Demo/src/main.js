// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import elementui from './elementui'
import 'assets/style/style.css'
import axios from 'axios';
import VueAxios from 'vue-axios';
import './register'

Vue.use(VueAxios, axios);
elementui();

Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  mounted() {
    if(process.env['NODE_ENV'] === 'development'){
      import("./config/appConfig.json").then((cfg) => {
         this.$store.dispatch('set_theme', {
            theme: cfg.settings.theme.default
         });
         this.$store.dispatch('set_header_color', {
             headerColor: cfg.settings.theme.default
        });
      })
    }else{

    }

  }
})
