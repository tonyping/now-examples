import { IConfig } from 'umi-types';
// ref: https://umijs.org/config/
export default {
  routes: [{
    path: '/',
    component: './layout',
    routes: [{
      path: '/',
      component: './index',
    }, {
      path: '/form',
      component: './form',
    }, {
      path: '/table',
      component: './table',
    }, {
      path: '*',
      component: './404',
    }]
  }],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: false,
      dynamicImport: false,
      title: 'umijs',
      dll: false
    }],
  ],
} as IConfig;
