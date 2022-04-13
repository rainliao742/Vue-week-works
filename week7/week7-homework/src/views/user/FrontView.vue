<template>
  <FrontNavBar></FrontNavBar>
  <ToastMessages></ToastMessages>
  <router-view />
  <Footer></Footer>
</template>
<script>
import emitter from '@/utils/emitter'
import FrontNavBar from '@/components/FrontNavBar.vue'
import ToastMessages from '@/components/ToastMessages.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: { FrontNavBar, ToastMessages, Footer },
  provide () {
    return {
      emitter
    }
  }
}
</script>
