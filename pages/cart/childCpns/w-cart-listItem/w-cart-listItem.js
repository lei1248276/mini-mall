// pages/cart/childCpns/w-cart-listItem/w-cart-listItem.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    listItem: {
      type: Object,
      value: {}
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
    handleButton() {
      this.setData({
        [`listItem.checked`]: !this.properties.listItem.checked
      })
    }
  }
})
