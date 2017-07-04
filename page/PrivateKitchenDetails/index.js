// page/PrivateKitchenDetails/index.js
var TD = require('../../utils/tdweapp');
Page({
  data: {
    tabs: ["套餐", "信息", "用户评价"],
    activeIndex: 0,
    sliderOffset: 0,
    chef: {},
    chef_id: NaN,

    // 页面渲染完成标志
    ready: false
  },

  /**
   * tab切换
   */
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  //进入新建订单页面
  booking(event) {
    let _this = this;
    // 页面还没渲染完成
    if (!this.data.ready) {
      return false
    }
    wx.navigateTo({
      url: '/page/BookPage/index?chef=' + JSON.stringify(_this.data.chef)
    })
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

    console.log(options.chef_id);
    let chef_id = options.chef_id;
    let _this = this;
    wx.request({
      url: 'http://homeal.com.hk/api/chefdetails_rest/chef',
      data: {
        chef_id: chef_id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.result);
        _this.setData({
          chef: res.data.result,
          chef_id: chef_id,
          ready: true
        });
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示


  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
  // ,
  // onShareAppMessage: function () {
  //   return {
  //     title: '自定义转发标题',
  //     path: '/page/PrivateKitchenDetails/index',
  //     success: function (res) {
  //       // 转发成功
  //       console.log(res);
  //     },
  //     fail: function (res) {
  //       // 转发失败
  //     }
  //   }
  // }
})