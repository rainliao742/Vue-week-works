"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var productModal = {};
var delProductModal = {};
var App = {
  data: function data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      // 請加入站點
      apiPath: 'rainliao',
      // 請加入個人 API Path			
      products: [],
      // 擺放遠端的資料用
      isNew: false,
      //預設新增為否
      temporaryObj: {
        imagesUrl: [] //放入多圖上傳用

      } //當下選取的物件資料用

    };
  },
  methods: {
    checkLogin: function checkLogin() {
      var _this = this;

      axios.post("".concat(this.apiUrl, "/api/user/check")).then(function (res) {
        //有登入的話，就顯示getProducts的資料
        _this.getProducts();
      })["catch"](function (error) {
        //未登入或是嘗試直接進入此頁面會被導入login頁
        console.log(error.data.message);
        alert(error.data.message);
        location.href = "login.html";
      });
    },
    getProducts: function getProducts() {
      var _this2 = this;

      axios.get("".concat(this.apiUrl, "/api/").concat(this.apiPath, "/admin/products")).then(function (res) {
        _this2.products = _toConsumableArray(res.data.products); //讀取遠端data裡的products,並且淺拷貝,放入空陣列products
      })["catch"](function (error) {
        //錯誤訊息
        console.log(error.data.message);
        alert(error.data.message);
      });
    },
    putItemsDetail: function putItemsDetail(item) {
      //點擊時將物件item資訊拷貝放入到temporaryObj
      this.temporaryObj = _objectSpread({}, item);
    },
    openModal: function openModal(status, product) {
      //status對照isNew,edit,delete  product對照item
      if (status === 'isNew') {
        this.temporaryObj = {
          imagesUrl: []
        }; //將內容顯示為空的

        this.isNew = true; //代表是新的一筆

        productModal.show();
      } else if (status === 'edit') {
        this.temporaryObj = _objectSpread({}, product); //淺拷貝或是深拷貝。以防傳參考，萬一被使用者修改到原來的資料

        productModal.show();
        this.isNew = false; //代表是舊的
      } else if (status === 'delete') {
        this.temporaryObj = _objectSpread({}, product); //淺拷貝或是深拷貝。

        delProductModal.show();
      }
    },
    updateProduct: function updateProduct() {
      var _this3 = this;

      //新增與編輯共用
      var url = "".concat(this.apiUrl, "/api/").concat(this.apiPath, "/admin/product");
      var method = 'post'; //新增資料使用post

      if (!this.isNew) {
        url = "".concat(this.apiUrl, "/api/").concat(this.apiPath, "/admin/product/").concat(this.temporaryObj.id); //編輯要帶入該品項的id

        method = 'put'; //編輯資料使用put				
      }

      axios[method](url, {
        data: this.temporaryObj
      }) //用中括號的方式帶入method的變數
      .then(function (res) {
        console.log(res);

        _this3.getProducts();

        productModal.hide();
      })["catch"](function (error) {
        //錯誤訊息
        console.log(error.data.message);
        alert(error.data.message);
      });
    },
    delProduct: function delProduct() {
      var _this4 = this;

      var url = "".concat(this.apiUrl, "/api/").concat(this.apiPath, "/admin/product/").concat(this.temporaryObj.id);
      axios["delete"](url).then(function (res) {
        console.log(res);

        _this4.getProducts();

        delProductModal.hide();
      })["catch"](function (error) {
        //錯誤訊息
        console.log(error.data.message);
        alert(error.data.message);
      });
    }
  },
  mounted: function mounted() {
    // token 寫入至 headers 從login頁面來的cookie能夠持續使用此token // hexToken 必須跟 login頁面一樣設定為hexToken
    var token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1'); // 當下次載入頁面時，自動放入token

    axios.defaults.headers.common['Authorization'] = token; // 執行登入確認

    this.checkLogin();
    productModal = new bootstrap.Modal(document.getElementById('productModal'), {
      keyboard: false
    });
    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
      keyboard: false
    });
  }
};
Vue.createApp(App).mount('#app');