<template>
  <FrontNavbar></FrontNavbar>
  <router-view></router-view>
</template>

<script>
import FrontNavbar from '@/components/FrontNavBar.vue'
export default {
  components: {
    FrontNavbar
  }
}
</script>
