"use strict";

var _vueEsmBrowser = require("https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.js");

var _pagination = _interopRequireDefault(require("./pagination.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var url = 'https://vue3-course-api.hexschool.io/v2';
var api_path = 'rainliao';
var productModal = {};
var delProductModal = {};
var app = (0, _vueEsmBrowser.createApp)({
  data: function data() {
    return {
      url: 'https://vue3-course-api.hexschool.io/v2',
      products: [],
      temporaryObj: {
        imagesUrl: []
      },
      isNew: false,
      pagination: {}
    };
  },
  components: {
    pagination: _pagination["default"]
  },
  methods: {
    // 驗證API
    userCheck: function userCheck() {
      var _this = this;

      var token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      axios.defaults.headers.common['Authorization'] = token;
      axios.post("".concat(url, "/api/user/check")).then(function (res) {
        _this.getProducts();
      })["catch"](function (err) {
        alert(err.data.message);
        windows.location = 'index.html';
      });
    },
    // 取得產品列表
    getProducts: function getProducts() {
      var _this2 = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      //參數預設值
      axios.get("".concat(url, "/api/").concat(api_path, "/admin/products/?page=").concat(page)).then(function (res) {
        _this2.products = res.data.products;
        _this2.pagination = res.data.pagination;
      })["catch"](function (err) {
        console.dir(err);
      });
    },
    // 判斷按鈕後開啟互動視窗
    openModal: function openModal(status, product) {
      if (status === 'new') {
        this.temporaryObj = {
          imagesUrl: []
        };
        this.isNew = true;
        productModal.show();
      } else if (status === 'edit') {
        this.temporaryObj = _objectSpread({}, product);
        this.isNew = false;
        productModal.show();
      } else if (status === 'del') {
        delProductModal.show();
        this.temporaryObj = _objectSpread({}, product);
      }
    }
  },
  mounted: function mounted() {
    this.userCheck();
    productModal = new bootstrap.Modal(document.getElementById('productModal'));
    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'));
  }
});
app.component('productModal', {
  props: ['temporaryObj', 'isNew'],
  template: '#templateDelProductModal',
  methods: {
    // 元件資料更動時需帶動更新資料
    updateProduct: function updateProduct() {
      var _this3 = this;

      // 切換post跟put
      var link = "".concat(url, "/api/").concat(api_path, "/admin/product");
      var method = 'post';

      if (!this.isNew) {
        method = 'put';
        link = "".concat(url, "/api/").concat(api_path, "/admin/product/").concat(this.temporaryObj.id);
      }

      axios[method](link, {
        data: this.temporaryObj
      }).then(function (res) {
        productModal.hide(); //關閉互動視窗

        _this3.$emit('get-products');
      });
    }
  }
});
app.component('delProductModal', {
  props: ['temporaryObj'],
  template: '#templateDelProductModal',
  methods: {
    delProduct: function delProduct() {
      var _this4 = this;

      axios["delete"]("".concat(url, "/api/").concat(api_path, "/admin/product/").concat(this.temp.id)).then(function (res) {
        delProductModal.hide(); //關閉互動視窗

        _this4.$emit('get-products'); //重新取得產品列表

      });
    }
  }
});
app.mount('#app');