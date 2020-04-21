// pages/detail/detail.js
import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam} from "../../service/detail";

import {BACK_TOP} from "../../common/const";

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    iid: null,
    topImages: null,
    isShow: false,
    isFixed: false,
    goods: {},
    shop: {},
    goodsParam: {},
    goodsInfo: {},
    goodsComment: {},
    recommend: {},
    currentIndex: 0,
    titles: ['商品','参数','评价','推荐']
  },

  /* 网络请求*/
  _getDetail() {
    getDetail(this.data.iid).then(res => {
      // console.log(res);
      const data = res.data.result;
      /* 1.获取轮播图数据*/
      const topImages = data.itemInfo.topImages;
      /* 2.获取商品基本信息*/
      const goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);
      /* 3.获取商家信息*/
      const shop = new Shop(data.shopInfo);
      /* 4.获取商品详情信息*/
      const goodsInfo = data.detailInfo;
      /* 5.获取参数信息*/
      const goodsParam = new GoodsParam(data.itemParams.info,data.itemParams.rule);
      /* 6.获取商品评价信息*/
      if (data.rate.list) {
        const goodsComment = data.rate.list;
        this.setData({
          goodsComment: goodsComment
        })
      }
      this.setData({
        topImages: topImages,
        goods: goods,
        shop: shop,
        goodsInfo: goodsInfo,
        goodsParam: goodsParam,
      })
    }).catch(err => {
      console.log(err);
    })
  },
  _getRecommend() {
    getRecommend().then(res => {
      const recommend = res.data.data.list;
      this.setData({
        recommend: recommend
      })
    }).catch(err => {
      console.log(err);
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      iid: options.iid
    })
    /* 获取详情页数据*/
    this._getDetail();

    /* 获取详情页推荐数据*/
    this._getRecommend();
  },

  /* 页面滚动触发函数*/
  onPageScroll(options) {
    const scrollTop = options.scrollTop;
    const flag = scrollTop >= BACK_TOP;
    if (flag !== this.data.isShow) {
      this.setData({
        isShow: flag
      })
    }

    wx.createSelectorQuery().select('#tabControl').boundingClientRect(rect => {
      const top = rect.top;
      const flag = top <= 5;
      if (flag !== this.data.isFixed) {
        this.setData({
          isFixed: flag
        })
      }
    }).exec()
  },

  /* method*/
  handleTabClick(e) {
    const index = e.detail.index
    this.setData({
      currentIndex: index
    })
  },
  handleAddCart() {
    // 1.获取商品对象
    const obj = {};
    obj.iid = this.data.iid;
    obj.title = this.data.goods.title;
    obj.image = this.data.topImages[0];
    obj.price = this.data.goods.realPirce;
    obj.desc = this.data.goods.desc;

    // 2.添加到全局仓库购物车列表中
    app.addToCart(obj);
  }
})