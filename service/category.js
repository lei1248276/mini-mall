import request from "./network";

/* 分类页面的menu网络请求*/
export function getCategory() {
  return request({
    url: '/category'
  })
}

/* 分类页面的menu-content网络请求*/
export function getSubCategory(maitKey) {
  return request({
    url: '/subcategory',
    data: {
      maitKey
    }
  })
}

/* 分类页面的商品信息网络请求*/
export function getCategoryGoods(miniWallkey,type) {
  return request({
    url: '/subcategory/detail',
    data: {
      miniWallkey,
      type
    }
  })
}


