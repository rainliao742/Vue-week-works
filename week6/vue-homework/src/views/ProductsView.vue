<template>
  <h1 class="text-center my-3 p-2
" >產品列表</h1>
  <!-- {{ products }} -->
  <div class="container">
    <div class="row row-cols-1 row-cols-lg-4 g-4">
      <!--row 決定內層的數量 -->
      <!-- 內層不定義寬度 -->
      <div class="col" v-for="product in products" :key="product.id">
        <div class="card h-100" style="width: auto">
          <img :src="product.imageUrl" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{{ product.title }}}</h5>
            <p class="card-text">{{ product.description }}</p>
          </div>
          <div class="card-footer d-flex">
            <router-link class="btn btn-primary mx-2" :to="`/product/${product.id}`"
              >看更多</router-link
            >
            <!-- 把產品的相應的ID帶入，導入至詳細頁面 -->
                <button type="button" class="btn btn-outline-danger" @click="addToCart(product.id)"
                    :disabled="this.isLoadingItem === product.id">
                    <span v-show="this.isLoadingItem === product.id"><i class="fas fa-spinner fa-pulse"></i></span>
                加入購物車</button>
          </div>
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
      products: [],
      isLoadingItem: ''
    }
  },
  methods: {
    getProduct () {
      this.$http(
        `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      ).then((res) => {
        console.log(res)
        this.products = res.data.products
      }).catch((error) => {
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
          this.isLoadingItem = '' // 清空loading
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
