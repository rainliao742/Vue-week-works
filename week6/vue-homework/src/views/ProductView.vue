<template>
  <h1 class="text-center my-3 p-2">產品內頁</h1>
  <div class="container-fluid">
    <!-- {{ product }} -->
    <h2 class="text-center py-3">{{ product.title }}</h2>
    <div class="container">
          <div class="card">
            <div class="row align-items-center">
              <div class="col-sm-6">
                <img class="w-100" style="height:400px; object-fit: cover;" :src="product.imageUrl" alt="">
          </div>
              <div class="col-sm-6">
                <div class="pe-5">
                  <h5>{{ product.title }}</h5>
                  <span class="badge bg-primary rounded-pill">{{ product.category }}</span>
                  <p>商品描述：{{ product.description }}</p>
                  <p>商品內容：{{ product.content }}</p>
                  <div class="h5" v-if="product.price === product.origin_price" >{{ product.price }} 元</div>
                  <div v-else>
                    <del class="h6">原價 {{ product.origin_price }} 元</del>
                    <div class="h5">現在只要 {{ product.price }} 元</div>
                  </div>
                  <div class="input-group">

                    <input type="number" class="form-control " v-model="qty"
                           min="1">
                    <button type="button" class="btn btn-primary" @click="addToCart(product.id,qty)"
                    :disabled="isLoadingItem === product.id">
                    <span v-show="isLoadingItem === product.id"><i class="fas fa-spinner fa-pulse"></i></span>
                    加入購物車</button>
                   </div>
                  </div>
                <div>
          </div>
          </div>
              <!-- col-sm-6 end -->
          </div>
          </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/libs/emitter.js'

export default {
  data () {
    return {
      product: {},
      isLoadingItem: '',
      qty: 1
    }
  },
  methods: {
    getProduct () {
      console.log(this.$route) // 取值用route, 方法用router
      const { id } = this.$route.params // 把相應的參數帶進來 id = this.$route.params.id
      this.$http(
        `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`
      ).then((res) => {
        // console.log(res)
        this.product = res.data.product
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
          this.getProduct()
          emitter.emit('get-cart') // 增加減少 選單上購物車顯示的數量
          alert(res.data.message)
        })
        .catch((error) => {
          alert(error.data.message)
        })
    }
  },

  mounted () {
    this.getProduct()
  }
}
</script>
