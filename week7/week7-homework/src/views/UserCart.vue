<template>
  <div class="container">
    <Loading :active="isLoading" :z-index="9999"></Loading>
    <div class="row justify-content-center">
      <div
        class="col-md-8 bg-white py-5"
        style="min-height: calc(100vh - 56px - 76px)"
      >
        <div class="d-flex justify-content-between">
          <h2 class="mt-2">購物車</h2>
        </div>
        <div v-for="item in products" :key="item.id">
          <div class="d-flex mt-4 bg-light">
            <div
              class="w-50"
              style="
                width: 120px;
                min-width: 120px;
                height: 120px;
                background-size: cover;
                background-position: center;
              "
              :style="{ backgroundImage: `url(${item.imageUrl})` }"
            ></div>
            <div class="p-3 position-relative w-50">
              <a
                href="#"
                class="position-absolute"
                style="top: 16px; right: 16px"
                ><i class="fas fa-times"></i
              ></a>
              <p class="mb-0 fw-bold">{{ item.title }}</p>
              <p class="mb-1 text-muted" style="font-size: 14px">
                {{ item.description }}
              </p>
              <div class="d-flex"></div>
            </div>
            <div
              class="d-flex justify-content-between align-items-center w-100"
            >
              <div class="input-group align-items-center w-20">
                <div class="input-group-prepend pe-1">
                  <a href="#"> <i class="fas fa-minus"></i></a>
                </div>
                <input
                  type="text"
                  class="form-control border-0 text-center my-auto shadow-none bg-light px-0"
                  placeholder=""
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                  value="1"
                />
                <div class="input-group-append ps-1">
                  <a href="#"><i class="fas fa-plus"></i></a>
                </div>
              </div>
              <!-- <p class="mb-0 ms-auto">NT$12,000</p> -->
              <div class="me-4 w-100">
                <div class="h5" v-if="!item.price">
                  {{ item.origin_price }} 元
                </div>
                <div class="h6" v-if="item.price">
                  特價 NT${{ item.price }} 元
                  <br />
                  <del class="h6 text-muted" v-if="item.price"
                    >原價 {{ item.origin_price }} 元</del
                  >
                </div>
              </div>

              <div class="btn-group btn-group-sm pe-3 w-100">
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  :disabled="status.loadingItem === item.id || !item.is_enabled"
                  @click="getProduct(item.id)"
                >
                  <span
                    class="spinner-border spinner-grow-sm"
                    v-if="status.loadingItem === item.id"
                  ></span>
                  查看更多
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="addToCart(item.id)"
                  :disabled="status.loadingItem === item.id || !item.is_enabled"
                >
                  <span
                    class="spinner-border spinner-grow-sm"
                    v-if="status.loadingItem === item.id"
                  ></span>
                  加到購物車
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="text-end mt-4">
          <button
            class="btn btn-outline-danger"
            type="button"
            @click="deleteCarts"
          >
            清空購物車
          </button>
        </div>

        <table class="table align-middle">
          <thead>
            <tr>
              <th></th>
              <th>品名</th>
              <th style="width: 150px">數量</th>
              <th>單價</th>
            </tr>
          </thead>
          <tbody class="mb-5">
            <template v-if="cart.carts">
              <tr v-for="item in cart.carts" :key="item.id">
                <td>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    :disabled="status.loadingItem === item.id"
                    @click="removeCartItem(item.id)"
                  >
                    <i class="bi bi-x"></i>
                  </button>
                </td>
                <td>
                  {{ item.product.title }}
                  <div class="text-success" v-if="item.coupon">
                    已套用優惠券
                  </div>
                </td>
                <td>
                  <div class="input-group input-group-sm">
                    <input
                      type="number"
                      class="form-control"
                      min="1"
                      v-model.number="item.qty"
                      @blur="updateCart(item)"
                    />
                    <div class="input-group-text">
                      / {{ item.product.unit }}
                    </div>
                  </div>
                </td>
                <td class="text-end">
                  <small
                    v-if="cart.final_total !== cart.total"
                    class="text-success"
                    >折扣價：</small
                  >
                  {{ $filters.currency(item.final_total) }}
                </td>
              </tr>
            </template>
          </tbody>

          <tfoot>
            <tr>
              <td class="w-100" colspan="4">
              </td>
            </tr>
            <tr>
              <td colspan="3" class="text-start mb-0 h4 fw-bold">總計金額</td>
              <td class="text-end mb-0 h4 fw-bold">NT${{ $filters.currency(cart.total) }}</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td colspan="3" class="text-end text-success">折扣價</td>
              <td class="text-end text-success">
                {{ $filters.currency(cart.final_total) }}
              </td>
            </tr>
          </tfoot>
        </table>
        <!-- 優惠碼 -->
        <div class="input-group mb-3 input-group-sm">
          <input
            type="text"
            class="form-control"
            v-model="coupon_code"
            placeholder="請輸入優惠碼"
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              @click="addCouponCode"
            >
              套用優惠碼
            </button>
          </div>
        </div>
        <!-- <table class="table mt-4 text-muted">
          <tbody>
            <tr>
              <th scope="row" class="border-0 px-0 font-weight-normal">金額</th>
              <td class="text-end border-0 px-0">NT$24,000</td>
            </tr>
            <tr>
              <th scope="row" class="border-0 px-0 pt-0 font-weight-normal">
                折扣
              </th>
              <td class="text-end border-0 px-0 pt-0">NT$500</td>
            </tr>
          </tbody>
        </table> -->

        <a
          href="./checkout.html"
          class="btn btn-dark btn-block mt-4 rounded-0 py-3"
          >確認送出</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/utils/emitter'

export default {
  data () {
    return {
      products: [],
      product: {},
      status: {
        loadingItem: ''
      },
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      cart: {},
      isLoading: false,
      coupon_code: ''
    }
  },
  methods: {
    getProducts () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.isLoading = true
      this.$http
        .get(url)
        .then((res) => {
          console.log('前台Product', res)
          this.products = res.data.products
          this.isLoading = false
        })
        .catch((error) => {
          this.isLoading = false
          this.$httpMessageState(error.response, '錯誤訊息')
        })
    },
    getProduct (id) {
      this.$router.push(`/product/${id}`)
    },
    addToCart (id, qty = 1) {
      this.isLoading = true
      const apiUrl = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.status.loadingItem = id
      const cartData = {
        product_id: id,
        qty
      }
      this.$http
        .post(apiUrl, { data: cartData })
        .then((res) => {
          this.isLoading = false
          this.status.loadingItem = ''
          this.$httpMessageState(res, '加入購物車')
          this.getCart()
          emitter.emit('get-cart')
        })
        .catch((error) => {
          this.isLoading = false
          this.$httpMessageState(error.response, '購物資訊錯誤')
        })
    },
    getCart () {
      this.isLoading = true
      const apiUrl = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http
        .get(apiUrl)
        .then((res) => {
          this.cart = res.data.data
          this.isLoading = false
        })
        .catch((error) => {
          this.isLoading = false
          this.$httpMessageState(error.response, '資料錯誤')
        })
    },
    deleteCarts () {
      this.isLoading = true
      const apiUrl = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`
      this.$http
        .delete(apiUrl)
        .then((res) => {
          this.$httpMessageState(res, '清除所有購物車資料')
          this.getCart()
          emitter.emit('get-cart')
          this.isLoading = false
        })
        .catch((error) => {
          this.isLoading = false
          this.$httpMessageState(error.response, '清除所有購物車資料')
        })
    },
    removeCartItem (id) {
      this.status.loadingItem = id
      const apiUrl = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.isLoading = true
      this.$http
        .delete(apiUrl)
        .then((res) => {
          this.$httpMessageState(res, '移除單筆購物車資料')
          this.status.loadingItem = ''
          this.getCart()
          this.isLoading = false
        })
        .catch((error) => {
          this.isLoading = false
          this.$httpMessageState(error.response, '移除單筆購物車資料')
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
          this.getCart()
        })
        .catch((error) => {
          this.isLoading = false
          this.$httpMessageState(error.response, '更新購物車')
        })
    },
    addCouponCode () {
      this.isLoading = true
      const apiUrl = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`
      const coupon = {
        code: this.coupon_code
      }
      this.$http
        .post(apiUrl, { data: coupon })
        .then((res) => {
          this.$httpMessageState(res, '加入折扣碼')
          this.getCart()
          this.isLoading = false
        })
        .catch((error) => {
          this.isLoading = false
          this.$httpMessageState(error.response, '加入折扣碼')
        })
    },
    createOrder () {
      this.isLoading = true
      const apiUrl = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`
      const order = this.form
      this.$http
        .post(apiUrl, { data: order })
        .then((res) => {
          this.$httpMessageState(res, '建立訂單')
          this.$router.push(`/user-checkout/${res.data.orderId}`)
          this.isLoading = false
        })
        .catch((error) => {
          this.isLoading = false
          this.$httpMessageState(error.response, '建立訂單')
        })
    }
  },
  created () {
    this.getProducts()
    this.getCart()
  }
}
</script>
