// pages/detail/childCpns/w-detail-commentInfo/w-detail-commentInfo.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodsComment: {
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
    handleZoomIn(e) {
      const index = e.target.dataset.index;
      const image = this.properties.goodsComment[0].images;
      const img = [];
      for (let i = 0; i < image.length; i++) {
        let url = 'https:' + image[i];
        img.push(url)
      }
      wx.previewImage({
        current: img[index],
        urls: img
      })
    }
  }
})
