<template>
  <div
    id="delModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delModalLabel" class="modal-title">
            <span>刪除產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ temporaryObj.title }}</strong>
          商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="$emit('del-item')"
          >
            確認刪除
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
      temProduct: {},
      delModal: ''
    }
  },
  watch: {
    temporaryObj: {
      // 控制器
      handler () {
        // 解決單向數據流的綁定問題，就是淺/深拷貝並指定一個新變數
        this.temProduct = JSON.parse(JSON.stringify(this.temporaryObj))
      },
      // 定義是否為深層監聽
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
