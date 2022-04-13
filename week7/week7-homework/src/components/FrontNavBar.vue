<template>
  <div class="bg-white sticky-top pt-2 shadow-sm">
    <div class="container-fluid px-xl-5" style="max-width:1440px">
      <nav class="navbar px-0 navbar-expand-md navbar-light bg-white">
        <router-link class="navbar-brand position-relative me-0" to="/"
          >首頁</router-link
        >

        <!-- 漢堡選單 -->
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
          class="collapse navbar-collapse bg-white custom-header-md-open w-100"
          id="navbarNav"
          style=""
        >
          <ul class="navbar-nav" style="">
            <li class="nav-item">
              <router-link class="nav-link" to="/">首頁</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">關於</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/products">畫廊</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/news-list"
                >最新消息</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/user-cart"
                >購物車
              </router-link>
            </li>
          </ul>
          <div class="d-flex nav-right-icons" style="">
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
            <router-link
              class="btn btn-sm position-relative pt-0 ps-1"
              to="/login"
              style=""
            >
              <i class="bi bi-person-fill fs-3"></i>
            </router-link>
          </div>
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
    navCollapseBack () {
      if (window.matchMedia('(max-width: 767px)').matches) {
        const navbarToggle = document.querySelector('.navbar-toggler')
        navbarToggle.click()
      }
    },
    getCart () {
      const apiUrl = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http
        .get(apiUrl)
        .then((res) => {
          this.cartData = res.data.data
          emitter.emit('push-cart-data', this.cartData)
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

<style lang="scss" scoped>
.navbar-collapse {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.navbar-nav {
  order: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.nav-right-icons {
  order: 2;
  position: absolute;
  right: 0;
  float: right;
}
@media screen and (max-width: 767px) {
  .navbar-collapse {
    display: flex;
    flex-wrap: wrap;
    padding: 2rem 2rem 0rem 2rem;
    margin: 2rem 0;
    box-sizing: border-box;
    border-top: 1px solid #ccc;
  }
  .navbar-nav {
    order: 2;
    position: relative;
    top: auto;
    left: 0%;
    transform: translate(0%, 0);
    width: 100%;
    .nav-item{
      border-bottom:1px solid #ddd;
      &:last-child{
        border-bottom:none;
      }
      a.nav-link{
        width: 100%;
        text-align: center;
        font-size: 1.4rem;
        padding:1.3rem 0;
      }
    }
  }
  .nav-right-icons {
    order: 1;
    position: relative;
    margin: 0 auto;
    right: 0;
    width: 100%;
    justify-content: center;
    a{
      margin:0 10%;
    }
  }
}
</style>
