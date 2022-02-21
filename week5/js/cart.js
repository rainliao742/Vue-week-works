/* global bootstrap*/
/* global axios*/

//vee 區域註冊元件的使用範例
const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);

loadLocaleFromURL(
  "https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json"
);

configure({
  // 用來做一些設定
  generateMessage: localize("zh_TW"), //啟用 locale
});


const api_url = "https://vue3-course-api.hexschool.io/v2";
const api_path = "rainliao";

//const app = createApp({...});

Vue.createApp({
  data() {
    return {
      cartData: {
        carts: [],//購物車內資料要預設為空值，表單驗證才不會出現錯誤。
      },
      products: [],
      product: {},
      productId: "",
      isLoadingItem: "", //局部loading
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
    };
  },
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage: ErrorMessage,
  },
  methods: {
    getProducts() {
      axios
        .get(`${api_url}/api/${api_path}/products/all`)
        .then((res) => {
          // console.log(res);
          this.products = res.data.products;
        })
        .catch((error) => {
          alert(error.data.message);
        });
    },
    openProductModal(id) {
      this.productId = id;
      this.$refs.productModal.openModal();
    },
    getCart() {
      axios
        .get(`${api_url}/api/${api_path}/cart`)
        .then((res) => {
          // console.log(res);
          this.cartData = res.data.data;
        })
        .catch((error) => {
          alert(error.data.message);
        });
    },
    addToCart(id, qty = 1) {
      //要帶入兩個參數,產品的ID跟數量,qty數量預設等於1
      const data = {
        product_id: id,
        qty,
      };
      this.isLoadingItem = id; //局部loading變數
      axios
        .post(`${api_url}/api/${api_path}/cart`, {
          data,
        })
        .then((res) => {
          console.log(res);
          this.getCart();
          this.isLoadingItem = ""; //清空loading
          this.$refs.productModal.closeModal();
        })
        .catch((error) => {
          alert(error.data.message);
        });
    },
    removeCartItem(id) {
      this.isLoadingItem = id; //局部loading變數
      axios
        .delete(`${api_url}/api/${api_path}/cart/${id}`)
        .then((res) => {
          console.log(res);
          this.getCart();
          this.isLoadingItem = ""; //清空loading
        })
        .catch((error) => {
          alert(error.data.message);
        });
    },
    updateCartItem(item) {
      const data = {
        product_id: item.id,
        qty: item.qty,
      };
      this.isLoadingItem = item.id; //局部loading變數
      axios
        .put(`${api_url}/api/${api_path}/cart/${item.id}`, {
          data,
        })
        .then((res) => {
          console.log(res);
          this.getCart();
          this.isLoadingItem = ""; //清空loading
        })
        .catch((error) => {
          alert(error.data.message);
        });
    },
    deleteAllCarts() {
      axios
        .delete(`${api_url}/api/${api_path}/carts`)
        .then((res) => {
          console.log(res);
          this.getCart();
        })
        .catch((error) => {
          alert(error.data.message);
        });
    },
    createOrder() {
      const order = this.form;
      axios
        .post(`${api_url}/api/${api_path}/order`, { data: order })
        .then((res) => {
          alert(res.data.message);
          this.$refs.form.resetForm();
          this.getCart();
        })
        .catch((error) => {
          alert(error.data.message);
        });
    },
  },
  mounted() {
    this.getProducts();
    this.getCart();
  },
})
  .component("product-modal", {
    props: ["id"],
    template: "#userProductModal",
    data() {
      return {
        modal: {},
        product: {},
        qty: 1,
      };
    },
    watch: {
      id() {
        // console.log(this.id);
        this.getProduct();
      },
    },
    methods: {
      openModal() {
        this.modal.show();
      },
      closeModal() {
        this.modal.hide();
      },
      getProduct() {
        //撈出單筆對應的ＩＤ資料
        axios
          .get(`${api_url}/api/${api_path}/product/${this.id}`)
          .then((res) => {
            console.log(res);
            this.product = res.data.product;
          })
          .catch((error) => {
            alert(error.data.message);
          });
      },
      addToCart() {
        // console.log(this.qty);
        this.$emit("add-cart", this.product.id, this.qty);
      },
    },
    mounted() {
      //加上$refs ref="modal"
      this.modal = new bootstrap.Modal(this.$refs.modal);
    },
  })
  .mount("#app");