import { request } from './request'

// 请求推荐数据
export const RecommendData = () =>
  request({
    url: '/?mhname=都市'
  })
// 请求分类数据
export const Cartoonlist = (id) =>
  request({
    url: '/?mhlb=' + id
  })
// 请求搜索数据
export const SearchData = (id) =>
  request({
    url: '/?mhname=' + id
  })
// 请求搜索数据
export const DetailsData = (id) =>
  request({
    url: '/?mhurl1=' + id
  })
// 漫画内容数据
export const CartoonData = (id) =>
   request({
     url: '/?mhurl2=' + id
   })
