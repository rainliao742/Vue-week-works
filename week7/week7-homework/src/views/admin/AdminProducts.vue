<template>
  <Loading :active="isLoading" :z-index="9999"></Loading>
  <ToastMessages></ToastMessages>
  <h2 class="text-center my-3 p-2">後台產品列表</h2>
  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="openModal('isNew')">
        <!-- @click="openModal('isNew')" -->
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
          <td>
            {{ item.origin_price }}
          </td>
          <td>
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
                @click="openModal('edit', item)"
              >
                <i class="bi bi-pencil-fill"></i>
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openModal('delete', item)"
              >
                <i class="bi bi-trash-fill"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!--內層:pages, 外層:pagination -->
    <!--內層:get-product, 外層getProducts-->
    <Pagination
      :pages="pagination"
      @get-pages="getProducts"
      class="py-5"
    ></Pagination>
    <!--分頁功能-->

    <!--編輯跟新增-->
    <ProductModal
      :temporary-obj="temporaryObj"
      :is-new="isNew"
      @get-products="getProducts"
      ref="productModal"
    ></ProductModal>

    <!--刪除-->
    <DelProductModal
      :temporary-obj="temporaryObj"
      @del-item="delProductItem"
      ref="delProductModal"
    ></DelProductModal>
  </div>
</template>

<script>
// import bootstrap from 'bootstrap'
import Pagination from '@/components/Pagination.vue'
import ProductModal from '@/components/ProductModal.vue'
import DelProductModal from '@/components/DelProductModal.vue'
import ToastMessages from '@/components/ToastMessages.vue'

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
      }, // 當下選取的物件資料用
      isLoading: false
    }
  },
  components: {
    Pagination,
    ProductModal,
    DelProductModal,
    ToastMessages
  },
  methods: {
    getProducts (page = 1) {
      this.isLoading = true
      // 參數預設值 query, param
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}` // 用?+參數的方式,顯示每個分頁
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products // 讀取遠端data裡的products,放入空陣列products
          this.pagination = res.data.pagination // 讀取遠端data裡的pagination
          this.isLoading = false
        })
        .catch((error) => {
          // 錯誤訊息
          console.log(error.data.message)
          alert(error.data.message)
          this.isLoading = false
        })
    },
    openModal (status, product) {
      if (status === 'isNew') {
        this.isNew = true
        this.temporaryObj = {
          imagesUrl: []
        }
        this.isNew = true
        this.$refs.productModal.openModal()
      } else if (status === 'edit') {
        this.isNew = false // 代表是舊的
        this.temporaryObj = JSON.parse(JSON.stringify(product)) // 深拷貝。以防傳參考，萬一被使用者修改到原來的資料
        this.$refs.productModal.openModal()
      } else if (status === 'delete') {
        this.temporaryObj = JSON.parse(JSON.stringify(product)) // 深拷貝。
        this.$refs.delProductModal.openModal()
      }
    },
    delProductItem () {
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.temporaryObj.id}`
        )
        .then((res) => {
          this.$refs.delModal.closeModal()
          this.getProducts()
        })
        .catch((error) => {
          alert(error.data.message)
        })
    }
  },
  mounted () {
    // 執行登入確認
    // this.checkLogin()
    this.getProducts()
  }
}
</script>
