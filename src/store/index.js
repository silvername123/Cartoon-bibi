import Vue from 'vue'
import Vuex from 'vuex'

import {DetailsData,CartoonData} from '@/api/network'
Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    clist:[],
    detailsList:[],
    navTop:true,
    cartoonList:[],
  },
  mutations: {
    // 搜索数据
    SearchList(state,list) {
      state.clist = list
    },
    // 详情数据
    vuexDetails(state, step) {
       state.detailsList = step
    },
    vuexNavTop(state,step) {
      state.navTop = step
    },
    // 漫画内容数据
    vuexCartoonList(state,step) {
      state.cartoonList = step
    },
  },
  actions: {
    // 详情数据的请求
    async DetailsData(context, step) {
      let res = await DetailsData(step)
      context.commit('vuexDetails', res)
    }
  },

  modules: {
  }
})
