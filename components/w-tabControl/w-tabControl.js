// components/w-tabControl/w-tabControl.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    },
    isFixed: {
      type: Boolean,
      value: false
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
    handleClick: function (e) {
      // 保存currentIndex
      const index = e.currentTarget.dataset.index
      this.setData({
        currentIndex: index
      });
      // 发出事件
      this.triggerEvent('tabClick', {index}, {});
    }
  }
})
