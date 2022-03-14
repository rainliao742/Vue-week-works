<template>
  <div class="bg-white sticky-top pt-2">
    <div class="container">
      <nav class="navbar px-0 navbar-expand-lg navbar-dark bg-dark">
        <router-link class="navbar-brand position-relative" to="/"
          >繁果藝廊 FRUIT OF ART 後台</router-link
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
          id="navbarNav"
          style="
            position: absolute;
            left: 50%;
            transform: translate(-50%, -50%);
            top: 50%;
          "
        >
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/">首頁</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/">關於</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/products"
                >產品列表</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/cart">購物車 </router-link>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link" @click.prevent="logout">登出</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['emitter'],
  methods: {
    logout () {
      const apiUrl = `${process.env.VUE_APP_API}/logout`
      this.$http
        .post(apiUrl)
        .then((response) => {
          this.$httpMessageState(response, '登出')
          if (response.data.success) {
            this.$router.push('/')
          }
        })
        .catch((error) => {
          this.$httpMessageState(error.response, '錯誤訊息')
        })
      document.cookie = 'rainToken=;expires=;'
      this.$router.push('/login')
    }
  }
}
</script>
