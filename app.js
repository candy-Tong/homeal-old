const openIdUrl = require('./config').openIdUrl;

App({
  onLaunch: function () {
    console.log('App Launch');

    //接入talking Data 统计
    var TD = require('./utils/tdweapp');
    App({
      onLaunch: function () {
        TD.launch({
          appkey: 'AC5DEE68927042629912D3D363653FF6',
          appName: 'homeal',
          versionName: '1.0',
          versionCode: '1.0',
          autoOnAppShow: true,
          autoOnAppHide: true,
          autoOnPageUnload: true,
          autoOnPullDownRefresh: true,
          autoOnReachBottom: true,
          autoOnShare: true
        });
        // versionName为小程序的用户可见版本号；versionCode为小程序的内部版本号，便于版本管理
      },
      onShow: function () {
        // TD.show();  // 如果上面的参数  autoOnAppShow 设置为 false，需要添加此行
      },
      onHide: function () {
        // TD.hide();  // 如果上面的参数  autoOnAppHide 设置为 false，需要添加此行
      }
    });


    // wx.login({
    //   success: function (res) {
    //     wx.getUserInfo({
    //       success: function (res) {
    //         // success
    //         console.log(res);
    //       },
    //       fail: function (res) {
    //         // fail
    //       },
    //       complete: function (res) {
    //         // complete
    //       }
    //     })
    //     console.log('发送请求' + res.code);

    //   }
    // });

  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    hasLogin: false,
    openid: null
  },
  // lazy loading openid
  getUserOpenId: function (callback) {
    var self = this

    if (self.globalData.openid) {
      callback(null, self.globalData.openid)
    } else {
      wx.login({
        success: function (data) {
          wx.request({
            url: openIdUrl,
            data: {
              code: data.code
            },
            success: function (res) {
              console.log('拉取openid成功', res)
              self.globalData.openid = res.data.openid
              callback(null, self.globalData.openid)
            },
            fail: function (res) {
              console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
              callback(res)
            }
          })
        },
        fail: function (err) {
          console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
          callback(err)
        }
      })
    }
  }
})
