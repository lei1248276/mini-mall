//app.js
App({

  globalData: {
    cartList: []
  },

  addToCart(obj) {
    // 1.判断是否是重复的商品
    const oldObj = this.globalData.cartList.find(item => item.iid === obj.iid);
    if (oldObj) {
      oldObj.count += 1;
    } else {
      obj.count = 1;
      obj.checked = false;
      this.globalData.cartList.push(obj);
    }
  },

})
