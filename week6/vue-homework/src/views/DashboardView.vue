<template>
  <AdminNavbar></AdminNavbar>
  <router-view v-if="checkSuccess"></router-view>
</template>
<script>
import AdminNavbar from '@/components/AdminNavBar.vue'
export default {
  name: 'DashBoard',
  data () {
    return {
      checkSuccess: false
    }
  },
  components: {
    AdminNavbar
  },
  mounted () {
    this.checkLogin()
  },
  methods: {
    checkLogin () {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)rainToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      if (token) {
        // Axios 預設值
        this.$http.defaults.headers.common.Authorization = `${token}`

        const apiUrl = `${process.env.VUE_APP_API}api/user/check`
        this.$http
          .post(apiUrl, { api_token: this.token })
          .then(() => {
            this.checkSuccess = true
          })
          .catch((error) => {
            alert(error.data.message)
            this.$router.push('/login')
          })
      } else {
        alert('您尚未登入')
        this.$router.push('/login')
      }
    }
  }
}
</script>
