// pages/home/home.js
import {getMultidata,getGoods} from "../../service/home";
import {BACK_TOP,TYPE} from "../../common/const";


Page({
  /**
   * 页面的初始数据
   */
  data: {
    banners: null,
    recommends: null,
    titles: ['流行','新款','精选'],
    goods: {
      'pop': {page: 0,list: []},
      'new': {page: 0,list: []},
      'sell': {page: 0,list: []},
    },
    currentType: 'pop',
    currentIndex: 0,
    isShow: false,
    isTabFixed: false
  },
  handleTabClick(e) {
    const index = e.detail.index;
    // 修改currentType的值实现数据切换
    this.setData({
      currentType: TYPE[index],
      currentIndex: index
    })
  },

  // 网络请求方法
  _getMutildata() {
    // 请求轮播图和推荐数据
    getMultidata().then(res => {
      // 保存请求到的轮播图和推荐数据
      // console.log(res);
      const banners = res.data.data.banner.list;
      const recommends = res.data.data.recommend.list;
      this.setData({
        banners,
        recommends
      });
    }).catch(err => {
      console.log(err);
    })
  },
  _getGoods(type) {
    // 请求商品数据
    const page = this.data.goods[type].page + 1;
    getGoods(type,page).then(res => {
      // 保存每次请求的数据
      const oldGoods = this.data.goods[type].list;
      const list = res.data.data.list;
      oldGoods.push(...list);
      this.setData({
        [`goods.${type}.list`]: oldGoods,
        [`goods.${type}.page`]: page
      })
    }).catch(err => {
      console.log(err);
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1.请求轮播图和推荐数据
    this._getMutildata();
    // 2.请求商品数据
    this._getGoods('pop');
    this._getGoods('new');
    this._getGoods('sell');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    /* 到达底部加载更多数据*/
    this._getGoods(this.data.currentType);
  },

  /* 页面滚动触发事件的处理函数*/
  onPageScroll(options) {
    const scrollT = options.scrollTop;
    const flag = scrollT >= BACK_TOP
    const isShow = this.data.isShow;
    /* 避免频繁调用this.setData */
    if (flag !== isShow) {
      this.setData({
        isShow: flag
      })
    }
    /* 获取tab-control的偏移量实现固定的效果*/
    wx.createSelectorQuery().select('#tabControl')
        .boundingClientRect(rect => {
          // console.log(rect);
          const position = rect.top;
          const flag = position <= 5;
          const isTabFixed = this.data.isTabFixed;
          if (flag !== isTabFixed) {
            this.setData({
              isTabFixed: flag
            })
          }
        }).exec()
  }
})