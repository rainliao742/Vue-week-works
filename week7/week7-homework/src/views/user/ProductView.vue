<template>
  <div class="container">
    <Loading :active="isLoading" :z-index="9999"></Loading>
    <div
      style="
        min-height: 400px;
        background-size: cover;
        background-position: top;
        background-repeat: no-repeat;
      "
      :style="{
        backgroundImage: `url(${product.imageUrl})`
      }"
    ></div>
    <div class="row justify-content-between mt-4 mb-7">
      <div class="col-md-7">
        <div class="px-3">
          <h2 class="mb-0">{{ product.name }}</h2>
          <p class="fw-bold">NT$ {{ product.price }}</p>
          <p>{{ product.content }}</p>
        </div>
        <div class="my-4">
          <img
            v-for="image in product.imagesUrl"
            :key="image"
            :src="image"
            :alt="product.title"
            class="img-fluid mt-4"
          />
        </div>
        <div
          class="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3"
          id="accordionExample"
        >
          <div class="card border-0">
            <div
              class="card-header py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0"
              id="headingOne"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
            >
              <div
                class="d-flex justify-content-between align-items-center pe-1"
              >
                <h4 class="mb-0">{{ product.title }}</h4>
              </div>
            </div>
            <div
              id="collapseOne"
              class="collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div class="card-body pb-5">
                {{ product.description }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 d-f">
        <div v-for="item in cartData.carts" :key="item.id">
          <h5>數量：</h5>
          <div class="input-group mb-3 border mt-3">
            <div class="input-group-prepend">
              <button
                class="btn btn-outline-dark rounded-0 border-0 py-3"
                type="button"
                id="button-addon1"
                @click="minus(item)"
              >
                <i class="bi bi-file-minus fs-5"></i>
              </button>
            </div>
            <input
              type="text"
              class="form-control border-0 text-center my-auto shadow-none"
              placeholder=""
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
              disabled="disabled"
              :value="item.qty"
            />
            <div class="input-group-append">
              <button
                class="btn btn-outline-dark rounded-0 border-0 py-3"
                type="button"
                id="button-addon2"
                @click="plus(item)"
              >
                <i class="bi bi-file-plus fs-5"></i>
              </button>
            </div>
          </div>
        </div>
        <!-- <h4>{{ cartData.carts }}</h4> -->

        <!--加入購物車-->
        <a
          href="#"
          class="btn btn-dark btn-block rounded-0 py-3 px-5 mt-3"
          @click.prevent="addToCart"
          >加入購物車</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/utils/emitter'

export default {
  props: {
    value: {
      default: 0,
      type: Number
    },
    min: {
      default: 0,
      type: Number
    },
    max: {
      default: undefined,
      type: Number
    }
  },
  data () {
    return {
      product: [],
      id: '',
      cartData: {
        carts: []
      },
      isLoadingItem: '',
      status: {
        loadingItem: ''
      },
      isLoading: false
    }
  },
  methods: {
    getProduct () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`
      this.isLoading = true
      this.$http
        .get(url)
        .then((res) => {
          this.product = res.data.product
          this.isLoading = false
        })
        .catch((error) => {
          this.isLoading = false
          this.$httpMessageState(error.response, '錯誤訊息')
        })
    },
    getCartList () {
      this.isLoading = true
      const apiUrl = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http
        .get(apiUrl)
        .then((res) => {
          this.cartData = res.data.data
          this.isLoading = false
        })
        .catch((error) => {
          this.isLoading = false
          this.$httpMessageState(error.response, '資料錯誤')
        })
    },
    addToCart () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const data = {
        product_id: this.product.id,
        qty: 1
      }
      this.$http
        .post(url, { data })
        .then((res) => {
          this.isLoading = false
          this.status.loadingItem = ''
          this.$httpMessageState(res, '加入購物車')
          emitter.emit('get-cart')
        })
        .catch((error) => {
          this.isLoading = false
          this.$httpMessageState(error.response, '購物資訊錯誤')
        })
    },
    updateCart (data) {
      this.isLoading = true
      const apiUrl = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${data.id}`
      const cartData = {
        product_id: data.product.id,
        qty: data.qty
      }
      this.$http
        .put(apiUrl, { data: cartData })
        .then((res) => {
          this.$httpMessageState(res, '更新購物車')
          this.isLoading = false
          this.getCartList()
        })
        .catch((error) => {
          this.isLoading = false
          this.$httpMessageState(error.response, '更新購物車')
        })
    },
    getNotificationClass (notification) {
      return `alert alert-${notification.type}`
    },
    plus: function (item) {
      if (this.max === undefined || item.qty < this.max) {
        item.qty = item.qty + 1
        this.$emit('input', item.qty)
      }
    },
    minus: function (item) {
      if (item.qty > this.min) {
        item.qty = item.qty - 1
        this.$emit('input', item.qty)
      } else if (item.qty === 0) {
        item.qty = 1
        this.$emit('input', item.qty)
      }
    }
  },
  mounted () {
    this.id = this.$route.params.id
    this.getProduct()
    this.getCartList()
  }
}
</script>
