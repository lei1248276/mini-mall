/*函数节流*/
// export function throttle(fn, interval) {
//   var enterTime = 0;//触发的时间
//   var gapTime = interval || 300 ;//间隔时间，如果interval不传，则默认300ms
//   return function() {
//     var that = this;
//     var backTime = new Date();//第一次函数return即触发的时间
//     if (backTime - enterTime > gapTime) {
//       fn.call(that,arguments);
//       enterTime = backTime;//赋值给第一次触发的时间，这样就保存了第二次触发的时间
//     }
//   };
// }

export function throttle(func, wait = 300) {
  let oldTime = 0;
  return function () {
    let now = new Date();
    if (now - oldTime > wait) {
      func.call(this, arguments);
      oldTime = now;
    }
  }
}
