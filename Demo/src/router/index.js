import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);
import {
  Content,
  Home
} from 'layout/'
Vue.use(Router)

const Main = () => import('views/Main/Module.vue')
const Setting = () => import('views/Setting/Module.vue')
const EditArticle = () => import('views/EditArticle/Module.vue')
const ArticleDetails = () => import('views/ArticleDetails/Module.vue')
export default new Router({
  routes: [
        {
          path: '/',
          name: 'HelloWorld',
          component: Content,
          redirect: '/home/'
        },
        {
          path: '/home',
          component: Home,
          children:[
            {
             path: '/',
             name: '首页',
             component: Main
           }
         ]
       },
       {
         path: '/setting',
         component: Home,
         redirect: '/setting/',
         children:[
           {
            path: '/',
            name: '设置',
            component: Setting
          }
        ]
      },
    {
      path: '/edit',
      component: Home,
      redirect: '/edit/',
      children:[
        {
          path: '/',
          name: '编辑',
          component: EditArticle
        }
      ]
    },
    {
      path: '/details',
      component: Home,
      redirect: '/details/',
      children:[
        {
          path: '/',
          name: '详情',
          component: ArticleDetails
        }
      ]
    }
  ]
})
