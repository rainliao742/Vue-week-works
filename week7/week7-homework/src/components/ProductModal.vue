<template>
  <div
    id="productModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span>{{ isNew ? '新增' : '編輯' }}產品</span>
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
              <div class="d-flex flex-column align-items-center mb-2">
                <h4 class="mb-3">上傳圖片</h4>
                <form
                  class="d-flex align-items-center mb-2"
                  action="/api/rainliao/admin/upload"
                  enctype="multipart/form-data"
                  method="post"
                >
                  <label
                    class="btn btn-outline-success me-2"
                    @change="chooseImg"
                  >
                    <div class="overflow-hidden position-relative">
                      <i class="fa-solid fa-cloud-arrow-up me-2"></i>
                      <span>選擇圖片</span>
                      <input
                        class="position-absolute start-0"
                        ref="fileInput"
                        type="file"
                        name="file-to-upload"
                        style="opacity: 0"
                      />
                    </div>
                  </label>
                  <label
                    class="btn btn-success btn-sm rounded-circle me-2"
                    @click.prevent="upload"
                  >
                    <div class="overflow-hidden position-relative">
                      <i class="fa-solid fa-circle-plus"></i>
                      <input
                        class="position-absolute start-0"
                        type="submit"
                        value="Upload"
                        style="opacity: 0"
                      />
                    </div>
                  </label>
                </form>
                <img
                  :src="temProduct.imgPreviewURL"
                  alt=""
                  ref="imgPreview"
                  style="width: 300px"
                />
              </div>
              <div class="mb-3">
                <h4>產品主圖</h4>
                <!-- <label for="imageUrl" class="form-label">輸入圖片網址</label> -->
                <input
                  type="text"
                  class="form-control mb-2"
                  v-model="temProduct.imageUrl"
                  placeholder="請輸入圖片連結"
                />
                <img
                  class="img-fluid w-100"
                  :src="temProduct.imageUrl"
                  style="height: 200px; object-fit: cover"
                />
              </div>

              <div>
                <!-- 判斷是否是陣列 -->
                <div v-if="Array.isArray(temProduct.imagesUrl)">
                  <h4>其他產品圖片</h4>
                  <template
                    v-for="(img, key) in temProduct.imagesUrl"
                    :key="key"
                  >
                    <input
                      type="text"
                      class="form-control"
                      v-model="temProduct.imagesUrl[key]"
                    />
                    <img
                      class="img-fluid my-2 w-100"
                      :src="temProduct.imagesUrl[key]"
                      alt=""
                      style="height: 200px; object-fit: cover"
                    />
                  </template>
                  <!-- 1.判斷是否有沒有圖片網址 2. 判斷 imagesUrl 的陣列的特定索引位置有沒有文字-->
                  <button
                    v-if="
                      !temProduct.imagesUrl.length ||
                      temProduct.imagesUrl[temProduct.imagesUrl.length - 1]
                    "
                    class="btn btn-primary btn-sm d-block w-100"
                    @click="temProduct.imagesUrl.push('')"
                  >
                    新增圖片
                  </button>
                  <button
                    v-else
                    class="btn btn-outline-danger btn-sm d-block w-100"
                    @click="temProduct.imagesUrl.pop('')"
                  >
                    刪除最後一張圖片
                  </button>
                </div>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  id="title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                  v-model="temProduct.title"
                />
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    id="category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                    v-model="temProduct.category"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input
                    id="unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                    v-model="temProduct.unit"
                  />
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    id="origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入原價"
                    v-model="temProduct.origin_price"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                    v-model="temProduct.price"
                  />
                </div>
              </div>
              <hr />

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                  v-model="temProduct.description"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                  v-model="temProduct.content"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    id="is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    v-model="temProduct.is_enabled"
                  />
                  <label class="form-check-label" for="is_enabled"
                    >是否啟用</label
                  >
                </div>
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
          <button type="button" class="btn btn-primary" @click="updateProduct">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BsModal from 'bootstrap/js/dist/modal'
export default {
  props: ['temporaryObj', 'is-new'],
  data () {
    return {
      temProduct: {
        imagesUrl: [],
        imgPreviewURL: ''
      },
      productModal: ''
    }
  },
  // 在這裡設監聽的原因 : 因為外層的temp資料要觸發openModal事件，temp才會有資料。
  // 如果我們直接在mounted 裡面 把 this.temProduct 用深拷貝複製 props進來的 temp資料，
  // this.temProduct會呈現空值，因為它拷貝到的是我們觸發openModal事件前的狀態。
  // 因此我們可以在子元件內設監聽，一旦外層觸發openModal，子元件內的temp資料有了變化，
  // 就執行this.temProduct = JSON.parse(JSON.stringify(this.temp))
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
    updateProduct () {
      let apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`
      let method = 'post'
      // 如果是編輯狀態
      if (!this.isNew) {
        apiUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.temProduct.id}`
        method = 'put'
      }
      this.$http[method](apiUrl, { data: this.temProduct }).then((res) => {
        this.$emit('get-product')
        this.productModal.hide()
      })
    },
    // 圖片預覽效果
    chooseImg (e) {
      const [file] = e.target.files
      this.temProduct.imgPreviewURL = window.URL.createObjectURL(file)
    },
    // 圖片上傳
    upload () {
      const file = this.$refs.fileInput.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', file)
      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload`,
          formData
        )
        .then((res) => {
          alert('圖片已成功上傳')
          this.temProduct.imagesUrl.push(res.data.imageUrl)
          this.temProduct.imgPreviewURL = ''
        })
    },
    openModal () {
      this.productModal.show()
    },
    closeModal () {
      this.productModal.hide()
    }
  },
  mounted () {
    this.productModal = new BsModal(this.$refs.modal)
  }
}
</script>
