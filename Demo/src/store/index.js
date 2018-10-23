import Vue from 'vue'
import Vuex from 'vuex'
import base from './Moudles/base.js'
import layout from './Moudles/layout.js'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    base,
    layout
  }
})

export default store
