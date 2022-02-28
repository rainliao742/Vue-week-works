"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vueRouter = require("vue-router");

var _HomeView = _interopRequireDefault(require("../views/HomeView.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var routes = [{
  path: '/',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/FrontView.vue'));
    });
  },
  children: [{
    path: '/',
    name: 'home',
    component: _HomeView["default"]
  }, {
    path: 'products',
    // 子層級的不用加上 '/'
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/ProductsView.vue'));
      });
    }
  }, {
    path: 'product/:id',
    // 產品內頁要加上ID '/'
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/ProductView.vue'));
      });
    }
  }, {
    path: 'cart',
    // 子層級的不用加上 '/'
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/CartView.vue'));
      });
    }
  }]
}, {
  path: '/admin',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/DashboardView.vue'));
    });
  },
  children: [{
    path: 'products',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/AdminProducts.vue'));
      });
    }
  }, {
    path: 'coupon',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/AdminCoupon.vue'));
      });
    }
  }]
}];
var router = (0, _vueRouter.createRouter)({
  history: (0, _vueRouter.createWebHashHistory)(),
  routes: routes,
  linkActiveClass: 'active' // BootStrap樣式

});
var _default = router;
exports["default"] = _default;