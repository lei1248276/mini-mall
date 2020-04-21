// pages/detail/childCpns/w-detail-nav/w-detail-nav.js
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
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick(e) {
      console.log(e);
      const index = e.target.dataset.index;
      this.setData({
        currentIndex: index
      })
      this.triggerEvent('nav-click',{index},{});
    }
  }
})
