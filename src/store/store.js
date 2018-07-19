/**
 * Created by 520 on 2018/7/10.
 */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export  default  new Vuex.Store({
  state: {
    userInfo: ""
  },
  mutations: {
    getUserInfo(state, info){
      state.userInfo = info;
      console.log('state.userInfo');
      console.log(state);
      console.log(state.userInfo);
    }
  }
});
