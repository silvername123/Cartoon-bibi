// 自动按需引入 Vant 组件
import { Field, Button, List, Card, Cell, CellGroup, Image as VanImage,PullRefresh,Skeleton,Lazyload,TreeSelect,Search,Toast,NavBar, Loading,Icon,Empty,Popup } from 'vant'

let vantUIs = [Field, Button, List, Card, Cell, CellGroup,VanImage,PullRefresh,Skeleton,TreeSelect,Search,Toast,NavBar, Loading,Icon,Empty,Popup]
export default {
  install(Vue) {
    vantUIs.forEach(vantUI => {
      Vue.component(vantUI.name, vantUI)
      Vue.use(vantUI)    // 也可以使用 Vue.use()
      Vue.use(Lazyload, {
        lazyComponent: true,
      });
    })
  }
}