<template>
  <div id="classify">
    <!-- 左侧分类模块 GO -->
    <van-tree-select
      height="93vh"
      :items="items"
      :active-id.sync="activeIds"
      :main-active-index.sync="active"
      @click-nav="classifyClick(items[active].id,active)"
    > 
    <!-- 右侧展示模块 GO -->
      <template #content >
        <!-- if 是否显示 GO -->
        <div class="van-image-scroll"  ref="imageDa">
        <div class="van-image-da" v-show="active === active" >
          <!-- 遍历展示内容 GO -->
          <div class="van-image-box" v-for="(item,index) in list" :key="index">
            <!-- 组件懒加载 GO -->
              <!-- 展示内容 GO -->
              <van-image class="van-image1" :src="item.cover" show-error show-loading lazy-load  @click="vanImageClick(item.url)"/>
              <div class="van-ellipsis">{{item.name}}</div>
              <div class="van-ellipsis">更新至：{{item.latest}}</div>
              <!-- 展示内容 end -->
          </div>
          <!-- 遍历展示内容 end -->
        </div>    
        </div>
        <!-- if 是否显示 end -->
      </template>
      <!-- 右侧展示模块 end -->
    </van-tree-select>
    <!-- 左侧分类模块 end -->
  </div>
</template>

<script>
import {Cartoonlist} from '@/api/network.js'
export default {
  name:'classify',
  data() {
    return {
      active: 0, // 左侧分类的索引
      list:[], //分类数据,
      items: [
        { text: '热门排行',id:'hot'},
        { text: '连载中',id : 'lianzai'},
        { text: '最新更新',id:'new'},
        { text: '已完结',id :'wanjie'},
        { text: '少年热血',id:'shaonianrexue' },
        { text: '武侠格斗',id:'wuxiagedou' },
        { text: '耽美人生',id:'danmeirensheng'},
        { text: '少女爱情',id:'shaonvaiqing'},
        { text: '恋爱生活',id:'lianaishenghuo'},
        { text: '生活漫画',id:'shenghuomanhua'},
        { text: '科幻魔幻',id:'kehuanmohuan'},
        { text: '竞技体育',id:'jingjitiyu'},
        { text: '爆笑喜剧',id:'baoxiaoxiju'},
        { text: '侦探推理',id:'zhentantuili'}, 
        { text: '恐怖灵异',id:'kongbulingyi'},                      
        { text: '大陆漫画',id:'dalu'},
        { text: '日本漫画',id:' riben'},
        // { text: '韩国漫画',id:'hanguo'},
        // { text: '香港漫画',id:'xianggang'},
        // { text: '台湾漫画',id:'taiwan'},
        { text: '欧美漫画',id:'oumei'},
        { text: '其他漫画',id:'qita'},
        ],
        activeIds:1,
        iid:'hot' //数据ID
    };
  },
  mounted() {
    //发送分类请求
    this.Cartoonlist()     
  },
   //进入路由即触发 created()只触发一次
  activated (){
    //this.$nextTick()异步执行dom刷新
    this.$nextTick(() => {
        // console.log(this.$homeScroll);
        this.$refs.imageDa.scrollTo(0, this.$homeScroll);
    })
  },
  //离开路由时
  beforeRouteLeave(to, from, next){
    //全局变量homeScroll默认为0 离开页面时 记录当前的页面滚动值
    this.$homeScroll =  this.$refs.imageDa.scrollTop;
    //需要执行next函数 否则不起作用
    next(); 
  },
  methods: {
    // 
    // 网络请求
    // 
    // 请求分类数据
    Cartoonlist() {
      Cartoonlist(this.iid).then(res => {
        res.list.shift()
        this.list = res.list
      })
    },
    // 点击切换分类
    classifyClick(id,active) {
      this.iid = id
      this.active = active
      this.Cartoonlist()
    },
    // 点击进入详情内容
    vanImageClick(url) {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '加载中...',
        forbidClick: false,
      });
      this.$router.push('/details')
      this.$store.dispatch('DetailsData',url)
    },
  }
}
</script>

<style scoped>
#classify {
  padding: 3rem 0rem 1rem 0rem;
}
.van-tree-select {
  margin-top: 0rem;
}
.van-tree-select__nav {
  max-width: 6.7rem;
  min-width: 6rem;
}
.van-tree-select__content {
  min-width: 10rem;
}
.van-image-scroll {
  height: 93vh;
  overflow-y: auto;
}
.van-image-da {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.van-image-box {
  flex: 0 0 1;
  min-width: 7rem;
  width: 8.125rem;
  height: 15rem;
  margin-top: 1rem;
  text-align: center;
}
.van-image1 {
    width: 7rem;
    height: 12rem;
}
.van-ellipsis {
  width: 7rem;
  font-size: 1rem;
   margin: 0.5rem 0px 0px 0.5rem;
}
.van-ellipsis:nth-child(3) {
  font-size: 12px;
  color: #ccc;
  text-align: left;
}


.footer .gotop {
  text-align: center;
  position: fixed;
  right: 3.125rem;
  bottom: 1.875rem;
  cursor: pointer;
  padding: 0.625rem;
  border-radius: 50%;
  background: white;
  color: #000000;
}
</style>