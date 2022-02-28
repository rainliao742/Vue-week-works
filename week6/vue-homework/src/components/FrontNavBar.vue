<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/"
        >繁果藝廊 FRUIT OF ART</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">首頁</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cart">購物車 </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products">產品列表 </router-link>
          </li>
        </ul>
      </div>
        <router-link class="nav-link btn btn-outline-primary me-2" to="/cart"> 結帳
        <span class="badge rounded-pill bg-danger">{{ cartData.carts.length }}</span> <!-- 或使用cartData?.carts?.length -->
        </router-link>
        <router-link class="nav-link" to="/admin/products">後台頁面</router-link>
    </div>
  </nav>
</template>
<script>
import emitter from '@/libs/emitter'

export default {
  data () {
    return {
      cartData: {
        carts: [] // 購物車內資料要預設為空值，表單驗證才不會出現錯誤。
      }
    }
  },
  methods: {
    getCart () {
      this.$http
        .get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          // console.log('cart:', res)
          this.cartData = res.data.data
        })
        .catch((error) => {
          alert(error.data.message)
        })
    }
  },
  mounted () {
    this.getCart()
    emitter.on('get-cart', () => {
      this.getCart()
    })// emitter 用on進行監聽，偵測menuBar有沒有加入品項
  }
}
</script>
