<template>
  <div class="about">
    <div class="container">
      <div class="col m-auto" style="height: auto">
        <h1 class="text-center">This is an about page</h1>
      </div>
    </div>
  </div>
 <div class="bg-light">
    <div class="container h-100 vh-md-auto">
        <!-- 搜尋欄 -->
        <div class="row py-6 py-md-7">
            <div class="col-md-6">
                  <div class="input-group">
                    <input class="form-control" type="search" v-model.lazy.trim="search"
                    placeholder="輸入書籍、作者名稱" aria-label="Search" aria-describedby="button-addon2">
                    <button class="btn btn-primary" type="submit" id="button-addon2">
                        <i class="fa-solid fa-magnifying-glass text-white"></i>
                    </button>
                </div>
            </div>
        </div>
        <!-- mainContent -->
        <div class="row">
            <!-- sideBar -->
            <div class="col-md-3 mb-5 mb-md-0" :class="{'vh-md-70':filterProducts.length <= 1}">
              <div class="position-sticky top-20">
                <div class="accordion" id="accordion" >
                    <div class="accordion-item border-0">
                        <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                        <button class="accordion-button text-white bg-primaryDark fs-4 fs-md-3 fw-bold px-3 py-4 px-md-4 py-md-5"
                        type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                            類別
                        </button>
                        </h2>
                        <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">
                        <div class="accordion-body p-0">
                            <ul class="list-group list-group-flush fw-bold cursor-pointer">
                              <!-- 用以判斷點擊的li哪個為active，並將同排的li之active樣式歸零 -->
                                <li class="list-group-item"
                                    :class="isActive === 'all' ? 'active' : ''"
                                    @click="getProducts(), (isActive = 'all'), accordionCollapseBack()"
                                >全部 ({{productsAll.length}})</li>
                                <li class="list-group-item cateList" v-for="(item, i) in filterCategory" :key="i"
                                :class="isActive === item ? 'active' : ''"
                                 @click="getProducts(item,'category'),(isActive = item), accordionCollapseBack()" >{{item}} ({{filterCateNum[item]}})</li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
              </div>
            </div>
            <!-- content -->
            <div class="col-md-9">
                <ul :class="{'vh-50':filterProducts.length === 1}">
                  <p class="fs-3 fw-bold vh-40 vh-md-60 py-4 w-100" v-if="filterProducts.length === 0">沒有相符的搜尋結果 Σ( ° △ °)</p>
                    <li class="bg-white mb-4 mb-md-8 hoverBoxShadow" v-for="item in filterProducts" :key="item.id">
                        <div class=" d-flex align-items-center w-100 p-3 p-md-5 h-100">
                            <router-link class="text-primary me-4 me-md-5 w-42.5 w-md-30" :to="`/product/${item.id}`">
                                <img class="ratio ratio-3x4 rounded-4"
                                    :src="item.imageUrl" :alt="item.title">
                                </router-link>
                                <div class="bookIntro border-end-md pe-md-1 w-57.5 w-md-45 me-md-4">
                                    <p class="fw-bold fs-md-4 mb-1 mb-md-2">{{item.title}}</p>
                                    <p class="fs-small fs-md-5 mb-1 mb-md-2">作者 : {{item.author}}</p>
                                    <p class="fs-small fs-md-5 mb-1 mb-md-2">出版社 : {{item.publishing_house}}</p>
                                    <p class="fs-small fs-md-5 mb-1 mb-md-2">出版日期 : {{item.publication_date}}</p>
                                    <p class="fs-md-3 fw-bold text-primary mb-1 mb-md-2">NT$ {{item.price}}</p>
                                    <div class="btn btn-primary text-white w-md-auto fs-small fs-md-5" @click="addToCart(item)">
                                        <i class="fa-solid fa-cart-plus me-3"></i>加入購書車<span v-show="isLoadingItem === item.id"><i class="fas fa-spinner fa-pulse ms-1"></i></span>
                                    </div>
                                </div>
                                <hr>
                                <div class="bookContent w-55 d-none d-md-block">
                                    <p v-html="item.content"></p>
                                    <div class="text-end">
                                        <router-link class="text-primary w-100" :to="`/product/${item.id}`">繼續閱讀</router-link>
                                    </div>

                                </div>
                        </div>
                    </li>
                </ul>
                 <!-- pagination -->
                  <Pagination class="d-flex justify-content-center mb-4 mb-md-6"
                  :pages="pagination" @update-page="getProducts"></Pagination>
            </div>
        </div>
    </div>
</div>
</template>

<style lang="scss">
.autoUl {
  background: #fff;
  z-index: 1;
  padding: 0;
  list-style: none;
}
.autoBackground {
  background: rgb(155, 150, 150);
}
.auto {
  &:hover {
    background: rgb(155, 150, 150);
    cursor: pointer;
  }
}
</style>
<script>
// import emitter from '@/utils/emitter'
import Pagination from '@/components/FrontPagination.vue'

export default {
  data () {
    return {
      products: [],
      productsAll: [],
      pagination: [],
      isActive: 'all',
      isLoadingItem: '',
      search: '',
      isLoading: false,
      cartData: {
        carts: []
      }
    }
  },
  components: {
    Pagination
  },
  methods: {
    getProducts (query = 1, status) {
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products`
      if (status) {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?category=${query}`
      } else if (!status) {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?page=${query}`
      }
      this.isLoading = true
      this.$http.get(url)
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
          this.isLoading = false
        }).catch((err) => {
          console.log(err)
          this.isLoading = false
        })
    },
    getAllProducts () {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`)
        .then((res) => {
          this.productsAll = res.data.products
        }).catch((err) => {
          console.log(err)
        })
    },
    addToCart (product, qty = 1) {
    // 如果選擇的數量>=庫存就return
      // this.isLoadingItem = product.id
      // // 篩選出cartData與指定商品中id相同的資料
      // let temp = this.cartData.carts.filter(item => item.product_id === product.id)
      // // 取陣列中第一個物件
      // temp = { ...temp[0] }
      // const resultQty = temp.qty + qty
      // if (resultQty > product.inventory) {
      //   // this.$StatusMsg(false, '加入', '超過庫存數量')
      //   this.isLoadingItem = ''
      // } else {
      //   this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, {
      //     data: {
      //       product_id: product.id,
      //       qty
      //     }
      //   }).then((res) => {
      //     // this.$emitter.emit('get-cart-list')
      //     // this.$StatusMsg(res, '加入', '已成功加入購書車')
      //     this.isLoadingItem = ''
      //   }).catch(() => {
      //     // this.$StatusMsg(false, '加入', '加入購書車失敗')
      //   })
      // }
    },
    // 判斷當螢幕為手機版時，點擊選單自動收合
    accordionCollapseBack () {
      if (window.matchMedia('(max-width: 767px)').matches) {
        const accordionButton = document.querySelector('.accordion-button')
        accordionButton.click()
      }
    }
  },
  watch: {
    search () {
      if (this.search !== '') {
        // this.pagination.has_pre = false
        // this.pagination.current_page = 1
        // this.pagination.total_pages = 1
        // this.pagination.has_next = false
      } else if (this.search === '') {
        this.getProducts()
      }
    },
    // productCate () {
    //   this.getProducts(this.productCate, 'category')
    //   console.log('trigger')
    // }
  },
  // 搜尋功能
  computed: {
    filterProducts () {
      const strArr = this.search.split(' ') // 以空白格切分字串
      const arr = []
      // 比對字串
      strArr.forEach((str) => {
        let data = this.products
        if (this.search !== '') {
          data = this.productsAll
        }
        data.forEach((item) => {
          if (item.title.includes(str) || item.author.includes(str)) {
            arr.push(item)
          }
        })
      })
      // 如果輸入兩個關鍵字就會出現重複的資料，所以需要刪除重複資料。
      // 過濾出重複的元素
      return [...new Set(arr)]
      // 另一種方法 : findIndex
      // const filterArr = arr.filter((item, i) => {
      //   // 將 當前陣列的索引 與 findIndex() 回傳出的索引值進行比對，但 findIndex() 的方法 只會回傳 第一個 符合條件的陣列元素的索引
      //   const index = arr.findIndex((book) => book.title === item.title)
      //   return i === index
      // })
      // return filterArr
    },
    filterCategory () {
      // 提取出category
      const array = this.productsAll.map((item) => item.category)
      // 過濾出重複的元素
      return [...new Set(array)]
    },
    filterCateNum () {
      // 取出每個category的數量
      const cateNum = {}
      this.productsAll.forEach((item) => {
        if (!cateNum[item.category]) {
          cateNum[item.category] = 1
        } else {
          cateNum[item.category] += 1
        }
      })
      return cateNum
    }
  },
  mounted () {
    this.getAllProducts()
    this.getProducts()
   // emitter.emit('get-cart-list')
    // 接收來自FrontNavbar的cartData資料
    // emitter.on('push-cart-data', (cartData) => {
    //   this.cartData = cartData
    // })
    // 利用localStorage取得資料
    // const category = localStorage.getItem('category') || []
    // const isActive = localStorage.getItem('isActive') || 'all'
    // if (category) {
    //   this.isActive = isActive
    //   this.getProducts(category, 'category')
    //   localStorage.removeItem('category')
    //   localStorage.removeItem('isActive')
    // }
  }
}
</script>
