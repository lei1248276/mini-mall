// pages/cart/cart.js
const app = getApp();
// const computed = require('miniprogram-computed');

Page({
  // behaviors: [computed],

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    isChecked: false
  },

  /*computed: {
    totalPrice(data) {
      return data.cartList.filter(function(value) {
        return value.checked;
      }).reduce(function(pre, current) {
        return pre + current.price * current.count
      },0).toFixed(2);
    },
    counter(data) {
      return data.cartList.filter(function (value) {
        return value.checked;
      }).reduce(function (pre, current) {
        return pre + current.count;
      }, 0);
    }
  },*/

  handleCheckAll() {
    let cartList = this.data.cartList;
    if (!this.data.isChecked) {
      cartList.map((value,index) => {
        this.setData({
          [`cartList[${index}].checked`]: true,
          isChecked: true
        })
      })
    } else {
      cartList.map((value,index) => {
        this.setData({
          [`cartList[${index}].checked`]: false,
          isChecked: false
        })
      })
    }
  },

  handleButton(e) {
    let cartList = this.data.cartList
    let index = e.target.dataset.index;
    let checked = this.data.cartList[index].checked
    this.setData({
      [`cartList[${index}].checked`]: !checked
    })
    if (cartList.every((value) => value.checked)) {
      this.setData({
        isChecked: true
      })
    } else {
      this.setData({
        isChecked: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    /* 每次进入购物车更新数据*/
    app.globalData.cartList.map(value => value.checked = false);
    this.setData({
      cartList: app.globalData.cartList,
      isChecked: false
    })
    /* 修改导航栏商品数量*/
    wx.setNavigationBarTitle({
      title: `购物车(${app.globalData.cartList.length})`
    })
  },
})