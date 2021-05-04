<p align="center"><a href="https://blog.csdn.net/csdn_yudong/article/details/85250412"><img width="120" src="https://raw.githubusercontent.com/Neveryu/vue-cms/master/static/image/login-logo.png"></a></p>

<p align="center">基于 Vue 和 ElementUI 构建的股票预测系统前端</p>

<p align="center">
  <a href="https://github.com/vuejs/vue" rel="nofollow" target="_blank">
    <img src="https://img.shields.io/badge/vue-2.6.10-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/ElemeFE/element" rel="nofollow" target="_blank">
    <img src="https://img.shields.io/badge/element--ui-2.9.2-brightgreen.svg" alt="element-ui">
  </a>
  <a href="https://travis-ci.org/Neveryu/vue-cms" rel="nofollow" target="_blank">
    <img src="https://travis-ci.org/Neveryu/vue-cms.svg?branch=master" alt="Build Status">
  </a>
  <a href="https://github.com/Neveryu/vue-cms/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
  </a>
  <a href="https://neveryu.github.io/reward/index.html" target="_blank">
    <img src="https://img.shields.io/badge/%24-donate-ff69b4.svg" alt="donate">
  </a>
</p>


## 写在前面
请确保你安装了 [node](https://nodejs.org/en/) 和 [git](https://git-scm.com/)，与此同时，你应该对 [Vue](https://cn.vuejs.org/v2/guide/)、[Vuex](https://vuex.vuejs.org/zh/)、[Vue Router](https://router.vuejs.org/zh/)、[ES2015+](http://es6.ruanyifeng.com/)、[ElementUI](http://element-cn.eleme.io/#/zh-CN) 有所了解。我们的请求有使用 [Mock.js](https://github.com/nuysoft/Mock/wiki/Getting-Started) 模拟，也有使用线上真实的接口数据，提前了解和学习这些知识会对使用本项目有很大的帮助。

## Build Setup

``` bash
# 克隆项目
git clone https://github.com/character123/socketPredictFE.git

# 进入项目
cd socketPredictFE

# install dependencies
yarn install --registry https://registry.npm.taobao.org

// or
# 建议不要用 cnpm 安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# serve with hot reload at localhost:8080
npm run dev
```

浏览器访问 [http://localhost:8080](http://localhost:8080)

## 构建发布

```
# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

