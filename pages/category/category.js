// pages/category/category.js
import {
  getCategory,
  getSubCategory,
  getCategoryGoods
} from "../../service/category";
import {TYPE,BACK_TOP} from "../../common/const";
import {throttle} from "../../utils/tool"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentType: 'pop',
    titles: ['流行','新款','精选'],
    isShow: false,
    isFixed: false,
    categories: null,
    categoryContent: null,
    goods: null
  },

  /* 网络请求方法 */
  _getCategory() {
    /* 1.获取分类页面 menu 数据*/
    getCategory().then(res => {
      // console.log(res);
      const categories = res.data.data.category.list;
      this.setData({
        categories: categories
      })
      /* 2.获取menu-content初次请求数据（因为要使用maitKey）*/
      this._getSubCategory(0);
      /* 3.获取商品初次请求数据（因为要使用miniWallkey）*/
      this._getCategoryGoods(this.data.currentType);
    })
  },
  _getSubCategory(index) {
    /* 1.获取分类页面 menu内容数据 */
    const maitKey = this.data.categories[index].maitKey;
    getSubCategory(maitKey).then(res => {
      const categoryContent = res.data.data.list;
      // console.log(categoryContent);
      this.setData({
        categoryContent: categoryContent
      })
    })
  },
  _getCategoryGoods(type) {
    const miniWallkey = this.data.categories[0].miniWallkey;
    getCategoryGoods(miniWallkey,type).then(res => {
      const goods = res.data;
      // console.log(goods);
      this.setData({
        goods: goods
      })
    })
  },

  /* methods*/
  handleMenuClick(e) {
    const index = e.detail.index;
    this._getSubCategory(index);
  },

  handleTabClick(e) {
    console.log(e);
    const index = e.detail.index;
    this.setData({
      currentType: TYPE[index]
    })
    this._getCategoryGoods(this.data.currentType);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getCategory();
  },

  onPageScroll(options) {
    const scrollTop = options.scrollTop;
    const flag = scrollTop >= BACK_TOP;
    this.setData({
      isShow: flag
    })

     // tab-control吸顶效果
    wx.createSelectorQuery().select('#tabControl').boundingClientRect(rect => {
      const top = rect.top;
      const flag = top <= 5;
      const isFixed = this.data.isFixed;
      if (flag !== isFixed) {
        this.setData({
          isFixed: flag
        })
      }
    }).exec();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  /*onReachBottom: function () {

  },*/

})