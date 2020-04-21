import request from "./network";

// 请求轮播图和推荐数据
export function getMultidata() {
  return request({
    url: '/home/multidata'
  })
}

// 请求商品数据
export function getGoods(type,page) {
  return request({
    url: '/home/data',
    data: {
      type,
      page
    }
  })
}

