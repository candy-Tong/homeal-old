// page/LoginPage/index.js
var TD = require('../../utils/tdweapp')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    sms_code: '',
    verification: "获取验证码",
    ready: true,
    reSend: false,
    hasError: false,
    errorMsg: ''
  },

  //获取输入的手机号
  getPhone: function (e) {
    // console.log(e.detail.value);
    this.setData({
      phone: e.detail.value
    })
  },

  //获取输入的验证码
  getSms_code: function (e) {
    // console.log(e.detail.value);
    this.setData({
      sms_code: e.detail.value
    })
  },

  //登录
  submit(){
    let _this=this;
    wx.request({
      url: 'http://homeal.com.hk/api/login_rest/login',
      data: {
        phone: _this.data.phone,
        sms_code: _this.data.sms_code
      },
      method: 'POST',
      success: function(res) {
        console.log(res);
        if(res.data.is_error!=undefined&&res.data.is_error==false){
          wx.setStorage({
            key: 'userToken',
            data: res.data.result,
            success: function(res) {
              console.log("登录成功");
              wx.navigateBack({
                delta: 1,
              });
            },
            fail: function(res) {},
            complete: function(res) {},
          })
        }
      },
      fail: function(res) {
        console.log(res);
      },
      complete: function(res) {},
    })
  },

  /**
   * 发送短信
   */
  sendMsg() {
    let _this = this;
    wx.request({
      url: 'http://homeal.com.hk/api/login_rest/smscode',
      data: {},
      header: {
        phone: _this.data.phone
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data);
        if (res.data.is_error != undefined && res.data.is_error == false) {
          if (_this.data.ready) {
            _this.setData({
              ready: false,
              reSend: false
            });
            console.log("发送短信");
            var countdown = 60;
            _this.settime(countdown);
          }
        }
      },
      fail: function (res) {
        status: false
        console.log("失败");
        console.log(res);
      },
      complete: function (res) {
        console.log("完成");
      },
    })


  },
  /**
   * 计时器函数
   */
  settime(time) {
    if (time == 0) {
      console.log("stop");
      this.setData(
        {
          verification: "重新获取",
          ready: true,
          reSend: true
        }
      )
    } else {
      let _this = this
      time--;
      this.setData(
        {
          verification: time + "秒"
        }
      )
      setTimeout(function () {
        _this.settime(time)
      }, 1000)
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    TD.Page.load(true); // 此时，需要在TD.Page.load()中设置参数true，用于说明此时为Tabs方式；

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  }
})