import axios from 'axios';
import {Message} from 'element-ui';

axios.defaults.baseURL = 'http://localhost:8090';
axios.defaults.timeout = 3000;

// 请求拦截（登录验证）
axios.interceptors.request.use(config => {
    if (sessionStorage.getItem('token')) {
      config.headers.token = sessionStorage.getItem('token');
      // console.log(config);
    }
    return config;
  }, error => {
    return Promise.reject(error);
});

// 响应拦截
axios.interceptors.response.use(response => {
  // 响应
  if (response.status === 200) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
  }
}, error => {
  // 服务器状态码不是200
  if (error.response.status) {
    switch(error.response.status) {
      // 401 未登录
      case 401:
        Message.warning({message: '未登录，请登录'});
        router.replace({
          path: '/login',
          query: { redirect: router.currentRoute.fullPath }
        });
        break;
      // 无权限
      case 403:
        Message.error({message: '权限不足或登录过期'});
        break;
      // 资源不存在
      case 404:
        Message.error({message: '请求不存在'});
        router.replace({
          path: '/404NotFound',
        });
        break;
      case 500: 
        Message.error({message: '服务异常'});
      // 其它错误  
      default:
        Message.error({message: '未知错误，请重试'});
    }
    return Promise.reject(error.response);
  }
});

// 封装请求
function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, params).then(res => {
      resolve(res.data);
    }).catch(error => {
      reject(error.data);
    });
  });
}

function post(url, params, header) {
  return new Promise((resolve, reject) => {
    axios.post(url, params, header).then(res => {
      resolve(res.data);
    }).catch(error => {
      reject(error.data);
    });
  });
}

function put(url, params) {
  return new Promise((resolve, reject) => {
    axios.put(url, params).then(res => {
      resolve(res.data);
    }).catch(error => {
      reject(error.data);
    });
  });
}

function del(url, params) {
  return new Promise((resolve, reject) => {
    axios.delete(url, params).then(res => {
      resolve(res.data);
    }).catch(error => {
      reject(error.data);
    });
  });
}

export const service = {get, post, put, del};