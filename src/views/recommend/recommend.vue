<template>
  <div id="recommend">
    <!-- 列表 GO -->
    <van-list class="van-lists1" v-model="loading" :finished="finished" finished-text="没有更多了">
      <div ref="vanlist" >
      <van-cell-group  class="van-cell-group1" v-for="(item,index) in list" :key="index" >
        <!-- 图片 GO -->
        <lazy-component>
        <div class="image-img">
          <van-image class="imgg1" fit="contain" width="15rem" height="20rem"  :src="item.cover" show-error show-loading lazy-load @click="vanimageClick(item.url)" />
        </div>
        <!-- 图片end -->
      <!-- name GO -->
      <van-cell class="van-cell1" :title="item.name" size="large" :label="item.tag" />
      <!-- neme end -->
      </lazy-component>
      </van-cell-group>
      </div>
    </van-list>
    <!-- 列表 end -->
  </div>
</template>

<script>
import { RecommendData } from '@/api/network.js'
export default {
  name:'recommend',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
    };
  },
  created() {
    this.RecommendData()
  },
   //进入路由即触发 created()只触发一次
  activated (){
    //this.$nextTick()异步执行dom刷新
    this.$nextTick(() => {
        // console.log(this.$homeScroll);
        window.scrollTo(0, this.$homeScroll);
    })
  },
  //离开路由时
  beforeRouteLeave(to, from, next){
    // console.log(to);
    //全局变量homeScroll默认为0 离开页面时 记录当前的页面滚动值
    this.$homeScroll = document.documentElement.scrollTop || document.body.scrollTop;
    //需要执行next函数 否则不起作用
    next(); 
  },
  methods: {
    async RecommendData() {
      let res = await RecommendData()
        this.list = res.list   
        // 加载状态结束
        this.loading = false;
        if (this.list.length >= res.list.length) {
          this.finished = true
        }
    },
    // 点击进入详情
    vanimageClick(url) {
      this.$router.push('/details')
      this.$store.dispatch('DetailsData',url)
      this.$toast.clear();
    },
  }

}
</script>

<style scoped>
#recommend {
  padding: 3rem 0rem 1rem 0rem;
  text-align: center;
  font-size: 2rem;
  max-width: 30rem;
  min-width: 20rem;
  margin: auto;
}
.van-cell-group1 {
  margin: auto;
  padding-top: 1rem;
}
.image-img1 {
  width: 30rem;
  height: 20rem;
  margin: auto;
}
.imgg1 {
  width: 80%;
  height: 100%;
  border-radius: 2%;
  overflow: hidden;
}
div.van-image__error, .van-image__img, .van-image__loading {
    margin: auto;
}
div.van-cell--large .van-cell__title {
    font-size: 1rem;
}
</style>