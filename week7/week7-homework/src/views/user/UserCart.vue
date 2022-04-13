<template>
  <div class="container">
    <Loading :active="isLoading" :z-index="9999"></Loading>
    <div class="row justify-content-center">
      <div
        class="col-md-10 bg-white py-5"
        style="min-height: calc(100vh - 56px - 76px)"
      >
        <div class="d-flex justify-content-between">
          <h2 class="mt-2">購物車</h2>
        </div>

        <div v-for="item in cartData.carts" :key="item.id">
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
              :style="{ backgroundImage: `url(${item.product.imageUrl})` }"
            ></div>
            <div class="p-3 position-relative w-50">
              <a
                href="#"
                class="position-absolute"
                style="top: 16px; right: 16px"
                ><i class="fas fa-times"></i
              ></a>
              <h5 class="mb-0 fw-bold">{{ item.product.title }}</h5>
              <p class="mb-1 text-muted" style="font-size: 14px">
                {{ item.product.description }}
              </p>
              <div class="d-flex"></div>
            </div>
            <div
              class="d-flex justify-content-between align-items-center w-100"
            >
              <!--計算-->
              <div
                class="input-group align-items-center w-20"
                @click="updateCart(item)"
              >
                <div class="input-group-prepend pe-1">
                  <a href="#" @click.prevent="minus(item)">
                    <i class="bi bi-file-minus fs-5"></i
                  ></a>
                </div>
                <input
                  type="text"
                  class="form-control border-0 text-center my-auto shadow-none bg-light px-0 fs-5"
                  placeholder=""
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                  min="1"
                  :value="item.qty"
                />
                <div class="input-group-append ps-1">
                  <a href="#" @click.prevent="plus(item)"
                    ><i class="bi bi-file-plus fs-5"></i
                  ></a>
                </div>
              </div>
              <!--計算-->

              <div class="text-center w-100">
                <div class="h5 mb-0" v-if="!item.product.price">
                  {{ item.product.origin_price }} 元
                </div>
                <div class="h6" v-if="item.product.price">
                  特價 NT${{ item.product.price }} 元
                  <br />
                  <del class="h6 text-muted" v-if="item.product.price"
                    >原價 {{ item.product.origin_price }} 元</del
                  >
                </div>
              </div>

              <!-- <div class="btn-group btn-group-sm pe-3 w-100">
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
              </div> -->
            </div>
          </div>
        </div>
        <div class="text-end my-4">
          <button
            v-if="cartData.carts.length != 0"
            class="btn btn-outline-danger"
            type="button"
            @click="deleteCarts"
          >
            <span
              v-show="isLoadingItem === 1"
              class="spinner-border text-dark"
            ></span>
            清空購物車
          </button>
        </div>

        <table class="table align-middle">
          <thead>
            <tr>
              <th></th>
              <th>品名</th>
              <th style="width: 150px">數量</th>
              <th style="text-align: right">單價</th>
            </tr>
          </thead>
          <tbody class="mb-5">
            <tr
              v-show="cartData.carts.length == 0"
              class="text-danger text-center w-100"
            >
              <td colspan="4" class="py-4">
                <h5>購物車是空的</h5>
              </td>
            </tr>
            <template v-if="cartData.carts">
              <tr v-for="item in cartData.carts" :key="item.id">
                <td class="py-3">
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
                    v-if="cartData.final_total !== cartData.total"
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
              <td class="w-100" colspan="4"></td>
            </tr>
            <tr>
              <td colspan="3" class="text-start mb-0 h4 fw-bold">總計金額</td>
              <td class="text-end mb-0 h4 fw-bold">
                NT${{ $filters.currency(cartData.total) }}
              </td>
            </tr>
            <tr v-if="cartData.final_total !== cartData.total">
              <td colspan="3" class="text-end text-success">折扣價</td>
              <td class="text-end text-success">
                {{ $filters.currency(cartData.final_total) }}
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

        <router-link
          type="submit"
          class="btn btn-dark btn-block mt-4 rounded-0 py-3"
          to="/user-check"
          v-if="cartData.carts.length !== 0 "
          >確認送出
        </router-link>
        <button
          type="submit"
          class="btn btn-dark btn-block mt-4 rounded-0 py-3"
          :disabled="cartData.carts.length === 0"
        >
          確認送出
        </button>
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
      newValue: 0,
      cartData: {
        carts: []
      },
      isLoadingItem: '',
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
          this.getCartList()
          emitter.emit('get-cart')
        })
        .catch((error) => {
          this.isLoading = false
          this.$httpMessageState(error.response, '購物資訊錯誤')
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
    deleteCarts () {
      this.isLoading = true
      const apiUrl = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`
      this.$http
        .delete(apiUrl)
        .then((res) => {
          this.$httpMessageState(res, '清除所有購物車資料')
          this.getCartList()
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
          this.getCartList()
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
          this.getCartList()
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
          this.getCartList()
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
          this.$router.push(`/user-check/${res.data.orderId}`)
          this.isLoading = false
        })
        .catch((error) => {
          this.isLoading = false
          this.$httpMessageState(error.response, '建立訂單')
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
  watch: {
    value: {
      handler: function (newVal, oldVal) {
        this.newValue = newVal
      }
    }
  },
  created () {
    this.newValue = this.value
    // this.getProducts()
    this.getCartList()
  }
}
</script>
<style lang="scss" scoped>
.count-num {
  border: 1px solid silver;
  border-radius: 5px;
  background-color: #fff;
  margin: 0 5px 0 5px;
  display: inline-block;
  user-select: none;
}
.count-num div {
  display: inline-block;
}
.count-num #field_container input {
  width: 50px;
  text-align: center;
  font-size: 15px;
  padding: 3px;
  border: none;
}
.count-num .mp-btn {
  padding: 3px 10px 3px 10px;
  cursor: pointer;
  border-radius: 5px;
}
.count-num .mp-btn:hover {
  background-color: #ddd;
}
.count-num .mp-btn:active {
  background-color: #c5c5c5;
}
</style>
