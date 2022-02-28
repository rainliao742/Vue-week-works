<template>
  <div
    id="productModal"
    ref="productModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span v-if="isNew">新增產品</span>
            <!--判斷新增顯示-->
            <span v-else>編輯產品</span>
            <!--判斷編輯-->
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="imageUrl" class="form-label">主要圖片</label>
                <input
                  :value="temporaryObj.imageUrl"
                  type="text"
                  class="form-control mb-2"
                  placeholder="請輸入圖片連結"
                />
                <img
                  class="img-fluid"
                  :src="temporaryObj.imageUrl"
                /><!--把圖片綁上-->
              </div>
              <h3 class="mb-3">多圖新增</h3>
              <div v-if="Array.isArray(temporaryObj.imagesUrl)">
                <!--確保是陣列行別-->
                <div
                  class="mb-1"
                  v-for="(image, key) in temporaryObj.imagesUrl"
                  :key="key + 45678"
                >
                  <!--key唯一值加上個別的數字串-->
                  <div class="mb-3">
                    <label for="imageUrl" class="form-label">圖片網址</label>
                    <input
                      :value="temporaryObj.imagesUrl[key]"
                      type="text"
                      class="form-control"
                      placeholder="請輸入圖片連結"
                    />
                  </div>
                  <img class="img-fluid" :src="image" />
                </div>
                <div
                  v-if="
                    !temporaryObj.imagesUrl.length ||
                    temporaryObj.imagesUrl[temporaryObj.imagesUrl.length - 1]
                  "
                >
                  <!--假設圖片陣列內都沒有東西或者是特定內容有沒有輸入文字-->
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="$emit('temporaryObj',this.imagesUrl.push(''))"
                  >
                    <!--增加一筆到陣列內-->
                    新增圖片
                  </button>
                </div>
                <div v-else>
                  <button
                    class="btn btn-outline-danger btn-sm d-block w-100"
                    @click="$emit('temporaryObj',this.imagesUrl.pop(''))"
                  >
                    <!--減少一筆到陣列內-->
                    刪除圖片
                  </button>
                </div>
              </div>
              <div v-else>
                <button
                  class="btn btn-outline-primary btn-sm d-block w-100"
                  @click="createImages"
                >
                  新增圖片
                </button>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  id="title"
                  :value="temporaryObj.title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                />
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    id="category"
                    :value="temporaryObj.category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input
                    id="unit"
                    :value="temporaryObj.unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                  />
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    id="origin_price"
                    :number="temporaryObj.origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入原價"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    id="price"
                    :number="temporaryObj.price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                  />
                </div>
              </div>
              <hr />

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  id="description"
                  :value="temporaryObj.description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  id="description"
                  :value="temporaryObj.content"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    id="is_enabled"
                    :value="temporaryObj.is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                  />
                  <label class="form-check-label" for="is_enabled"
                    >是否啟用</label
                  >
                </div>
              </div>
            </div>
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
              class="btn btn-primary"
              @click="updateProduct"
            >
              <!--更新產品資料-->
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

/* global bootstrap */
// import Modal from 'bootstrap/js/dist/modal'

export let productModal = null
export default {
  props: ['temporaryObj', 'isNew'],
  data () {
    return {
      products: [] // 擺放遠端的資料用
      // temporaryObj: {
      //   imagesUrl: [] // 放入多圖上傳用
      // } // 當下選取的物件資料用
    }
  },
  methods: {
    updateProduct () {
      // 新增與編輯共用
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      let method = 'post' // 新增資料使用post
      if (!this.isNew) {
        // 假設不是新的一筆,就顯示編輯用的URL跟method
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.temporaryObj.id}` // 編輯要帶入該品項的id
        method = 'put' // 編輯資料使用put
      }
      this.$http[method](url, { data: this.temporaryObj }) // 用中括號的方式帶入method的變數
        .then((res) => {
          // this.getProducts(); <= 外層使用的getProducts(更新頁面資料)方法,不能在內層使用
          this.$emit('get-products')
          productModal.hide()
          setTimeout(() => {
            alert(res.data.message)
          }, 2000)
        })
        .catch((error) => {
          // 錯誤訊息
          alert(error.data.message)
          productModal.hide()
        })
    },
    createImages () {
      this.products.imagesUrl = []
      this.products.imagesUrl.push('')
    }
  },
  mounted () {
    productModal = new bootstrap.Modal(document.getElementById('productModal'),
      {
        keyboard: false
      })
  }
}
</script>
