<template>
  <div id="delModal" ref="modal" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content" style="background-color: transparent">
        <div class="modal-header bg-danger text-center p-1"></div>
        <div class="modal-body bg-white text-center">
          <div
            class="d-flex justify-content-center align-items-center w-100 mb-4"
          >
            <span class="material-icons-outlined text-danger me-3"></span>
            <h5 class="text-danger fw-bold fs-4">真的確定要刪除嗎?</h5>
          </div>
          <p>
            你即將刪除
            <span class="fw-bold text-danger"
              >{{ tempProduct.title }}
              <span v-if="tempProduct.user">
                {{ tempProduct.user?.email }}的訂單</span
              >
            </span>
          </p>
          <span>ID:{{tempProduct.id}}</span>
        </div>
        <div
          class="modal-footer border-0 bg-white w-100"
          style="flex-wrap: nowrap"
        >
          <button
            type="button"
            class="btn btn-outline-danger w-50"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-danger text-white w-50"
            @click="$emit('del-item', tempProduct)"
          >
            確定刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BsModal from 'bootstrap/js/dist/modal'
export default {
  props: ['temp'],
  data () {
    return {
      tempProduct: {
        title: '',
        user: ''
      },
      delModal: ''
    }
  },
  watch: {
    temp: {
      // 控制器
      handler () {
        this.tempProduct = JSON.parse(JSON.stringify(this.temp))
      },
      deep: true
    }
  },
  methods: {
    openModal () {
      this.delModal.show()
    },
    closeModal () {
      this.delModal.hide()
    }
  },
  mounted () {
    this.delModal = new BsModal(this.$refs.modal)
  }
}
</script>
