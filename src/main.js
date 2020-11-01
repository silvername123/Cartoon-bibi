import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入vant按需引入的文件
import vant from './components/vant'
Vue.use(vant)

Vue.config.productionTip = false


//main.js
let homeScrollTop = 0;
Vue.prototype.$homeScroll = homeScrollTop;


router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
