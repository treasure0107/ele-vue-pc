// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "@/styles/reset.css";
import "@/styles/public.css";
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import ElementUI from 'element-ui';
/* let UserInfo = until.getUserInfo();
 if (UserInfo) {
 Vue.prototype.$userInfo = UserInfo;
 //axios.defaults.headers.common['Authorization'] = "bearer " + UserInfo["Token"];
 } */

axios.interceptors.request.use(config => {
    if (window.localStorage.UserInfo) {
      let UserInfo = JSON.parse(window.localStorage.UserInfo);
      if (UserInfo) {
        Vue.prototype.$userInfo = UserInfo;
        config.headers["Token"] = UserInfo.userinfo.token;
      } else {
        config.headers["Token"] = "";
      }
    }
    return config;
  },
  err => {
    console.error(err);
  }
);

let errFunc = function (error) {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        //router.replace({
        //		path: 'login',
        //		query: {redirect: }
        //})
        break;
    }
  }
  return error.response.data
}
axios.interceptors.response.use(function (response) {
  return response
}, errFunc);


/* if (window.localStorage) {
 let userInfo = JSON.parse(window.localStorage.getItem("UserInfo"));
 if (userInfo&&userInfo.token) {
 axios.defaults.headers.common['Authorization'] = userInfo.userinfo.token;
 }
 } */
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
/* eslint-disable no-news */
Vue.directive('dbClick', {
  inserted(el, binding) {
    el.addEventListener('click', e => {
      if (!el.disabled) {
        el.disabled = true;
        let timer = setTimeout(() => {
          el.disabled = false;
        }, 3000)
      }
    })
  }
});

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
