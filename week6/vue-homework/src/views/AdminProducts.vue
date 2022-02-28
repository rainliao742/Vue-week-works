<template>
  <h2 class="text-center my-3 p-2">後台產品列表</h2>
  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" ><!-- @click="openModal('isNew')" -->
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr class="py-3">
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th>編輯／刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-end">
            {{ item.origin_price }}
          </td>
          <td class="text-end">
            {{ item.price }}
          </td>
          <td>
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group" role="group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
               >編輯<!-- @click="openModal('edit', item)" -->
                <i class="bi bi-pencil-fill"></i>
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
              >刪除<!-- @click="openModal('delete', item)" -->
                <i class="bi bi-trash-fill"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!--內層:pages, 外層:pagination -->
    <!--內層:get-product, 外層getProducts-->
    <Pagination :pages="pagination" @get-product="getProducts"></Pagination>
    <!--分頁功能-->

    <!--編輯跟新增-->
    <!--
    <ProductModal
      :temporary-obj="temporaryObj"
      :is-new="isNew"
      @get-products="getProducts"
    ></ProductModal>-->

    <!--刪除-->
    <!--
    <DelProductModal
      :temporary-obj="temporaryObj"
      @get-products="getProducts"
    ></DelProductModal>
    -->
  </div>
</template>

<script>
// import bootstrap from 'bootstrap'
import Pagination from '@/components/Pagination.vue'
// import ProductModal, { productModal } from '@/components/ProductModal.vue'
// import DelProductModal, { delProductModal } from '@/components/DelProductModal.vue'
// import Modal from 'bootstrap/js/dist/modal'

export default {
  name: 'Products',
  props: ['token'],
  data () {
    return {
      products: [], // 擺放遠端的資料用
      isNew: false, // 預設新增的資料 值為否
      pagination: {}, // 分頁使用的空物件
      temporaryObj: {
        imagesUrl: [] // 放入多圖上傳用
      } // 當下選取的物件資料用
    }
  },
  components: {
    Pagination
    // ProductModal,
    // DelProductModal
  },
  methods: {
    checkLogin () {
      // token 寫入至 headers 從login頁面來的cookie能夠持續使用此token // hexToken 必須跟 login頁面一樣設定為hexToken
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)rainToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      // 當下次載入頁面時，自動放入token
      this.$http.defaults.headers.common.Authorization = token

      const apiUrl = `${process.env.VUE_APP_API}api/user/check`
      this.$http
        .post(apiUrl, { api_token: this.token })
        .then((res) => {
          // 有登入的話，就顯示getProducts的資料
          this.getProducts()
        })
        .catch((error) => {
          alert(error.data.message)
          // 未登入或是嘗試直接進入此頁面會被導入login頁
          location.href = 'login.html'
          this.$router.push('/login')
        })
    },
    getProducts (page = 1) {
      // 參數預設值 query, param
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}` // 用?+參數的方式,顯示每個分頁
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products // 讀取遠端data裡的products,放入空陣列products
          this.pagination = res.data.pagination // 讀取遠端data裡的pagination
        })
        .catch((error) => {
          // 錯誤訊息
          console.log(error.data.message)
          alert(error.data.message)
        })
    }
    // openModal (status, product) {
    //   if (status === 'isNew') {
    //     this.isNew = true
    //     this.temporaryObj = {
    //       imagesUrl: []
    //     }
    //     this.isNew = true
    //     productModal.show()
    //   } else if (status === 'edit') {
    //     this.isNew = false
    //     this.temporaryObj = JSON.parse(JSON.stringify(product)) // 深拷貝。以防傳參考，萬一被使用者修改到原來的資料
    //     productModal.show()
    //     this.isNew = false // 代表是舊的
    //   } else if (status === 'delete') {
    //     this.temporaryObj = JSON.parse(JSON.stringify(product)) // 深拷貝。
    //     delProductModal.show()
    //   }
    // }
  },
  mounted () {
    // 執行登入確認
    // this.checkLogin()
    this.getProducts()
  }
}
</script>
