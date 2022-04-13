<template>
  <div
    id="couponModal"
    class="modal fade"
    ref="modal"
    tabindex="-1"
    aria-labelledby="couponModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal">
      <div class="modal-content" style="background-color: primary">
        <div class="modal-header bg-primary text-center p-3">
          <h5 id="couponModalLabel" class="modal-title text-white">
            <span>{{ isNew ? '新增' : '編輯' }}優惠券</span>
          </h5>
        </div>
        <div class="modal-body bg-white p-4">
          <div class="row">
            <div class="mb-3 col-md-12">
              <label for="title" class="form-label">名稱</label>
              <input
                id="title"
                type="text"
                min="0"
                class="form-control"
                placeholder="請輸入名稱"
                v-model.trim="tempCoupons.title"
              />
            </div>
            <div class="mb-3 col">
              <label for="code" class="form-label">優惠碼</label>
              <input
                id="code"
                type="text"
                min="0"
                class="form-control"
                placeholder="請輸入優惠碼"
                v-model.trim="tempCoupons.code"
              />
            </div>
          </div>
          <div class="row">
            <div class="mb-4 col">
              <label for="percent" class="form-label">折扣百分比</label>
              <input
                id="percent"
                type="text"
                min="0"
                class="form-control"
                placeholder="請輸入折扣百分比"
                v-model.number="tempCoupons.percent"
              />
            </div>
            <div class="mb-4 col">
              <label for="due_date" class="form-label">到期日</label>
              <input
                id="due_date"
                type="date"
                min="0"
                class="form-control"
                placeholder="到期日"
                v-model="due_date"
              />
            </div>
          </div>
          <!-- 是否啟用 -->
          <!-- ToggleSwitch -->
          <h4 class="fw-bold fs-5 mb-2">是否啟用</h4>
          <label class="switch">
            <input
              type="checkbox"
              v-model="tempCoupons.is_enabled"
              :true-value="1"
              :false-value="0"
            />
            <span class="slider"></span>
          </label>
          <!-- ToggleSwitch -->
        </div>
        <div class="modal-footer bCoupons-0 bg-white w-100">
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
            @click="$emit('update-Coupons', tempCoupons, isNew)"
          >
            {{ isNew ? '確定新增' : '確定修改' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BsModal from 'bootstrap/js/dist/modal'
export default {
  props: ['temp', 'isNew'],
  data () {
    return {
      tempCoupons: {
        title: ''
      },
      couponModal: '',
      due_date: ''
    }
  },
  watch: {
    temp: {
      // 控制器
      handler () {
        this.tempCoupons = JSON.parse(JSON.stringify(this.temp))
        const dateAndTime = new Date(this.tempCoupons.due_date * 1000)
          .toISOString().split('T')
        this.due_date = dateAndTime
      },
      // 定義是否為深層監聽
      deep: true
    },
    due_date () {
      //  Math.floor = 小於等於所給數字的最大整數。
      this.tempCoupons.due_date = Math.floor(new Date(this.due_date) / 1000)
    }
  },
  methods: {
    openModal () {
      this.couponModal.show()
    },
    closeModal () {
      this.couponModal.hide()
    }
  },
  mounted () {
    this.couponModal = new BsModal(this.$refs.modal)
  }
}
</script>
