<template>
  <div class="container-fluid">
    <Loading :active="isLoading" :z-index="9999"></Loading>
    <ToastMessages></ToastMessages>
    <div class="row flex-md-row-reverse flex-column justify-content-center">
      <div class="col-md-12 py-3 my-3">
        <swiper
          :slides-per-view="1"
          :space-between="50"
          :modules="modules"
          :autoplay="{ delay: 2000, disableOnInteraction: false }"
          :loop="true"
          :speed="2000"
          :pagination="{ clickable: true }"
          :navigation="true"
          effect="fade"
          style="border: 1px solid #ccc; background-color: #ccc"
        >
          <swiper-slide
            v-for="item in productsAll"
            :key="item.id"
            data-swiper-autoPlay="2000"
          >
            <div
              style="height: 500px; width: 100wh; background-size: cover"
              :style="{
                backgroundImage: `url(${item.imageUrl})`
              }"
            ></div>
            <!-- <img :src="item.imagesUrl" :alt="item.title" class="img-fluid" /> -->
          </swiper-slide>
        </swiper>
      </div>
      <form class="autocomplete w-100 position-relative md-md-0">
        <div
          class="col-md-8 d-flex flex-column justify-content-center mt-md-0 mt-3 mx-auto position-relative"
        >
          <h4 class="fw-bold text-center">搜尋畫作、作家</h4>
          <h6 class="font-weight-normal text-muted mt-2 text-center">
            您可以快速尋找你想要的畫家、作品、折扣...等。
          </h6>
          <div class="input-group mb-0 mt-4">
            <label for="headerInput"></label>
            <input
              id="headerInput"
              type="search"
              class="form-control rounded-0"
              placeholder="尋找你想要的畫家、作品..."
              v-model.lazy.trim="search"
              @keyup="KeyboardEvent"
              aria-label="Search"
              arial-describedby="button-addon"
            />
            <div class="input-group-append">
              <button
                class="btn btn-dark rounded-0 px-5 py-2"
                type="button"
                id="search"
                @click="searchProducts"
              >
                點我搜尋
              </button>
            </div>

            <ul
              class="autoComplete position-absolute box-shadow bg-white w-100 w-md-50 z-index-3"
              style="top: 0; left: 0; border: 1px solid #ccc"
              :class="autoComplete ? '' : 'd-none'"
            >
              <li
                class="searchHover p-2 w-100"
                v-for="(item, i) in filterProducts"
                :key="item.id"
                :class="selectedIndex === i ? 'bg-light' : ''"
              >
                <router-link
                  class="text-dark d-inline-block w-100"
                  :to="`/product/${item.id}`"
                  >{{ item.title }}</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </form>
    </div>
    <!-- <SwiperComponent
      category="最新上架"
      :titlebgColor="true"
      :showTitle="true"
    ></SwiperComponent> -->
    <div class="row mt-5">
      <div class="col-md-6 mt-md-4">
        <div class="card border-0 mb-4 position-relative position-relative">
          <img
            src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80"
            class="card-img-top rounded-0"
            alt="..."
          />
          <div class="card-body p-0">
            <h4 class="mb-0 mt-4">Lorem ipsum</h4>
            <div class="d-flex justify-content-between mt-3">
              <p class="card-text text-muted mb-0 w-75">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod.
              </p>
              <button class="btn btn-outline-dark rounded-0 text-nowrap">
                Lorem ipsum
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--折扣碼-->
  <div class="bg-light" id="cta">
    <div class="container py-6 bg-dark rounded">
      <div class="position-relative">
        <div class="center w-75 mx-auto d-flex flex-wrap">
          <h2
            class="text-white text-shadow fs-5 fs-md-1 fw-bold mb-4 mb-md-4 text-center w-100"
          >
            現在完成首購，立享八折優惠!
          </h2>
          <h5
            ref="couponCode"
            class="position-relative text-center mb-4 mb-md-4 w-100"
            :class="{ 'd-none': isCopied }"
            style="color: #666"
          >
            2022-VanGo-gallery
          </h5>
          <button
            class="btn btn-primary fs-small fs-md-5 text-white fw-bold w-50 mx-auto py-3 rounded"
            :disabled="isCopied == true"
            @click.once="getCouponCode"
          >
            馬上領取<i class="fa-solid fa-arrow-pointer ms-2"></i>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-light mt-7">
    <div class="container">
      <SwiperComponent category="最新上架" :showTitle="true"></SwiperComponent>
      <div
        id="carouselExampleControls"
        class="carousel slide"
        data-ride="carousel"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="row justify-content-center py-7">
              <div class="col-md-8 d-flex">
                <img
                  src="https://images.unsplash.com/photo-1490138139357-fc819d02e344?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                  alt=""
                  class="rounded-circle me-5"
                  style="width: 160px; height: 160px; object-fit: cover"
                />
                <div class="d-flex flex-column">
                  <p class="h5">
                    “Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                    sed diam nonumy eirmod tempor invidunt ut labore et dolore
                    magna aliquyam erat.”
                  </p>
                  <p class="mt-auto text-muted">Lorem ipsum dolor sit amet.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <div class="row justify-content-center py-7">
              <div class="col-md-8 d-flex">
                <img
                  src="https://images.unsplash.com/photo-1490138139357-fc819d02e344?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                  alt=""
                  class="rounded-circle me-5"
                  style="width: 160px; height: 160px; object-fit: cover"
                />
                <div class="d-flex flex-column">
                  <p class="h5">
                    “Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                    sed diam nonumy eirmod tempor invidunt ut labore et dolore
                    magna aliquyam erat.”
                  </p>
                  <p class="mt-auto text-muted">Lorem ipsum dolor sit amet.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <div class="row justify-content-center py-7">
              <div class="col-md-8 d-flex">
                <img
                  src="https://images.unsplash.com/photo-1490138139357-fc819d02e344?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                  alt=""
                  class="rounded-circle me-5"
                  style="width: 160px; height: 160px; object-fit: cover"
                />
                <div class="d-flex flex-column">
                  <p class="h5">
                    “Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                    sed diam nonumy eirmod tempor invidunt ut labore et dolore
                    magna aliquyam erat.”
                  </p>
                  <p class="mt-auto text-muted">Lorem ipsum dolor sit amet.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
          alt=""
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
          alt=""
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
  </div>
  <div class="container my-7">
    <div class="row">
      <div class="col-md-4">
        <img
          src="https://images.unsplash.com/photo-1548689816-c399f954f3dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
          alt=""
          style="width: 48px; height: 48px; object-fit: cover"
        />
        <h4 class="mt-4">Lorem ipsum</h4>
        <p class="text-muted">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna.
        </p>
      </div>
    </div>
  </div>
  <div class="bg-light py-7">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-4 text-center">
          <h3>Lorem ipsum</h3>
          <p class="text-muted">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod.
          </p>
          <button class="btn btn-dark mt-4 rounded-0">Lorem ipsum</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SwiperComponent from '@/components/SwiperComponent.vue'
// import { reactive } from 'vue'

import SwiperMixin from '@/mixins/swiper'
import SwiperCore, {
  EffectFade,
  Autoplay,
  Pagination,
  Navigation
} from 'swiper'
import ToastMessages from '@/components/ToastMessages.vue'

SwiperCore.use([Autoplay, Pagination, Navigation])

export default {
  name: '首頁',
  data () {
    return {
      productsAll: [],
      pagination: {},
      isLoading: false,
      isCopied: false,
      modules: [Autoplay, Pagination, EffectFade],
      filterData: [],
      search: '',
      autoComplete: false,
      selectedIndex: 0 // 第一筆結果
    }
  },
  mixins: [SwiperMixin],
  components: {
    ToastMessages,
    SwiperComponent
  },
  methods: {
    getCouponCode () {
      console.log('copy複製碼')
      this.$httpMessageState(true, '複製', '您已取得優惠碼')
      const range = document.createRange() // 建立range物件
      range.selectNode(this.$refs.couponCode)
      const selection = window.getSelection() // 取得 Selection
      selection.removeAllRanges() // 先清空當前選取範圍
      selection.addRange(range) // 加入range
      document.execCommand('copy') // 執行瀏覽器複製命令
      this.isCopied = true
    },
    getProducts (category, page = 1) {
      this.isLoading = true
      let apiUrl = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/?page=${page}`
      if (category) {
        apiUrl = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/?category=${category}`
      }
      this.$http
        .get(apiUrl)
        .then((res) => {
          this.productsAll = res.data.products
          this.pagination = res.data.pagination
          this.isLoading = false
        })
        .catch((error) => {
          this.isLoading = false
          console.log(error)
        })
    },
    searchProducts () {
      this.productsAll = this.filterProducts
      this.autoComplete = false
      console.log('search')
    },
    KeyboardEvent (e) {
      // 向上鍵
      if (e.keyCode === 38) {
        if (this.selectedIndex > 0) {
          this.selectedIndex--
          console.log('up')
        }
      } else if (e.keyCode === 40) {
        this.selectedIndex++
        console.log('down')
      } else if (e.keyCode === 13) {
        console.log('enter')
        this.filterProducts.forEach((item, i) => {
          if (this.selectedIndex === i) {
            this.search = item.title
          }
        })
      }
    }
  },
  computed: {
    filterProducts () {
      const strArr = this.search.split(' ') // 以空白格切分字串
      const arr = []
      // 比對字串
      strArr.forEach((str) => {
        this.productsAll.forEach((item) => {
          if (item.title.includes(str) || item.author.includes(str)) {
            arr.push(item)
          }
        })
      })
      // 如果輸入兩個關鍵字就會出現重複的資料，所以需要刪除重複資料。
      // 過濾出重複的元素
      return [...new Set(arr)]
    }
  },
  watch: {
    search () {
      if (this.search) {
        this.autoComplete = true
      } else {
        this.autoComplete = false
        this.getProducts()
      }
    },
    products () {
      if (this.productsAll.length <= 1) {
        this.autoComplete = false
      }
    }
  },
  mounted () {
    this.isLoading = true
    this.getProducts()
    setTimeout(() => {
      this.isLoading = false
    }, 1000)
    // this.$emitter.on('goAnchor', () => {
    //   setTimeout(() => {
    //     const anchor = document.querySelector('#cta')
    //     document.documentElement.scrollTop = anchor.offsetTop - 150
    //   }, 500)
    // })
  }
}
</script>

<style lang="scss">
.swiper-button-next,
.swiper-button-prev,
.swiper-pagination-bullet .swiper-pagination-bullet-active {
  color: lightslategray;
}
.swiper-pagination-bullet-active {
  background: #fff;
}
</style>
