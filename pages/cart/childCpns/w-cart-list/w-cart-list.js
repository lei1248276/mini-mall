// pages/cart/childCpns/w-cart-list/w-cart-list.js
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cartList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
  },

  created() {
    console.log(app.globalData.cartList);
  },
  attached() {
    console.log('11111');
  },
  ready() {}
})
