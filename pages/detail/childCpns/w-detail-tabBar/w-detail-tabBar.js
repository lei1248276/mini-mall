// pages/detail/childCpns/w-detail-tabBar/w-detail-tabBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    collect: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    isCollect() {
      this.setData({
        collect: !this.data.collect
      })
    },
    handleAddCart() {
      wx.showToast({
        title: '添加成功',
        duration: 500
      })
      this.triggerEvent('addCart');
    }
  }
})
