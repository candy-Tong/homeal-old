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
    this.setData({
      sms_code: e.detail.value,
    })
  },

  //登录
  submit() {
    let _this = this;
    let phone = this.data.phone
    console.log(phone)
    let token
    //获取token
    wx.request({
      url: 'http://homeal.com.hk/api/login_rest/login',
      data: {
        phone: phone,
        sms_code: _this.data.sms_code
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        token = res.data.result
        if (res.data.is_error != undefined && res.data.is_error == false && res.data.result !== undefined) {
          try {
            wx.setStorageSync('phone', phone)
          } catch (e) {
            console.log("存储phone出错")
            console.log(e)
          }
          try {
            wx.setStorageSync('token', res.data.result)
          } catch (e) {
            console.log("存储token出错")
            console.log(e)
          }

          // 获取member_id
          wx.request({
            url: 'http://homeal.com.hk/api/login_rest/member',
            method: "GET",
            header: {
              phone: phone,
              token: token
            },
            success(res) {
              console.log(res)
              try {
                wx.setStorageSync('member_id', res.data.result.member_id)
                wx.navigateBack({
                  delta: 1,
                });
              } catch (e) {
                console.log("存储member_id出错")
                console.log(e)
              }
            }

          })

          wx.navigateBack({
            delta: 1
          })
        }
        else {
          console.log("验证码错误");
          wx.showModal({
            content: '验证码错误',
            showCancel: false,
            success: function (res) {

            }
          });
        }
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) { },
    })

    
  },

  /**
   * 发送短信
   */
  sendMsg() {

    if (this.data.ready !== true)
      return

    if (this.data.phone.length != 10 && this.data.phone.length != 11) {
      wx.showModal({
        content: '手机号格式错误',
        showCancel: false,
        success: function (res) {

        }
      });
      return
    }

    this.setData({
      ready: false
    })
    // console.log(this.data.phone);

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

          _this.setData({
            reSend: false
          })
          console.log("发送短信");
          var countdown = 60;
          _this.settime(countdown);
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})