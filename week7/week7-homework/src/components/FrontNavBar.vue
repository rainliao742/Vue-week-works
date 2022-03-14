<template>
  <div class="bg-white sticky-top  pt-2">
    <div class="container">
      <nav class="navbar px-0 navbar-expand-lg navbar-light bg-white">
        <router-link
          class="navbar-brand position-relative"
          to="/"
          >首頁</router-link
        >
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse bg-white custom-header-md-open"
          id="navbarNav" style="position:absolute; left: 50%; transform: translate(-50%, -50%); top: 50%"

        >
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/">首頁</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">關於</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/products"
                >產品列表</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/user-cart">購物車 </router-link>
            </li>
          </ul>
        </div>
        <div class="d-flex" style="position:absolute; right:0; float:right;">
          <router-link class="btn btn-sm position-relative" to="/user-cart">
            <i class="bi bi-bag fs-5"></i>
            <span
              class="position-absolute top--10 start-100 translate-middle badge rounded-pill bg-danger"
            >
              {{ cartData?.carts?.length }}
              <!--可選串連，防止購物車空的時候會出錯-->
              <span class="visually-hidden">未讀訊息</span>
            </span>
          </router-link>
          <router-link class="btn btn-sm position-relative" to="/">
            <i class="bi bi-heart-fill fs-5"></i>
          </router-link>
          <router-link class="btn btn-sm position-relative pt-0 ps-1" to="/login" style="">
            <i class="bi bi-person-fill fs-3 "></i>
          </router-link>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import emitter from '@/utils/emitter'
export default {
  data () {
    return {
      cartData: {}
    }
  },
  methods: {
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http
        .get(url)
        .then((res) => {
          console.log('getCart: ', res)
          this.cartData = res.data.data
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  mounted () {
    this.getCart()
    emitter.on('get-cart', () => {
      this.getCart()
    })
  }
}
</script>
