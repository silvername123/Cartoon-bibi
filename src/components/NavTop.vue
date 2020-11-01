<template>
  <!-- TOP 导航 GO -->
  <div id="nav-top" v-show="navTop">
    <!-- 左侧 GO -->
    <div class="nav-box">
      <span
        v-for="(item,index) in navList"
        :key="index"
        @click="navBox(index)"
        :class="{'click-pink':navIndex === index}"
      >{{item}}</span>
    </div>
    <!-- 左侧 end -->
    <!-- 右侧搜索 GO -->
    <div class="nav-box">
      <form action="/">
        <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
        />
      </form>
    </div>
    <!-- 右侧搜索 end -->
  </div>
  <!-- TOP 导航 end -->
</template>

<script>
import { SearchData } from '@/api/network'
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      navList: ['推荐', '分类'],
      navIndex: 0,
      value: '',
      navTop: true
    }
  },
  created() {
    this.navBox(this.navIndex)
  },
  methods: {
    // 点击跳转路由
    navBox(index) {
      this.navIndex = index
      if (index === 0) {
        this.$toast.clear();
        this.$router.push('/recommend').catch(err => err)
      } else if (index === 1) {
        this.$toast.clear();
        this.$router.push('/classify').catch(err => err)
      }
    },
    // 点击搜索或按下回车键
    onSearch(val) {
      if (val == '') {
        this.$toast("请输入内容");
      } if (val !== '') {
        this.navIndex = 3
        this.$router.push({
          path: '/search',
        }).catch(err => err)
        // 加载提示
        let toast = this.$toast.loading({
          duration: 0, // 持续展示 toast
          message: '加载中...',
          forbidClick: false,
        })
        // 请求搜索数据
        SearchData(val).then(res => {
          if (res.message == '成功!') {
            //关闭提示
            this.$toast.clear(); 
            // 传值给VUEX
            this.$store.commit('SearchList', res)
          }
          this.$toast.clear();
           this.$store.commit('SearchList', res)
           this.value = ''
        })
      }
    },
    // 点击取消
    onCancel() {
    }
  },
// 监听,当路由发生变化的时候是否显示navTop
watch: {
  $route: {
    handler: function(val, oldVal){
      if (val.name === 'details' || val.name === 'cartooncontent') {
        this.navTop = false
      }else {
        this.navTop = true
      }
    },
    // 深度观察监听
    deep: true
  }
},

}
</script>


<style scoped>
#nav-top {
  width: 100%;
  height: 3rem;
  display: flex;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  position: fixed;
  z-index: 99;
}
.nav-box {
  flex: 1;
}
.nav-box:nth-child(1) {
  display: flex;
  color: #ccc;
  justify-content: flex-end;
  word-break: keep-all; /* 不换行 */
  white-space: nowrap; /* 不换行 */
}
.nav-box:nth-child(1) span {
  flex: 1;
  line-height: 3rem;
  padding: 0 1rem 0 1rem;
  display: inline-block;
}
.click-pink {
  color: #fb7299;
}
.van-search {
  padding: 6px 12px;
}
</style>
