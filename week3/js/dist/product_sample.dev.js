"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var productModal = {};
var delProductModal = {};
var App = {
  data: function data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'rainliao',
      products: [],
      isNew: false,
      tempProduct: {
        imagesUrl: []
      }
    };
  },
  mounted: function mounted() {
    productModal = new bootstrap.Modal(document.getElementById('productModal'), {
      keyboard: false
    });
    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
      keyboard: false
    }); // 取出 Token

    var token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
    this.checkAdmin();
  },
  methods: {
    checkAdmin: function checkAdmin() {
      var _this = this;

      var url = "".concat(this.apiUrl, "/api/user/check");
      axios.post(url).then(function () {
        _this.getData();
      })["catch"](function (err) {
        alert(err.data.message);
        window.location = 'login.html';
      });
    },
    getData: function getData() {
      var _this2 = this;

      var url = "".concat(this.apiUrl, "/api/").concat(this.apiPath, "/admin/products/all");
      axios.get(url).then(function (response) {
        _this2.products = response.data.products;
      })["catch"](function (err) {
        alert(err.data.message);
      });
    },
    updateProduct: function updateProduct() {
      var _this3 = this;

      var url = "".concat(this.apiUrl, "/api/").concat(this.apiPath, "/admin/product");
      var http = 'post';

      if (!this.isNew) {
        url = "".concat(this.apiUrl, "/api/").concat(this.apiPath, "/admin/product/").concat(this.tempProduct.id);
        http = 'put';
      }

      axios[http](url, {
        data: this.tempProduct
      }).then(function (response) {
        alert(response.data.message);
        productModal.hide();

        _this3.getData();
      })["catch"](function (err) {
        alert(err.data.message);
      });
    },
    openModal: function openModal(isNew, item) {
      if (isNew === 'new') {
        this.tempProduct = {
          imagesUrl: []
        };
        this.isNew = true;
        productModal.show();
      } else if (isNew === 'edit') {
        this.tempProduct = _objectSpread({}, item);
        this.isNew = false;
        productModal.show();
      } else if (isNew === 'delete') {
        this.tempProduct = _objectSpread({}, item);
        delProductModal.show();
      }
    },
    delProduct: function delProduct() {
      var _this4 = this;

      var url = "".concat(this.apiUrl, "/api/").concat(this.apiPath, "/admin/product/").concat(this.tempProduct.id);
      axios["delete"](url).then(function (response) {
        alert(response.data.message);
        delProductModal.hide();

        _this4.getData();
      })["catch"](function (err) {
        alert(err.data.message);
      });
    },
    createImages: function createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push('');
    }
  }
};
Vue.createApp(App).mount('#app');