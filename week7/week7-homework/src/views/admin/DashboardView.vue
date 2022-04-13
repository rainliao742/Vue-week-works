<template>
  <AdminNavbar></AdminNavbar>
  <ToastMessages></ToastMessages>
  <router-view v-if="checkSuccess"></router-view>
</template>
<script>
import AdminNavbar from '@/components/AdminNavBar.vue'
import emitter from '@/utils/emitter'
import ToastMessages from '@/components/ToastMessages.vue'

export default {
  components: { AdminNavbar, ToastMessages },
  data () {
    return {
      checkSuccess: false
    }
  },
  provide () {
    return {
      emitter
    }
  },
  created () {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)rainToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    this.$http.defaults.headers.common.Authorization = token
    const apiUrl = `${process.env.VUE_APP_API}/api/user/check`
    this.$http
      .post(apiUrl)
      .then((res) => {
        this.$httpMessageState(res, '登入')
        this.checkSuccess = true
      })
      .catch((error) => {
        this.$router.push('/')
        this.$httpMessageState(error.res, '錯誤訊息')
      })
  }
}
</script>
