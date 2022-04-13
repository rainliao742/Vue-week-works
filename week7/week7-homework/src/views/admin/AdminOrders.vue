<template>
  <h2 class="text-center mb-5 mt-3 p-2">後台訂單管理</h2>
  <div class="container">
    <Loading :active="isLoading" :z-index="9999"></Loading>
    <ToastMessages></ToastMessages>
    <div class="text-start my-4 w-100"></div>
    <table class="table caption-top table-hover text-primaryDark">
      <thead>
        <tr>
          <th scope="col">購買時間</th>
          <th scope="col">Email</th>
          <th scope="col">購買款項</th>
          <th scope="col">應付金額</th>
          <th scope="col">是否付款</th>
          <th scope="col">編輯/刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id">
          <td>{{ this.$filters.date(item.create_at) }}</td>
          <td>{{ item.user.email }}</td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, item) in item.products" :key="item">
                <span class="fw-bold">{{ product.product.title }}</span> /
                {{ product.qty }} {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td>NT$ {{ Math.round(item.total) }}</td>
          <td class="ps-5">
            <!-- ToggleSwitch -->
            <label class="switch">
              <input
                type="checkbox"
                v-model="item.is_paid"
                @change="updateOrder(item)"
              />
              <span class="slider"></span>
            </label>
            <!-- ToggleSwitch -->
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                @click="openModal('edit', item)"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                @click="openModal('delete', item)"
              >
                刪除
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
      @get-pages="getOrders"
      class="py-5"
    ></Pagination>
    <!--分頁功能-->

    <!--編輯跟新增-->
    <OrdersModal
      :temporary-obj="temporaryObj"
      @update-orders="updateOrder"
      ref="ordersModal"
    ></OrdersModal>

    <!--刪除-->
    <DelOrdersModal
      :temp="temporaryObj"
      @del-item="delOrderItem"
      ref="delOrdersModal"
    ></DelOrdersModal>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import ToastMessages from '@/components/ToastMessages.vue'
import OrdersModal from '@/components/OrdersModal.vue'
import DelOrdersModal from '@/components/DelOrdersModal.vue'

export default {
  name: 'Orders',
  data () {
    return {
      orders: [], // 擺放遠端的資料用
      pagination: {}, // 分頁使用的空物件
      temporaryObj: {}, // 當下選取的物件資料用
      isLoading: false
    }
  },
  components: {
    Pagination,
    ToastMessages,
    OrdersModal,
    DelOrdersModal
  },
  methods: {
    getOrders (page = 1) {
      this.isLoading = true
      const apiUrl = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders/?page=${page}` // 用?+參數的方式,顯示每個分頁
      this.$http
        .get(apiUrl)
        .then((res) => {
          this.orders = res.data.orders // 讀取遠端data裡的products,放入空陣列products
          this.pagination = res.data.pagination // 讀取遠端data裡的pagination
          this.isLoading = false
        })
        .catch(() => {
          this.isLoading = false
        })
    },
    openModal (status, product) {
      if (status === 'edit') {
        this.isNew = false // 代表是舊的
        this.temporaryObj = JSON.parse(JSON.stringify(product)) // 深拷貝。以防傳參考，萬一被使用者修改到原來的資料
        this.$refs.ordersModal.openModal()
      } else if (status === 'delete') {
        this.temporaryObj = JSON.parse(JSON.stringify(product)) // 深拷貝。
        this.$refs.delOrdersModal.openModal()
      }
    },
    delOrderItem () {
      this.isLoading = true
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${this.temporaryObj.id}`
        )
        .then((res) => {
          this.$httpMessageState(res, '更新', '已刪除訂單')
          this.isLoading = false
          this.$refs.delOrdersModal.closeModal()
          this.getOrders()
        })
        .catch(() => {
          this.isLoading = false
          this.$httpMessageState(false, '更新', '刪除訂單失敗')
        })
    },
    updateOrder (item) {
      this.temporaryObj = item
      this.isLoading = true
      this.$http
        .put(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${this.temporaryObj.id}`,
          { data: this.temporaryObj }
        )
        .then((res) => {
          this.$httpMessageState(res, '更新', '已更新訂單')
          this.isLoading = false
          this.$refs.ordersModal.closeModal()
          this.getOrders()
        })
        .catch(() => {
          this.$httpMessageState(false, '更新', '更新訂單失敗')
          this.isLoading = false
        })
    }
  },
  mounted () {
    // 執行登入確認
    // this.checkLogin()
    this.getOrders()
  }
}
</script>
