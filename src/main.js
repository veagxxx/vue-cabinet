import Vue from 'vue';
import App from './App.vue';
// vuex
import store from './store';
// router
import router from './router';
// elementUI
import './plugins/element';
// echarts
import echarts from 'echarts';
// axios 
import {service} from './utils/axiosUtil';
// qs 依赖
import Qs from 'qs';
// 时间格式化依赖
import moment from 'moment';
// elementUI 的过渡效果
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
Vue.component(CollapseTransition.name, CollapseTransition);
// 引入 Element UI 国际化
import i18n from '@/lang/index';

Vue.config.productionTip = false;
Vue.prototype.$echart = echarts;
Vue.prototype.$http = service;
Vue.prototype.Qs = Qs; 
Vue.prototype.moment = moment; 
// 定义日期过滤器
Vue.filter('DateFormat', function(timeStr, pattern = 'YYYY-MM-DD') {
  return moment(timeStr).format(pattern);
});
Vue.filter('TimeFormat', function(timeStr, pattern = 'YYYY-MM-DD HH:mm') {
  return moment(timeStr).format(pattern);
});
// 定义温度过滤器
Vue.filter('TemperatureFormat', function(temperature) {
  return temperature + '℃';
});
new Vue({
  i18n,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
