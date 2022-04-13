<template>
  <div class="bg-light pt-5 pb-7">
    <div class="container">
      <Loading :active="isLoading" :z-index="9999"></Loading>
      <ToastMessages></ToastMessages>
      <div class="row justify-content-center flex-md-row flex-column-reverse">
        <div class="col-md-6">
          <v-form ref="from" v-slot="{ errors }" @submit="createOrder">
            <div class="bg-white p-4">
              <h4 class="fw-bold">1. 聯絡方式</h4>
              <p class="mt-4">個人資訊</p>

              <div class="mb-2">
                <label for="email" class="text-muted mb-0 form-label"
                  >Email</label
                >
                <v-field
                  id="email"
                  type="email"
                  name="email"
                  class="form-control rounded-0"
                  :class="{ 'is-invalid': errors['email'] }"
                  aria-describedby="emailHelp"
                  placeholder="請輸入 Email"
                  rules="email|required"
                  v-model="form.user.email"
                ></v-field>
                <error-message
                  name="email"
                  class="invalid-feedback"
                ></error-message>
              </div>

              <div class="mb-2">
                <label for="name" class="text-muted mb-0 form-label"
                  >姓名</label
                >
                <v-field
                  id="name"
                  name="姓名"
                  type="text"
                  class="form-control rounded-0"
                  :class="{ 'is-invalid': errors['姓名'] }"
                  placeholder="請輸入姓名"
                  rules="required"
                  v-model="form.user.name"
                ></v-field>
                <error-message
                  name="姓名"
                  class="invalid-feedback"
                ></error-message>
              </div>
              <div class="">
                <label for="tel" class="text-muted mb-0 form-label"
                  >手機電話</label
                >
                <v-field
                  id="tel"
                  name="電話"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['電話'] }"
                  placeholder="請輸入電話"
                  :rules="cellPhone"
                  v-model="form.user.tel"
                ></v-field>
                <error-message
                  name="電話"
                  class="invalid-feedback"
                ></error-message>
              </div>
            </div>
            <div class="bg-white p-4 mt-2">
              <h4 class="fw-bold">2. 地址與付款方式</h4>
              <form>
                <label class="mt-4 mb-3" for="address">收件人地址</label>
                <div class="form-row">
                  <div class="col mb-2">
                    <select
                      id="inputCountry"
                      class="form-select rounded-0"
                      v-model="form.selectedArea"
                    >
                      <option selected>居住地區</option>
                      <option
                        v-for="country in form.countries"
                        :value="country.value"
                        :key="country.text"
                      >
                        {{ country.text }}
                      </option>
                    </select>
                  </div>
                  <div class="col mb-2">
                    <select
                      id="inputCity"
                      class="form-select rounded-0"
                      v-model="form.selectedCity"
                    >
                      <option selected>居住城市</option>
                      <option
                        v-for="city in form.cities"
                        :value="city.value"
                        :key="city.text"
                      >
                        {{ city.text }}
                      </option>
                    </select>
                  </div>

                </div>

                <v-field
                  id="address"
                  name="地址"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors['地址'] }"
                  placeholder="請輸入地址"
                  rules="required"
                  v-model="form.user.address"
                ></v-field>
                <error-message
                  name="地址"
                  class="invalid-feedback"
                ></error-message>

                <p class="mt-4 mb-2">付款方式</p>
                <div class="form-check my-3">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gridRadios"
                    id="gridRadios1"
                    value="WebATM"
                    v-model="form.selectedPayment"
                    checked
                  />
                  <label class="form-check-label text-muted" for="gridRadios1"
                    >WebATM
                  </label>
                </div>
                <div class="form-check mb-2">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gridRadios"
                    id="gridRadios2"
                    v-model="form.selectedPayment"
                    value="ATM"
                  />
                  <label class="form-check-label text-muted" for="gridRadios2"
                    >ATM
                  </label>
                </div>
                <div class="form-check mb-2">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gridRadios"
                    id="gridRadios3"
                    v-model="form.selectedPayment"
                    value="ApplePay"
                  />
                  <label class="form-check-label text-muted" for="gridRadios3"
                    >ApplePay
                  </label>
                </div>
              </form>
            </div>
            <div class="bg-white p-4 mt-2">
              <div class="mt-3">
                <label for="message" class="form-label">其他意見補充</label>
                <textarea
                  id="message"
                  class="form-control"
                  cols="30"
                  rows="2"
                  v-model="form.message"
                ></textarea>
              </div>
              <div class="form-group form-check mt-3">
                <v-field
                  id="agreement"
                  name="遵守條款"
                  type="checkbox"
                  class="form-check-input rounded-0"
                  v-model="form.agree"
                  value="yes"
                ></v-field>
                <label for="agreement">同意遵守會員隱私聲明</label>
              </div>
            </div>
            <div
              class="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100"
            >
              <router-link to="/products" class="text-dark mt-md-0 mt-3">
                <i class="bi bi-chevron-left me-2"></i>繼續購物
              </router-link>

              <button
                type="submit"
                class="btn btn-dark py-3 px-7 rounded-0"
                :disabled="
                  Object.keys(errors).length > 0 || cartData.carts.length === 0
                "
              >
                送出訂單
              </button>
            </div>
          </v-form>
        </div>
        <!--訂單資訊-->
        <div class="col-md-4">
          <div class="border p-4 mb-4">
            <h4 class="mb-4">訂單資訊</h4>
            <div v-for="item in cartData.carts" :key="item.id">
              <div class="d-flex mt-4">
                <div
                  class="me-2"
                  style="
                    width: 48px;
                    min-width: 48px;
                    height: 48px;
                    background-size: cover;
                    background-position: center;
                  "
                  :style="{ backgroundImage: `url(${item.product.imageUrl})` }"
                ></div>
                <div class="w-100">
                  <div class="d-flex justify-content-between fw-bold">
                    <p class="mb-0 w-50" style="word-break: break-word">
                      {{ item.product.title }}
                    </p>
                    <p class="mb-0">x{{ item.qty }}</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p class="text-muted mb-0 text-decoration-line-through">
                      <small>NT${{ item.product.origin_price }}</small>
                    </p>
                    <p class="mb-0">NT${{ item.product.price }}</p>
                  </div>
                </div>
              </div>
            </div>

            <table class="table mt-4 border-top border-bottom text-muted">
              <tbody>
                <tr>
                  <th scope="row" class="border-0 px-0 pt-4 font-weight-normal">
                    訂單金額：
                  </th>
                  <td class="text-end border-0 px-0 pt-4 fw-bold">
                    NT${{ cartData.total }}
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    class="border-0 px-0 pt-0 pb-4 font-weight-normal"
                  >
                    付款方式：
                  </th>
                  <td class="text-end border-0 px-0 pt-0 pb-4">
                    {{ form.selectedPayment }}
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="d-flex justify-content-between mt-4 flex-wrap">
              <p class="mb-3 h5 fw-bold">總計金額：</p>
              <p class="mb-0 h5 fw-bold">NT${{ cartData.final_total }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/utils/emitter'

export default {
  delimiters: ['${', '}'],
  data () {
    return {
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
        message: '',
        selectedArea: '居住地區',
        selectedCity: '居住城市',
        selectedPayment: 'WebATM',
        countries: [
          { id: 1, text: '台灣', value: '台灣' },
          { id: 2, text: '香港', value: '香港' },
          { id: 3, text: '澳門', value: '澳門' },
          { id: 4, text: '中國', value: '中國' }
        ],
        cities: [
          { id: 1, text: '新北市', value: '新北市' },
          { id: 2, text: '台北市', value: '台北市' },
          { id: 3, text: '基隆市', value: '基隆市' },
          { id: 4, text: '宜蘭市', value: '宜蘭市' }
        ],
        agree: []
      },
      isLoading: false
    }
  },
  methods: {
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
    createOrder () {
      this.isLoading = true
      const apiUrl = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`
      const order = this.form
      this.$http
        .post(apiUrl, { data: order })
        .then((res) => {
          this.$httpMessageState(res, '建立訂單')
          this.$router.push(`/user-success/${res.data.orderId}`)
          this.isLoading = false
          this.getCartList()
          emitter.emit('get-cart')
          // this.$router.push('/user-success')
        })
        .catch((error) => {
          this.isLoading = false
          this.$httpMessageState(error.response, '建立訂單')
        })
    },
    cellPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '輸入正確的手機格式'
    }
  },
  created () {
    this.getCartList()
  }
}
</script>
