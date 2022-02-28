<template>
  <div class="container">
    <div class="row">
      <div class="home d-flex flex-wrap
 justify-content-center align-items-center align-self-center
">
        <div class="d-flex justify-content-center m-5" style="width:100%">
        <img alt="Vue logo" src="../assets/logo.png" >
        </div>
        <HelloWorld msg="Welcome to Your Vue.js App"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
