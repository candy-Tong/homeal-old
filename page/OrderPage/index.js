// page/OrderPage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 导航
    tabs: ["待付款", "进行中", "历史订单"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    isLogin: false,

    // 订单
    orderList: []

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
    let _this = this
    // 检查是否登录
    try {
      var token = wx.getStorageSync('token')
      var phone = wx.getStorageSync('phone')
      if (token && token != undefined && phone && phone != undefined) {
        // Do something with return value
        this.setData({
          isLogin: true,
          token,
          phone
        })
      } else {
        console.log("未登录")
        // wx.navigateTo({
        //   url: '/page/LoginPage/index',
        //   success: function (res) { },
        //   fail: function (res) { },
        //   complete: function (res) { },
        // });
      }
    } catch (e) {
      // Do something when catch error
      console.log("获取token错误")
    }

    // 获取订单信息
    wx.request({
      url: 'http://homeal.com.hk/api/booking_rest/bookings',
      method: "GET",
      header: {
        phone: "13106986321",
        token: "mx2jWSO7eSCBOrzW6rWK4HaHCWNUkHeU"
      },
      success(res) {
        _this.setData({
          orderList: res.data.result
        })
      }
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
    let _this = this
    console.log("订单页面-下拉刷新")
    wx.request({
      url: 'http://homeal.com.hk/api/booking_rest/bookings',
      method: "GET",
      header: {
        phone: "13106986321",
        token: "mx2jWSO7eSCBOrzW6rWK4HaHCWNUkHeU"
      },
      success(res) {
        _this.setData({
          orderList: res.data.result
        })
        wx.stopPullDownRefresh()
      }
    })

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