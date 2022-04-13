<template>
  <Loading :active="isLoading" :z-index="9999"></Loading>
  <nav
    class="navbar navbar-expand-lg navbar-light justify-content-center border border-start-0 border-end-0 border-top border-bottom"
  >
    <div class="navbar-nav flex-row overflow-auto navbar-custom-scroll">
      <a
        class="nav-item nav-link text-nowrap px-2 active"
        href="#"
        @click.prevent="getProducts()"
        >全部</a
      >
      <a
        class="nav-item nav-link text-nowrap px-2"
        href="#"
        @click.prevent="getProducts('油畫')"
        >油畫</a
      >
      <a
        class="nav-item nav-link text-nowrap px-2"
        href="#"
        @click.prevent="getProducts('水墨')"
        >水墨</a
      >
      <a
        class="nav-item nav-link text-nowrap px-2"
        href="#"
        @click.prevent="getProducts('裝置藝術')"
        >書法<span class="sr-only"></span
      ></a>
      <a
        class="nav-item nav-link text-nowrap px-2"
        href="#"
        @click.prevent="getProducts('裝置藝術')"
        >裝置藝術</a
      >
      <a
        class="nav-item nav-link text-nowrap px-2"
        href="#"
        @click.prevent="getProducts('陶藝')"
        >陶藝</a
      >
      <a
        class="nav-item nav-link text-nowrap px-2"
        href="#"
        @click.prevent="getProducts('其他')"
        >其他</a
      >
    </div>
  </nav>
  <div class="container mt-md-5 mt-3 mb-7">

    <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4">
      <div class="col w-100 p-3 h-30" v-if="products.length == 0">
        <h2 class="text-center" style="color: #ccc">很抱歉，目前沒有資料！</h2>
      </div>

      <div class="col" v-for="product in products" :key="product.id">
        <div class="card border-0 mb-4 position-relative position-relative">
          <div
            :style="{
              background: `url(${product.imageUrl}) no-repeat center center`
            }"
            style="
              height: 200px;
              overflow: hidden;
              background-size: cover;
              position: relative;
            "
          >
            <div
              class="btn position-absolute d-flex"
              style="
                top: 5px;
                right: 5px;
                width: 30px;
                height: 30px;
                display: block;
                align-item: center;
                justify-content: center;
              "
              @click="toggleFavorite(product.id)"
            >
              <i
                v-if="favorite.includes(product.id)"
                class="bi bi-heart-fill fs-5"
                style="color: #fff"
              ></i>
              <i v-else class="bi bi-heart fs-5" style="color: #fff"></i>
            </div>
          </div>
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
    <Pagination :pages="pagination"></Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/FrontPagination.vue'

export default {
  data () {
    return {
      products: [],
      pagination: {},
      isLoading: false,
      favorite: JSON.parse(localStorage.getItem('favorite')) || [] // 抓取localStorage的資料把文字轉成物件,或是預設為空值
    }
  },
  components: {
    Pagination
  },
  methods: {
    getProducts (category, page = 1) {
      this.isLoading = true
      let apiUrl = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/?page=${page}`
      if (category) {
        apiUrl = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/?category=${category}`
      }
      this.$http
        .get(apiUrl)
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
          this.isLoading = false
        })
        .catch((error) => {
          this.isLoading = false
          console.log(error)
        })
    },
    toggleFavorite (id) {
      console.log(id)
      const favoriteIndex = this.favorite.findIndex((product) => product === id)
      // 判斷favorite陣列裡面是不是有同樣的ID
      // 如果有是 1 移除
      // 沒有 -1 新增一個
      if (favoriteIndex === -1) {
        this.favorite.push(id)
      } else {
        this.favorite.splice(favoriteIndex, 1)
      }
    }
  },
  // localStorage 寫入
  watch: {
    favorite: {
      handler () {
        // localStorage 自訂欄位
        localStorage.setItem('favorite', JSON.stringify(this.favorite)) // 匯出資料撰成文字
      },
      deep: true
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
