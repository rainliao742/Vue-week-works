<template>
  <Loading :active="isLoading" :z-index="9999"></Loading>
  <ToastMessages></ToastMessages>
  <h2 class="text-center my-3 p-2">後台優惠券列表</h2>
  <div class="container" style="min-height: 500px">
    <div class="text-end m-4 w-100">
      <button class="btn btn-primary" @click="openModal('isNew')">
        建立新的優惠券
      </button>
    </div>
    <h3 class="text-center w-100" v-if="coupons.length == 0">目前沒有資料！</h3>
    <table class="table mt-4" v-if="coupons.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ $filters.date(item.due_date) }}</td>
          <td class="ps-5">
            <!-- ToggleSwitch -->
            <label class="switch">
              <input
                type="checkbox"
                v-model="item.is_enabled"
                @change="updateCoupon(item, false)"
                :true-value="1"
                :false-value="0"
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
    <Pagination
      :pages="pagination"
      @get-pages="getCoupons"
      class="py-5"
    ></Pagination>

    <CouponModal
      :temp="temp"
      :is-new="isNew"
      @update-coupons="updateCoupon"
      ref="couponModal"
    ></CouponModal>

    <DelCouponModal
      :temp="temp"
      @del-item="delCouponItem"
      ref="delCouponModal"
    ></DelCouponModal>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import ToastMessages from '@/components/ToastMessages.vue'
import CouponModal from '@/components/CouponModal'
import DelCouponModal from '@/components/DelCouponModal'

export default {
  name: 'Coupon',
  data () {
    return {
      isNew: false, // 預設新增的資料 值為否
      pagination: {}, // 分頁使用的空物件
      isLoading: false,
      temp: {},
      coupons: {}
    }
  },
  components: {
    Pagination,
    ToastMessages,
    CouponModal,
    DelCouponModal
  },
  methods: {
    getCoupons (page = 1) {
      this.isLoading = true
      const apiUrl = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons/?page=${page}`
      this.$http
        .get(apiUrl)
        .then((res) => {
          this.coupons = res.data.coupons
          this.pagination = res.data.pagination
          this.isLoading = false
        })
        .catch(() => {
          this.isLoading = false
        })
    },
    openModal (status, product) {
      if (status === 'isNew') {
        this.temp = {
          // 將時間格式改為 YYYY-MM-DD
          due_date: new Date().getTime() / 1000,
          is_enabled: 0
        }
        this.isNew = true
        this.$refs.couponModal.openModal()
      } else if (status === 'edit') {
        this.isNew = false
        this.temp = JSON.parse(JSON.stringify(product))
        this.$refs.couponModal.openModal()
      } else if (status === 'delete') {
        this.temp = JSON.parse(JSON.stringify(product))
        this.$refs.delCouponModal.openModal()
      }
    },
    updateCoupon (item, isNew) {
      let apiUrl = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`
      let method = 'post'
      // edit
      if (isNew === false) {
        method = 'put'
        apiUrl = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`
      }
      this.isLoading = true
      this.$http[method](apiUrl, { data: item })
        .then((res) => {
          this.isLoading = false
          this.$httpMessageState(res, '更新', '已更新優惠券')
          this.$refs.couponModal.closeModal()
          this.getCoupons()
        })
        .catch(() => {
          this.isLoading = false
          this.$httpMessageState(false, '更新', '更新優惠券失敗')
        })
    },
    delCouponItem (item) {
      this.isLoading = true
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`
        )
        .then((res) => {
          this.$httpMessageState(res, '更新', '已刪除優惠券')
          this.isLoading = false
          this.$refs.delCouponModal.closeModal()
          this.getCoupons()
        })
        .catch(() => {
          this.isLoading = false
          this.$httpMessageState(false, '更新', '刪除優惠券失敗')
        })
    }
  },
  mounted () {
    // 執行登入確認
    // this.checkLogin()
    this.getCoupons()
  }
}
</script>
