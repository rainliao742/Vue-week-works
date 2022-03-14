<template>
  <div class="container d-flex justify-content-center align-items-center" style="min-height:600px; flex-wrap:wrap;">
    <Loading :active="isLoading" :z-index="9999"></Loading>
    <ToastMessages></ToastMessages>
    <div class="row justify-content-center">
      <h1 class="h3 mb-6 font-weight-normal text-center">請先登入</h1>
      <div class="col-12">
        <form id="form" class="form-signin" v-on:submit.prevent="login">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="username"
              placeholder="name@example.com"
              required
              autofocus
              v-model="user.username"
            />
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              required
              v-model="user.password"
            />
            <label for="password">Password</label>
          </div>
          <button
            class="btn btn-lg btn-primary w-100 mt-3"
            type="submit"
            v-on:click="login"
          >
            登入
          </button>
        </form>
      </div>
    </div>
    <p class="col-12 mt-5 mb-3 text-muted text-center">&copy; 繁果藝廊 --後台登入--</p>
  </div>
</template>

<script>
import emitter from '@/utils/emitter'
import ToastMessages from '@/components/ToastMessages.vue'

export default {
  data () {
    return {
      isLoading: false,
      user: {
        username: '',
        password: ''
      }
    }
  },
  components: {
    ToastMessages
  },
  provide () {
    return {
      emitter
    }
  },
  methods: {
    login () {
      const apiUrl = `${process.env.VUE_APP_API}/admin/signin`
      this.isLoading = true
      this.$http
        .post(apiUrl, this.user)
        .then((response) => {
          const { token, expired } = response.data // 取出cookie token, 登入到期時間
          document.cookie = `rainToken=${token}; expires=${new Date(expired)};` // rainToken 必須跟 product頁面一樣設定為hexToken
          this.isLoading = false
          this.$router.push('/admin/products')
        })
        .catch((error) => {
          this.isLoading = false
          this.$httpMessageState(error.response, '登入')
        }) // 登入失敗
    }
  }
}
</script>
