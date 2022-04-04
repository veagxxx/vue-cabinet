import Vue from 'vue';
import Vuex from 'vuex';
import {SET_TOKEN, SET_USER, SET_ORDER, SET_CABINET_INFO, SET_LOGIN_TIME} from './mutations-types';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '',
    user: JSON.parse(sessionStorage.getItem('user')),
    loginTime: sessionStorage.getItem('loginTime') ? sessionStorage.getItem('loginTime') : '',
    order: JSON.parse(sessionStorage.getItem('order')),
    cabinetInfo: JSON.parse(sessionStorage.getItem('cabinetInfo')),
    ordersCount: 0
  },
  mutations: {
    [SET_TOKEN](state, value) {
      // console.log(value);
      state.token = value;
      sessionStorage.setItem('token', value);
    },
    [SET_USER](state, value) {
      state.user = value;
      // sessionStorage 存入对象之前，先转为 json 字符串，否则 sessionStorage 会强制转为字符串将存入对象变为[Object, Object]
      sessionStorage.setItem('user', JSON.stringify(value));
    },
    [SET_LOGIN_TIME](state, value) {
      state.loginTime = value;
      sessionStorage.setItem('loginTime', value);
    },
    [SET_ORDER](state, value) {
      state.order = value;
      sessionStorage.setItem('order', JSON.stringify(value));
    },
    [SET_CABINET_INFO](state, value) {
      state.cabinetInfo = value;
      sessionStorage.setItem('cabinetInfo', JSON.stringify(value));
    },
    setOrderCount(state, value) {
      // console.log(value);
      state.ordersCount = value;
    },
    testMutation(state, value) {
      console.log(value);
    },
    getTestAction(state, value) {
      console.log("获取到了 testAction 提交的：" +value);
    },
    getTestMapAction(state, value) {
      console.log("获取到了 testMapAction 提交的：" + value);
    }
  },
  actions: {
    testAction(context, value) {
      // console.log(value);
      context.commit('getTestAction', value); // 通过 actions 提交到 mutation 方法中
    },
    testMapAction(context, value) {
      console.log("获取到了组件中分发的 Action: " + value);
      context.commit('getTestMapAction', value);
    }
  },
  modules: {
  }
})
