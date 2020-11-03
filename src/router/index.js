import Vue from 'vue'
import VueRouter from 'vue-router'

const Recommend = () => import('@/views/recommend/recommend.vue')
const Classify = () => import('@/views/classify/classify.vue')
const Search = () => import('@/views/search/search.vue')
const Details = () => import('@/views/details/details.vue')
const CartoonContent = () => import('@/views/CartoonContent/Cartooncontent.vue')
const My = () => import('@/views/my/my.vue')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: 'recommend' },
  {
    path: '/recommend', name: 'recommend', component: Recommend, meta: {
      keepAlive: true ,// 需要被缓存
      title: 'bibi漫画'
    }
  },
  {
    path: '/classify', name: 'classify', component: Classify, meta: {
      keepAlive: true, // 需要被缓存
      title: 'bibi漫画-分类'
    }
  },
  {
    path: '/search', name: 'search', component: Search, meta: {
      keepAlive: true, // 需要缓存
      title: 'bibi漫画-搜索'
    }
  },
  {
    path: '/details', name: 'details', component: Details, meta: {
      keepAlive: false, // 不需要缓存
      title: 'bibi漫画-详情'
    }
  },
  {
    path: '/cartooncontent', name: 'cartooncontent', component: CartoonContent, meta: {
      keepAlive: false, // 需要缓存
      title: '看漫画就来bibi漫画'
    }
  },
  {
    path: '/my', name: 'my', component: My, meta: {
      keepAlive: false, // 不需要缓存
      title: '我的'
    }
  }

]


const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router
