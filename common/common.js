
// 验证token是否过期
function checkLogin() {
  try {
    var phone = wx.getStorageSync("phone")
    var token = wx.getStorageSync("token")
  } catch (e) {
    console.log("验证token出现错误")
    console.log(e)
  }
  wx.request({
    url: 'http://homeal.com.hk/api/login_rest/member',
    header: {
      phone: phone,
      token: token
    },
    success(res) {
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
}