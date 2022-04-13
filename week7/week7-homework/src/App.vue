<template>
  <router-view />
</template>

<style lang="scss">
@import './assets/style/all.scss'; // scss資源
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
//深色模式
// @media( prefers-color-scheme: dark){
//   body{
//     background-color: var(--bs-gray-dark);
//     color:var(--bs-white);
//     .table{
//       color:var(--bs-white);
//     }
//     .text-dark, .nav-link, a{
//       color:var(--bs-white) !important;
//     }
//     .bg-white{
//       background-color: var(--bs-gray-900) !important;
//     }
//   }
// }
</style>
