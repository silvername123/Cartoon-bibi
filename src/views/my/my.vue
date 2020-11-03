<template>
  <div id="my">
    <div class="myCollect " v-for="(item,index) in list" :key="index">
      <van-swipe-cell>
        <van-card @click="cardClick(item.list.url)"   :desc="item.list.latest" :title="item.list.name" class="goods-card" :thumb="item.list.cover"/>
        <template #right>
          <van-button @click="errClick(index)" square text="删除" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list:[],
      ii:[]
    }
  },
  mounted(){
    let mlist = JSON.parse(window.localStorage.getItem('myList'))
    let sole= this.deteleObject(mlist) 
    this.list = sole
  },
  methods: {
    // 删除
    errClick(index) {
      this.list.splice(index,1)
      localStorage.setItem('myList', this.list)
    },
    // 点击进去详情
    cardClick(url,index) {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '加载中...',
        forbidClick: false,
      });
       this.$router.push({path:'/details',query:{url:url,collect:{list:this.list[index]}}})
    },
    // 去除数组中重复的对象
    deteleObject(obj) {
      var uniques = [];
      var stringify = {};
      for (var i = 0; i < obj.length; i++) {
        var keys = Object.keys(obj[i]);
        keys.sort(function(a, b) {
          return (Number(a) - Number(b));
        });
        var str = '';
        for (var j = 0; j < keys.length; j++) {
          str += JSON.stringify(keys[j]);
          str += JSON.stringify(obj[i][keys[j]]);
        }
        if (!stringify.hasOwnProperty(str)) {
          uniques.push(obj[i]);
          stringify[str] = true;
        }
      }
      uniques = uniques;
      return uniques;
    }
  },
}
</script>

<style scoped>
#my {
  padding: 3rem 0rem 1rem 0rem;
}
  .goods-card {
    margin: 0;
    background-color: rgb(248, 248, 248);
  }

  .delete-button {
    height: 100%;
  }
  .myCollect {
    margin: 1rem 0 0 0;
  }
</style>