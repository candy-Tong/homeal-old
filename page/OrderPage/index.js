// page/OrderPage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["待付款", "进行中", "历史订单"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    orderList: [{
      avatar: "http://ralphlauren.scene7.com/is/image/RLContent/20160803_baby_feat_c01?scl=1",
      name: "小鹿私房菜",
      date: "10月1号",
      time: "18:30",
      menu: "菜单一",
      person_num: 4,
      note: "不要芹菜，喜欢清淡一点",
      accept: 0,      //是否接单
      paid: 0,       //是否付款
      received: 0,   //是否接待
      commented: 0   //是否是否评论
    }, {
      avatar: "http://ralphlauren.scene7.com/is/image/RLContent/20160803_baby_feat_c01?scl=1",
      name: "小鹿私房菜",
      date: "10月1号",
      time: "18:30",
      menu: "菜单一",
      person_num: 4,
      note: "不要芹菜，喜欢清淡一点",
      accept: 1,      //是否接单
      paid: 0,       //是否付款
      received: 0,   //是否接待
      commented: 0   //是否是否评论
    }]

  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'token',
      success: function (res) {
        console.log(res);
        // 转到登录页面
        // if (res.data == undefined) {
        //   wx.navigateTo({
        //     url: '/page/LoginPage/index',
        //     success: function (res) { },
        //     fail: function (res) { },
        //     complete: function (res) { },
        //   });
        // }
      },
      fail: function (res) {
        // wx.navigateTo({
        //   url: '/page/LoginPage/index',
        //   success: function (res) { },
        //   fail: function (res) { },
        //   complete: function (res) { },
        // });
      },
      complete: function (res) { },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})