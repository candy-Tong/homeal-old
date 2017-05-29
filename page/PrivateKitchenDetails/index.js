// page/PrivateKitchenDetails/index.js
var TD = require('../../utils/tdweapp');
Page({
  data: {
    tabs: ["套餐", "信息", "用户评价"],
    activeIndex: 0,
    sliderOffset: 0,
    chef_detail: {},
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

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    let _this = this;
    wx.request({
      url: 'http://homeal.com.hk/api/chefdetails_rest/chef',
      data: {
        chef_id: 1
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.result);
        _this.setData({
          chef_detail: res.data.result
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