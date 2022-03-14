<template>
  <nav
    class="navbar navbar-expand-lg navbar-light justify-content-center border border-start-0 border-end-0 border-top border-bottom"
  >
    <div class="navbar-nav flex-row overflow-auto navbar-custom-scroll">
      <a class="nav-item nav-link text-nowrap px-2" href="#">Lorem ipsum</a>
      <a class="nav-item nav-link text-nowrap px-2" href="#">Lorem ipsum</a>
      <a class="nav-item nav-link text-nowrap px-2 active" href="#"
        >Lorem ipsum <span class="sr-only">(current)</span></a
      >
      <a class="nav-item nav-link text-nowrap px-2" href="#">Lorem ipsum</a>
      <a class="nav-item nav-link text-nowrap px-2" href="#">Lorem ipsum</a>
    </div>
  </nav>
  <!-- <div>{{ products }}</div> -->
  <div class="container mt-md-5 mt-3 mb-7">
    <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4">
      <div class="col" v-for="product in products" :key="product.id">
        <div class="card border-0 mb-4 position-relative position-relative">
          <!-- <img
            :src="product.imageUrl"
            class="card-img-top rounded-0"
            :alt="product.title"
          /> -->
          <div
            :style="{
              background: `url(${product.imageUrl}) no-repeat center center`
            }"
            style="height: 200px; overflow: hidden; background-size: cover"
          ></div>
          <a href="#" class="text-dark">
            <i
              class="far fa-heart position-absolute"
              style="right: 16px; top: 16px"
            ></i>
          </a>
          <div class="card-body p-0">
            <h4 class="mb-0 mt-3">
              <routerLink :to="`/product/${product.id}`">
                <!-- 這邊要綁定to 加上樣板字面值去抓ID -->
                {{ product.title }}
              </routerLink>
            </h4>
            <p class="card-text text-muted mb-0">{{ product.description }}</p>
            <p class="text-muted mt-3">NT$ {{ product.price }}</p>
          </div>
        </div>
      </div>
    </div>
    <Pagination></Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/FrontPagination.vue'

export default {
  data () {
    return {
      products: []
    }
  },
  components: {
    Pagination
  },
  methods: {
    getProducts () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.$http
        .get(url)
        .then((res) => {
          console.log('前台Product', res)
          this.products = res.data.products
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
