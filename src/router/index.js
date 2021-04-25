import Vue from 'vue';
import VueRouter from 'vue-router';
import {Message} from 'element-ui';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    hidden: true,
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/login',
    hidden: true,
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/index',
    component: () => import('@/views/Home.vue'),
    redirect: '/index',
    children: [
      {path: '/index', component: () => import('@/views/index/Index.vue')},
      {path: '/charts', component: () => import('@/views/charts/Chart.vue')},
      {path: '/user-management', component: () => import('@/views/user/UserManagement.vue')},
      {path: '/order-management', component: () => import('@/views/order/OrderManagement.vue')},
      {path: '/order-setting', component: () => import('@/views/order/OrderSetting.vue')},
      {path: '/setting', component: () => import('@/views/base/BasicSetting.vue')},
      {path: '/user-add', component: () => import('@/views/user/AddUser.vue')},
      {path: '/pro-management', component: () => import('@/views/product/ProductManagement.vue')},
      {path: '/product/detail/:id',component: () => import('@/views/product/ProductDetail.vue') },
      {path: '/order/detail/:id', component: () => import('@/components/order/OrderDetail.vue')},
    ]
  },
  {
    path: '/404NotFound',
    component: () => import('@/views/404.vue')
  },
  // 配置 404 路由，当访问页面不存在时，跳转到404页面
  {
    path: "*",
    redirect: "/404NotFound"
}
];

const router = new VueRouter({
  mode: 'hash',
  routes
  // routes
});

// 路由导航守卫
router.beforeEach((to, from, next) => {
  // to 表示要访问的路径
  // from 表示从哪个路径而来
  // next 为函数，表示放行；next() 放行； next('/login') 强制跳转
  if (to.path === '/login' || to.path === '/') {
    next();
  } else {
    let token = sessionStorage.getItem('token');
    // 判断是否有 token
    if (!token) {
      Message.error({message: '未登录，请先登录'});
      next('/login');
    } else {
      // 判断登录时长，是否过期
      let loginTime = sessionStorage.getItem('loginTime');
      let currentTime = new Date();
      if (typeof loginTime === 'string') {
        loginTime = new Date(Date.parse(loginTime.replace(/-g/, "/")));
      }
      let total = (currentTime.getTime() - loginTime.getTime()) / 1000;
      // 获取小时
      let loginDuration = parseInt(total / 3600);
      if (loginDuration >= 2) {
        Message.warning({
          message: '登录已过期，请重新登录', 
          duration: 1500, 
          onClose() {
            next('/login');
          }
        });
      } else {
        next();
      }
    }
  }
});

export default router;

