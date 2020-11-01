<template>
  <div id="cartoon-content">
    <!-- 头部nav GO -->
    <div v-if="cartoonIf" class="details-content-nav">
      <!-- 退后区域 GO -->
      <div class="nav-back">
        <img
          src="~/assets/img/normal-top-back.png"
          style="height: 12px;line-height: 3rem; "
          alt="退后"
          @click="onClickLeft()"
        >
      </div>
      <!-- 退后区域 end -->
      <van-empty  :description="description" />
    </div>
    <!-- 头部nav end -->


    <!-- 头部nav GO -->
    <div v-else class="details-content-nav" :class="{'nav-hidden-display':hiddenDisplay == true}">
      <!-- 退后区域 GO -->
      <div class="nav-back">
        <img
          src="~/assets/img/normal-top-back.png"
          style="height: 12px;line-height: 3rem; "
          alt="退后"
          @click="onClickLeft()"
        >
      </div>
      <!-- 退后区域 end -->
      <!-- TOP name GO -->
      <div class="nav-name">{{nameList.num}}</div>
      <!-- TOP name end -->
    </div>
    <!-- 头部nav end -->
    <!-- 内容 GO -->
    <div class="cartoon-click" @click="cartoonClick()">
    <div class="cartoon-image" v-for="(item,index) in list" :key="index">
      <van-image  lazy-load :src="item.img" width="100%" height="100%"/>
    </div>
    </div>
    <!-- 内容 end -->
    <!-- 底部 GO -->
    <div class="nav-bottom" :class="{'nav-hidden-display':hiddenDisplay == true}">
      <div class="nav-bottom-box" @click="showPopup">
        <van-icon name="orders-o" size="2rem"/>
        <span>目录</span>
      </div>
    </div>
    <!-- 底部 end -->

    <!-- 弹出层 GO -->
     <van-popup v-model="show" position="bottom" :style="{height: '30%' }" >
       <ul class="popupList">
         <li v-for="(item,index) in nameList.numList" :key="index" :class="{'pink':pinkIndex === index}" @click="urlClick(item.url,item.num,index)">{{item.num}}</li>
       </ul>
     </van-popup>
     <!-- 弹出层 end -->
  </div>
</template>

<script>
import {CartoonData} from '@/api/network'
export default {
  data() {
    return {
      list: [], //内容数据
      nameList: [], //目录数据
      hiddenDisplay: true, //是否显示上下nav
      show: false, // 是否显示弹出层
      pinkIndex:0, // 当前章节高亮
      cartoonIf: false,
      description:'',
    }
  },
  mounted() {
    this.nameList = this.$route.query.list
    this.pinkIndex = this.$route.query.list.cindex
  },
  methods: {
     // 漫画内容数据的请求
    async CartoonData(url) {
      let res = await CartoonData(url)
      this.$store.commit('vuexCartoonList', res)
    },
    // 点击退回上一级
    onClickLeft() {
      this.$router.go(-1)
    },
    cartoonClick() {
       this.hiddenDisplay = !this.hiddenDisplay
    },
    showPopup() {
      this.show = true;
    },
    urlClick(url,num,index) {
      this.nameList.num = num
      this.CartoonData(url)
      this.pinkIndex = index
      console.log(index);
    }
  },
  watch: {
    '$store.state.cartoonList'(val, oldVal) {
      this.list = val.list
      console.log(val);
      if (val.code === 1) {
        this.cartoonIf = true
        this.description = val.message
      }
    },
  }
}
</script>

<style scoped>
#cartoon-content {
  padding: -4rem 0rem 0rem 0rem;
  max-width: 40rem;
  min-width: 20rem;
  margin: auto;
}
.details-content-nav {
  width: 100%;
  max-width: 40rem;
  min-width: 20rem;
  height: 3rem;
  position: fixed;
  background-color: #fff;
  z-index: 99;
  opacity: 0.8;
}
.nav-back {
  display: inline-block;
  padding: 1rem 0 0 1rem;
}
.nav-name {
  display: inline-block;
  margin-left: 1rem;
  font-size: 1.125rem;
  color: #252525;
  margin-left: 0.625rem;
  font-weight: bold;
  width: 78%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.cartoon-image {
  width: 100%;
}
div >>> .van-image__img {
  width: 100%;
  height: 100%;
}
.nav-hidden-display {
  display: none;
}
.nav-bottom {
  width: 100%;
  max-width: 40rem;
  min-width: 20rem;
  height: 3rem;
  position: fixed;
  background-color: #fff;
  z-index: 99;
  opacity: 0.8; 
  bottom: 0rem;
}
.nav-bottom-box {
  width: 5rem;
  height: 3rem;
  margin: auto;
}
div>>>.van-icon {
  line-height: 3rem;
  overflow: hidden;
  color: pink;
  opacity: 0.9;
}
div>>>.van-popup {
  background-color: black;
  opacity: 0.5;
}
.nav-bottom span {
  display: inline-block;
  overflow: hidden;
  line-height: 3rem;
  font-size: 14px;
  color: #fb7299;
  letter-spacing: 0;
  font-weight: bold;
  text-shadow: 0px 0.1875rem 0.3125rem #595959;
}
.popupList {
  color: #fff;
  background-color: rgba(0,0,0,.6);
}
.popupList li {
   padding: 1rem;
}
.pink {
  color:#fb7299;
}
</style>