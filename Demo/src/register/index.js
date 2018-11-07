import lib_$ from 'jquery'
import vue from 'vue'
let GlobePlugin = {};
GlobePlugin.install = function (Vue, options) {
   Vue.prototype['$$lib_$'] = lib_$;

   if (process.env['NODE_ENV'] === 'development') {
       import("../config/appConfig.json").then((cfg) => {
           Vue.prototype['$$appConfig'] = cfg;
       }).catch((err) => {
           Vue.prototype['$$appConfig'] = {};
       });
       import("../config/navRouterConfig.json").then((cfg) => {
         Vue.prototype['$$navRouterConfig'] = cfg;
       }).catch((err) => {
         Vue.prototype['$$navRouterConfig'] = {};
       });
   }
   else {
       let url = 'static/config/appConfig.json?' + new Date().getTime();

       lib_$.ajax({
           url: url,
           type: 'get', //GET
           async: false, //或false,是否异步
           data: {},
           timeout: 5000, //超时时间
           dataType: 'json', //返回的数据格式：
           success: function (cfg, textStatus, jqXHR) {
               Vue.prototype['$$appConfig'] = cfg;
           },
           error: function (xhr, textStatus) {
               Vue.prototype['$$appConfig'] = {};
           },
           complete: function (data) {

           }
       });
     let url1 = 'static/config/navRouterConfig.json?' + new Date().getTime();

     lib_$.ajax({
       url: url1,
       type: 'get', //GET
       async: false, //或false,是否异步
       data: {},
       timeout: 5000, //超时时间
       dataType: 'json', //返回的数据格式：
       success: function (cfg, textStatus, jqXHR) {
         Vue.prototype['$$navRouterConfig'] = cfg;
       },
       error: function (xhr, textStatus) {
         Vue.prototype['$$navRouterConfig'] = {};
       },
       complete: function (data) {

       }
     });
   }

}

vue.use(GlobePlugin);
