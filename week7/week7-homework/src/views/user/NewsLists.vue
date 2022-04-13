<template>
  <div class="container">
    <Loading :active="isLoading" :z-index="9999"></Loading>
    <ToastMessages></ToastMessages>
    <h3 class="text-center p-5">news lists = articles</h3>
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
  </div>
</template>

<script>
import ToastMessages from '@/components/ToastMessages.vue'

export default {
  name: '最新消息',
  data () {
    return {
      isLoading: false
    }
  },
  components: {
    ToastMessages
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
    this.getOrders()
  }
}
</script>
