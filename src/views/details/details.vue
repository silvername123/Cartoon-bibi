<template>
  <div v-if="descriptionIf" style="margin-top: 1rem;">
    <!-- 头部nav GO -->
    <div class="details-content-nav">
      <!-- 退后区域 GO -->
      <div class="nav-back">
        <img src="~/assets/img/normal-top-back.png" style="height: 12px;line-height: 3rem; " alt="退后" @click="onClickLeft()">
      </div>
      <!-- 退后区域 end -->
    </div>
    <!-- 头部nav end -->
    <van-empty  :description="description" />
  </div> 

  <div v-else id="details" >
    <div  class="details-scroll">
      <div class="details-content">
        <!-- 头部nav GO -->
        <div class="details-content-nav">
          <!-- 退后区域 GO -->
          <div class="nav-back">
            <img src="~/assets/img/normal-top-back.png" style="height: 12px;line-height: 3rem;" alt="退后" @click="onClickLeft()">
          </div>
          <!-- 退后区域 end -->
          <!-- TOP name GO -->
          <div class="nav-name">{{iData.name}}</div>
          <!-- TOP name end -->
          <!-- <div class="nav-name1">...</div> -->
        </div>
        <!-- 头部nav end -->
        <!-- BOX模块区域 GO -->
        <div class="details-content-img-box">
          <!-- 模糊图片区域 GO -->
          <div  class="details-content-image">
            <img :src="iData.cover" alt="">   
          </div>
          <!-- 模糊图片区域 end -->
          <!-- 小图片 GO -->
          <div class="details-content-image2">
            <van-image :src="iData.cover" alt="" width="7rem" height="9rem"/>
          </div>
          <!-- 小图片 end -->
          <!-- 简介区域 GO -->
          <div class="details-content-span">
            <span>{{iData.name}}</span>
            <p>{{iData.author}}</p>
            <p>{{iData.status}}</p>
            <!-- <p>{{iData.tag}}</p> -->
            <p>{{iData.time}}</p>
          </div>
          <!-- 简介区域 GO -->
        </div>
      <!-- BOX模块区域 end --> 
      <!-- 介绍模块区域 GO -->
      <div class="introduce">
        <p>
          {{iData.introduce}}
        </p>
      </div>
       <!-- 介绍模块区域 end-->
       <!-- 灰色隔行 GO -->
      <div class="gray">
          <van-button type="warning" @click="collectClick()">收藏</van-button>
      </div>
       <!-- 灰色隔行 end -->

      <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o">
        内容目录基于这里的正倒序！！！
      </van-notice-bar>
      <!-- 目录模块区域 GO -->
      <div class="catalog">
        <!-- 正 倒序 GO -->
        <div class="catalog-order" @click="orderClick()">
          <van-icon class="catalog-icon" :name="icon" />
          <span>{{order}}</span>
        </div>
        <!-- 正 倒序 end -->
       <ul>
          <li v-for="(item,index) in list" :key="index" @click="numClick(item.url,item.num,index)">{{item.num}}</li>
       </ul>
      </div>
      <!-- 目录模块区域 end -->
    </div>
  </div>
  </div>
</template>

<script>
import {CartoonData} from '@/api/network'
import {DetailsData} from '@/api/network'

export default {
  data () {
    return {
      list:[],  //目录数据
      iData:[],  //简介数据
      icon:'ascending',
      order:'正序',
      iVal:null,
      description:'',
      descriptionIf:false,
      loadingIf:null,
      myList:[]
    }
  },
  mounted() {
    this.DetailsData()
  },
  methods: {
      // 详情数据的请求
    async DetailsData() {
      let res = await DetailsData(this.$route.query.url)
      this.iData = res.data
      this.list = res.list
      this.iVal = res.code
      // 关闭提示
      this.$toast.clear();
      if(this.iVal== 1) {
        this.description = res.message
        this.descriptionIf = true
      } else if(this.iVal === 0) {
        this.descriptionIf = false
      }
      this.$store.commit('vuexNavTop',false)
    },
    // 点击退回上一级
    onClickLeft() {
      this.$router.go(-1)
    },
    // 点击切换 正 倒序
    orderClick() {
      let orderList = this.list.reverse()
      this.list = orderList  
      if (this.icon === 'ascending') {
        this.icon = 'descending',
        this.order = '倒序'
      } else {
        this.icon = 'ascending',
        this.order = '正序'
      }
    },
  
    // 点击章节进入漫画内容
    numClick(url,num,index) {
      let list  =JSON.stringify({num:num,numList:this.list,cindex:index})
      this.$router.push({path:'/cartooncontent', query:{url:url, list}})
    },
    //点击收藏
    collectClick() {
      let get = JSON.parse(window.localStorage.getItem('myList'))
      this.myList =  get
      this.myList.push(this.$route.query.collect)
      window.localStorage.setItem('myList', JSON.stringify(this.myList))
      this.$toast({
         position: 'top',
        forbidClick: false,
        message: '收藏成功',
      });      
    }
  },

  watch: {
    // 监听搜索内容的变化并赋值
    // '$store.state.detailsList'(val, oldVal) {
    //   this.list = val.list
    //   this.iData = val.data
    //   this.iVal = val.code
    //   // 关闭提示
    //    this.$toast.clear();
    //   if(this.iVal== 1) {
    //   this.description = val.message
    //   this.descriptionIf = true
    //   } else if(this.iVal === 0) {
    //    this.descriptionIf = false
    //   }
    //   this.$store.commit('vuexNavTop',false)
    // }
  }
}
</script>

<style scoped>
#details {
  overflow: hidden;
  font-size: 2rem;
  max-width: 30rem;
  min-width: 20rem;
  margin: auto;
}
.details-scroll {
  height: 100%;
}
.details-content {
  height: 100%;
  overflow: hidden;
}
.details-content-nav {
  width: 100%;
  max-width: 30rem;
  min-width: 20rem;
  height: 3rem;
  position: fixed;
  background-color: #fff;
  z-index: 99;
}
.nav-back {
  display: inline-block;
  padding-left: 1rem;
}
.nav-name {
  display: inline-block;
  margin-left: 1rem;
  font-size: 1.125rem;
  color: #252525;
  margin-left: 0.625rem;
  font-weight: bold;
  width: 68%;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.nav-name1 {
  display: inline-block;
  position: absolute;
  right: 1rem;
  line-height: 2rem;
}
.details-content-img-box {
  height: 10rem;
  margin: 3rem 0 0 0;   
  position: relative;
}
.details-content-span {
  position: absolute;
  top: 0.625rem;
  left: 10rem;
}
.details-content-image img {
  width: 100%;
  height: 10rem;
  -webkit-filter: blur(15px); /* Chrome, Opera */
  -moz-filter: blur(15px);
  -ms-filter: blur(15px);    
  filter: blur(15px);
}
.details-content-image2 {
  width: 7rem;
  height: 9rem;
  position: absolute;
  top: 1rem;
  left: 1rem;
  border-radius: 10%;
  overflow: hidden;
}
.details-content-image2 .van-image__img{
  width: 100%;
  height: 100%;
}
.details-content-img-box span {
  font-size: 1.25rem;
  color: #ffffff;
  letter-spacing: 0;
  font-weight: bold;
  margin-top: 1.75rem;
  text-shadow: 0px 0.1875rem 0.3125rem #595959;
  display: inline-block;
  width: 90%;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.details-content-img-box p {
  font-size: 0.75rem;
  color: #ffffff;
  letter-spacing: 0;
  line-height: 1.0625rem;
  margin-top: 0.4375rem;
  text-shadow: 0px 0.1875rem 0.3125rem #595959;
}
.gray {
  position: relative;
  width: 100%;
  height: 2rem;
  background-color:#ff976a;
  margin-bottom: 4rem;
}
div>>>.van-button--normal {
    font-size: 12px;
    position: absolute;
    right: 1rem;
    height: 2rem;
}
.van-notice-bar {
  top: -5px;
}
.introduce {
    font-size: 0.9375rem;
    color: #666666;
    letter-spacing: 0;
    padding: 0.625rem;
    background-color: #fff;
    border-bottom: 0.0625rem solid #f4f4f4
}
.catalog {
  position: relative;
}
.catalog-order {
  width: 5rem;
  height: 3rem;
  position: absolute;
  top: -3rem;
  right: 0rem;
}
.catalog-order span {
  position: absolute;
  display: inline-block;
  color: #999999;
  font-size: 0.75rem;
  line-height: 3rem;
}
.catalog-icon {
  color: #999999;
  line-height: 3rem;
}
.catalog ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-bottom: 0px;
  height: 100%;
  overflow: scroll;
  font-size: 1rem;
}
.catalog li {
    flex: 0 0 30%;
    position: relative;
    display: block;
    text-align: center;
    background: #F6F6F6;
    border: 1px solid #F4F4F4;
    margin: 5px;
    font-size: 14px;
    color: #252525;
    letter-spacing: 0;
    line-height: 36px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    
}
</style>