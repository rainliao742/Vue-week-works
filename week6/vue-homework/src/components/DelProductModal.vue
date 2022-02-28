<template>
  <div
    id="delProductModal"
    ref="delProductModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
  >
  <div class="modal-dialog">
    <div class="modal-content border-0">
      <div class="modal-header bg-danger text-white">
        <h5 id="delProductModalLabel" class="modal-title">
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
        <button type="button" class="btn btn-danger" @click="delProduct">
          確認刪除
        </button>
      </div>
    </div>
  </div>
  </div>
</template>
<script>

/* global bootstrap */
// import Modal from 'bootstrap/js/dist/modal'

export let delProductModal = null
export default {
  props: ['temporaryObj'],
  methods: {
    delProduct () {
      this.$http.delete(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.temporaryObj.id}`)
        .then((res) => {
          delProductModal.hide() // 關閉互動視窗
          this.$emit('get-products') // 重新取得產品列表
          setTimeout(() => {
            alert(res.data.message)
          }, 2000)
        })
        .catch((error) => {
          // 錯誤訊息
          delProductModal.hide()
          alert(error.data.message)
        })
    }
  },
  mounted () {
    delProductModal = new bootstrap.Modal(document.getElementById('productModal'),
      {
        keyboard: false
      })
  }

}
</script>
