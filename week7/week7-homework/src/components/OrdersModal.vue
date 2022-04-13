<template>
  <div
    id="ordersModal"
    class="modal fade"
    ref="modal"
    tabindex="-1"
    aria-labelledby="ordersModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal" style="max-width:1200px">
      <div class="modal-content" style="background-color: primary">
        <div class="modal-header bg-primary text-center p-3">
          <h5 id="ordersModalLabel" class="modal-title text-white">
            <span>訂單編號 : {{ tempOrder.id }}</span>
          </h5>
        </div>
        <div class="modal-body bg-white text-center px-5 py-2">
          <div class="row">
            <div class="col-12">
              <div class="position-sticky top-15">
                <div
                  class="d-flex justify-content-start align-items-center bg-light"
                >
                  <p class=" text-primary fw-bold fs-3 p-3 mb-0">
                  用戶資訊
                  </p>
                  <div class="d-flex">
                    <span
                      class="text-secondary fw-bold ms-4 me-2"
                      v-if="tempOrder.is_paid"
                      >已付款</span
                    >
                    <span class="text-secondary fw-bold ms-4 me-2" v-else
                      >未付款</span
                    >
                    <!-- ToggleSwitch -->
                    <label class="switch">
                      <input type="checkbox" v-model="tempOrder.is_paid" />
                      <span class="slider"></span>
                    </label>
                    <!-- ToggleSwitch -->
                  </div>
                </div>
                <!-- 訂單資料 -->
                <table class="table table-sm">
                  <tbody>
                    <tr class="text-start">
                      <th class="text-secondaryDark" scope="row">下單時間</th>
                      <td class="text-secondaryDark">
                        {{ this.$filters.date(tempOrder.create_at) }}
                      </td>
                    </tr>
                    <tr class="text-start">
                      <th class="text-secondaryDark" scope="row">Email</th>
                      <td class="text-secondaryDark">
                        {{ tempOrder.user?.email }}
                      </td>
                    </tr>
                    <tr class="text-start">
                      <th class="text-secondaryDark" scope="row">收件人姓名</th>
                      <td class="text-secondaryDark">
                        {{ tempOrder.user?.name }}
                      </td>
                    </tr>
                    <tr class="text-start">
                      <th class="text-secondaryDark" scope="row">電話號碼</th>
                      <td class="text-secondaryDark">
                        {{ tempOrder.user?.tel }}
                      </td>
                    </tr>
                    <tr class="text-start">
                      <th class="text-secondaryDark" scope="row">收件地址</th>
                      <td class="text-secondaryDark">
                        {{ tempOrder.user?.address }}
                      </td>
                    </tr>
                    <tr class="text-start" v-if="tempOrder.user?.payment">
                      <th class="text-secondaryDark" scope="row">付款方式</th>
                      <td class="text-secondaryDark">
                        {{ tempOrder.user?.payment }}
                      </td>
                    </tr>
                    <tr class="text-start" v-if="tempOrder.message">
                      <th class="text-secondaryDark" scope="row">備註</th>
                      <td class="text-secondaryDark">
                        {{ tempOrder.message }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="col-12">
              <div class="d-flex py-2 mt-2 bg-light">
                <p class=" text-primary fw-bold fs-3  p-3 mb-0">訂單內容</p>
              </div>
              <ul style="padding-left:0; overflow-x:auto;" class="d-flex flex-wrap" >
                <li
                  class="d-flex  justify-content-between align-items-center py-2 me-4 col-md-3"
                  v-for="item in tempOrder.products"
                  :key="item.id"
                >
                  <div class="d-flex align-items-center">
                    <img
                      class="ratio ratio-3x4 rounded-4 me-4"
                      :src="item.product.imageUrl"
                      :alt="item.product.title"
                      style="width: 150px"
                    />
                    <div class="cart-body text-start">
                      <p class="fw-bold">{{ item.product.title }}</p>
                      <p class="fw-bold">{{ item.product.author }}</p>
                      <p class="fw-bold text-primaryDark">
                        NT$ {{ item.product.price }}
                      </p>
                    </div>
                  </div>
                  <p class="text-danger fs-5 fw-bold">x {{ item.qty }}</p>
                </li>
                <p class="fs-4 fw-bold text-end w-100">
                  總計金額:NT${{ Math.round(tempOrder.total) }}
                </p>
              </ul>
            </div>
          </div>
        </div>
        <div
          class="modal-footer border-0 bg-white w-100"
          style="flex-wrap: nowrap"
        >
          <button
            type="button"
            class="btn btn-outline-primary"
            data-bs-dismiss="modal"
            @click="closeModal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary text-white"
            @click="$emit('update-orders', tempOrder)"
          >
            修改付款狀態
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BsModal from 'bootstrap/js/dist/modal'
export default {
  props: ['temporaryObj'],
  data () {
    return {
      tempOrder: []
    }
  },
  watch: {
    temporaryObj: {
      // 控制器
      handler () {
        this.tempOrder = JSON.parse(JSON.stringify(this.temporaryObj))
      },
      deep: true
    }
  },
  methods: {
    openModal () {
      this.ordersModal.show()
    },
    closeModal () {
      this.ordersModal.hide()
    }
  },
  mounted () {
    this.ordersModal = new BsModal(this.$refs.modal)
  }
}
</script>
