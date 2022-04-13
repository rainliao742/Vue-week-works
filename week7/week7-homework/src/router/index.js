import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    component: () => import('../views/user/FrontView.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/user/HomeView.vue'),
        meta: {
          title: '繁果藝術中心',
          requiresAuth: true
        }
      },
      {
        path: '/products',
        name: 'Products',
        component: () => import('../views/user/ProductsView.vue'),
        meta: {
          title: '藝廊::繁果藝術中心',
          requiresAuth: true
        }
      },
      {
        path: '/product/:id',
        name: 'Product',
        component: () => import('../views/user/ProductView.vue'),
        meta: {
          title: '藝廊內頁::繁果藝術中心',
          requiresAuth: true
        }
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('../views/user/AboutView.vue'),
        meta: {
          title: '關於::繁果藝術中心',
          requiresAuth: true
        }
      },
      {
        path: '/news-list',
        name: 'News',
        component: () => import('../views/user/NewsLists.vue'),
        meta: {
          title: '最新消息::繁果藝術中心',
          requiresAuth: true
        }
      },
      {
        path: '/user-cart',
        name: 'Cart',
        component: () => import('../views/user/UserCart.vue'),
        meta: {
          title: '購物車::繁果藝術中心',
          requiresAuth: true
        }
      },
      {
        path: '/user-check',
        name: 'Check',
        component: () => import('../views/user/UserCheckout.vue'),
        meta: {
          title: '確認訂單::繁果藝術中心',
          requiresAuth: true
        }
      },
      {
        path: '/user-success/:id',
        name: 'Success',
        component: () => import('../views/user/UserSuccess.vue'),
        meta: {
          title: '完成訂單::繁果藝術中心',
          requiresAuth: true
        }
      },
      // login
      {
        path: '/login',
        name: 'Login',
        component: () => import('../views/user/AdminLogin.vue'),
        meta: {
          title: '後台登入::繁果藝術中心',
          requiresAuth: true
        }
      }
    ]
  },

  {
    path: '/admin',
    component: () => import('../views/admin/DashboardView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/admin/AdminProducts.vue'),
        meta: {
          title: '後台商品管理::繁果藝術中心',
          requiresAuth: true
        }
      },
      {
        path: 'coupon',
        component: () => import('../views/admin/AdminCoupon.vue'),
        meta: {
          title: '後台優惠券管理::繁果藝術中心',
          requiresAuth: true
        }
      },
      {
        path: 'orders',
        component: () => import('../views/admin/AdminOrders.vue'),
        meta: {
          title: '後台訂單管理::繁果藝術中心',
          requiresAuth: true
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
  scrollBehavior (to, from, savedPosition) {
    return {
      top: 0,
      behavior: 'smooth'
    }
  }
})
// meta命名
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  next()
})
export default router
