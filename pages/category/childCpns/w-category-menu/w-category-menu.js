// pages/category/childCpns/w-category-menu/w-category-menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    categories: {
      type: Array,
      value: []
    }
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
      const index = e.target.dataset.index;
      this.setData({
        currentIndex: index
      })
      this.triggerEvent('menuClick', {index});
    }
  }
})
