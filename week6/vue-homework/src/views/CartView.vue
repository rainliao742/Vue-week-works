<template>
<div class="container">
    <h1 class="text-center my-3 p-2">購物車</h1>
    <div class="text-end">
          <button class="btn btn-outline-danger" type="button" @click="deleteAllCarts" >
              <span v-show="isLoadingItem === 1"><i class="fas fa-spinner fa-pulse"></i></span>
              清空購物車
          </button>
    </div>
<!-- 購物車列表 -->
        <table class="table align-middle">
                <thead>
                  <tr>
                    <th></th>
                    <th style="width: 250px">畫作縮圖</th>
                    <th>品名</th>
                    <th style="width: 150px">數量/單位</th>
                    <th class="text-end">單價</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- 購物車資料有沒有資料 -->
                  <template v-if="cartData.carts">
                    <tr v-for="item in cartData.carts" :key="item.id">
                      <td>
                        <button type="button"
                          class="btn btn-outline-danger btn-sm"
                          @click="removeCartItem(item.id)">
                          x
                        </button>
                      </td>
                      <td>
                        <div class="py-1">
                          <img style="width:150px" :src="item.product.imageUrl" :alt="item.product.title" >
                        </div>
                      </td>
                      <td>
                        {{ item.product.title }}
                        <div class="text-success" v-if="item.coupon">
                          已套用優惠券</div>
                      </td>
                      <td>
                        <div class="input-group input-group-sm">
                          <div class="input-group mb-3">
                            <select id=""
                              class="form-select"
                              v-model="item.qty"
                              @change="updateCartItem(item)"
                              :disabled="isLoadingItem === item.id">
                              <option :value="num"
                                v-for="num in 20"
                                :key="`${num}-${item.id}`">
                                {{ num }}
                              </option>
                            </select>
                            <span class="input-group-text"
                              id="basic-addon2">{{ item.product.unit }}</span>
                          </div>
                        </div>
                      </td>
                      <td class="text-end">
                        <div v-if="cartData.final_total !== cartData.total" class="text-success">折扣價：</div>
                        {{ item.product.price }} 元
                      </td>
                    </tr>
                  </template>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="4" class="text-end">總計</td>
                    <td class="text-end">{{ cartData.total }} 元</td>
                  </tr>
                  <tr>
                    <td colspan="4" class="text-end text-success" v-if="cartData.finial_total !== cartData.total">折扣價</td>
                    <td class="text-end text-success">{{ cartData.final_total }} 元</td>
                  </tr>
                </tfoot>
              </table>
<!-- 購物車表單 -->
              <div class="my-5 row justify-content-center">
                <v-form ref="form" class="col-md-6" v-slot="{ errors }" @submit="createOrder">
                  <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <v-field id="email" name="email" type="email" class="form-control"
                      :class="{ 'is-invalid': errors['email'] }"
                      placeholder="請輸入 Email" rules="email|required"
                      v-model="form.user.email"></v-field>
                    <error-message name="email" class="invalid-feedback"></error-message>
                  </div>

                  <div class="mb-3">
                    <label for="name" class="form-label">收件人姓名</label>
                    <v-field id="name" name="姓名" type="text" class="form-control"
                      :class="{ 'is-invalid': errors['姓名'] }" placeholder="請輸入姓名"
                      rules="required" v-model="form.user.name"></v-field>
                    <error-message name="姓名" class="invalid-feedback"></error-message>
                  </div>

                  <div class="mb-3">
                    <label for="tel" class="form-label">收件人電話</label>
                    <v-field id="tel" name="電話" type="text" class="form-control"
                      :class="{ 'is-invalid': errors['電話'] }" placeholder="請輸入電話"
                      rules="required|min:8|max:10" v-model="form.user.tel"></v-field>
                    <error-message name="電話" class="invalid-feedback"></error-message>
                  </div>

                  <div class="mb-3">
                    <label for="address" class="form-label">收件人地址</label>
                    <v-field id="address" name="地址" type="text" class="form-control"
                      :class="{ 'is-invalid': errors['地址'] }" placeholder="請輸入地址"
                      rules="required" v-model="form.user.address"></v-field>
                    <error-message name="地址" class="invalid-feedback"></error-message>
                  </div>

                  <div class="mb-3">
                    <label for="message" class="form-label">留言</label>
                    <textarea name="" id="message" class="form-control" cols="30" rows="10"
                      v-model="form.message"></textarea>
                  </div>
                  <!-- {{ cartData.carts }} -->
                  <div class="text-end">
                    <button type="submit" class="btn btn-danger"
                      :disabled="Object.keys(errors).length > 0 || cartData.carts.length === 0">送出訂單</button>
                  </div>
                </v-form>
              </div>

</div>
</template>

<script>
import emitter from '@/libs/emitter'

export default {
  data () {
    return {
      cartData: {
        carts: [] // 購物車內資料要預設為空值，表單驗證才不會出現錯誤。
      },
      isLoadingItem: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      coupon_code: ''
    }
  },
  methods: {
    getCart () {
      this.$http
        .get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          // console.log(res)
          this.cartData = res.data.data
        })
        .catch((error) => {
          alert(error.data.message)
        })
    },
    addToCart (id, qty = 1) {
      // 要帶入兩個參數,產品的ID跟數量,qty數量預設等於1
      const data = {
        product_id: id,
        qty: qty
      }
      this.isLoadingItem = id // 局部loading變數
      this.$http
        .post(
          `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`,
          {
            data
          }
        )
        .then((res) => {
          // console.log(res)
          this.isLoadingItem = '' // 清空loading
          emitter.emit('get-cart') // 增加減少 選單上購物車顯示的數量
          alert(res.data.message)
        })
        .catch((error) => {
          alert(error.data.message)
        })
    },
    removeCartItem (id) {
      this.isLoadingItem = id // 局部loading變數
      this.$http
        .delete(
          `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
        )
        .then((res) => {
          console.log(res)
          this.getCart()
          this.isLoadingItem = '' // 清空loading
        })
        .catch((error) => {
          alert(error.data.message)
        })
    },
    updateCartItem (item) {
      const data = {
        product_id: item.id,
        qty: item.qty
      }
      this.isLoadingItem = item.id // 局部loading變數
      this.$http
        .put(
          `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`,
          {
            data
          }
        )
        .then((res) => {
          // console.log(res)
          this.getCart()
          emitter.emit('get-cart')
          this.isLoadingItem = '' // 清空loading
        })
        .catch((error) => {
          alert(error.data.message)
        })
    },
    deleteAllCarts () {
      this.$http
        .delete(
          `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`
        )
        .then((res) => {
          console.log(res)
          this.getCart()
          emitter.emit('get-cart')
        })
        .catch((error) => {
          alert(error.data.message)
        })
    },
    createOrder () {
      const order = this.form
      this.$http
        .post(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`, { data: order })
        .then((res) => {
          alert(res.data.message)
          this.$refs.form.resetForm()
          this.getCart()
        })
        .catch((error) => {
          alert(error.data.message)
        })
    }
  },
  mounted () {
    // this.getProducts()
    this.getCart()
  }
}
</script>
