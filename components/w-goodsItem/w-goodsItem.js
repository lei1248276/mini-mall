// components/w-goodsItem/w-goodsItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    }
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
    currentItem() {
      const iid = this.data.item.iid;
      if (iid) {
        wx.navigateTo({
          url: '/pages/detail/detail?iid=' + iid
        })
      }
    }
  }
})
