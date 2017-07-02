// page/HomePage/index.js
var TD = require('../../utils/tdweapp');

Page({
  data: {
    banner: [],
    currentArea: "汕头",
    msg_num: "2",
    main_rest: []
  },

  //进入私厨页面
  goChefDetail(event) {
    console.log(event.currentTarget.dataset);
    let chef_id=event.currentTarget.dataset.chef_id;
    wx.navigateTo({
      url: '/page/PrivateKitchenDetails/index?chef_id=' + chef_id
    })
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    let _this = this;

    // 请求banner图片
    wx.request({
      url: 'http://homeal.com.hk/api/main_rest/banners',
      success(res) {

        _this.setData({
          banner: res.data.result
        });
      }
    });

    // 请求chefs信息
    wx.request({
      url: 'http://homeal.com.hk/api/main_rest/chefs',
      data: {
        page: 1,
        count: 1
      },
      success(res) {
        console.log(res.data);
        _this.setData({
          main_rest: res.data.result
        });
      }
    });

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
})