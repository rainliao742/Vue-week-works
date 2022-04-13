export default {
  data () {
    return {
      favorite: JSON.parse(localStorage.getItem('favorite')) || [],
      favoriteId: JSON.parse(localStorage.getItem('favoriteId')) || []
    }
  },
  watch: {
    // 用locolstorage自訂欄位並存取資料
    favorite: {
      handler () {
        // localStorage只接受字串
        localStorage.setItem('favorite', JSON.stringify(this.favorite))
      },
      deep: true
    },
    favoriteId: {
      handler () {
        localStorage.setItem('favoriteId', JSON.stringify(this.favoriteId))
      },
      deep: true
    }
  },
  methods: {
    toggleFavorite (product) {
      const favoriteIndex = this.favorite.findIndex(
        (item) => item.id === product.id
      )
      if (favoriteIndex === -1) {
        this.favorite.push(product)
        this.favoriteId.push(product.id)
        this.$httpMessageState(true, '收藏', '已成功收藏')
      } else {
        this.favorite.splice(favoriteIndex, 1)
        this.favoriteId.splice(favoriteIndex, 1)
        this.$httpMessageState(false, '收藏', '已取消收藏')
      }
    }
  }
}
