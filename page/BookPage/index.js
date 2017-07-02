// page/BookPage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    chef: {
      avatar: "http://ralphlauren.scene7.com/is/image/RLContent/20160803_baby_feat_c01?scl=1",
      chef_name: "小鹿私房菜",
    },
    order: {
      menu_id: 1,
      menu_name: "套餐一",
      date: {
        year: 2017,
        month: 5,
        day: 2
      },
      time: "12:00",
      people_no: 2,
      price: 168,
      booking_notice: ""
    }
  },

  // 提交订单
  booking() {
    // 获取token 和 phone
    try {
      var token = wx.getStorageSync('token')
      var phone = wx.getStorageSync('phone')
      console.log(token)
      console.log(phone)
      if (token === "" || phone === "" || token === undefined || phone === undefined) {
        wx.navigateTo({
          url: '/page/LoginPage/index',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        });
        return
      }
     
    } catch (e) {
      // Do something when catch error
      console.log(e)
    }

    let chef_id = this.data.chef_id
    let menus = []
    let menu = {}
    menu.menu_id = this.data.order.menu_id
    menu.people_no = this.data.order.people_no
    menu.price = 1
    menus.push(menu)

    let meal_time = new Date()
    meal_time.setFullYear(this.data.order.date.year)
    meal_time.setMonth(this.data.order.date.month - 1)
    meal_time.setDate(this.data.order.date.day)
    meal_time = meal_time.Format("yyyy-MM-dd " + this.data.order.time + ":00")

    let booking_notice = this.data.booking_notice

    wx.request({
      method:"POST",
      url: 'http://homeal.com.hk/api/booking_rest/booking',
      data: {
        "phone": phone,
        "token": token,
        "chef_id": chef_id,
        "menus": menus,
        "meal_time": meal_time,
        "booking_notice": booking_notice
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
      }
    })


  },

  // 套餐选择

  // 日期选择
  selectDate() {
    let date = JSON.stringify(this.data.order.date)
    let time = this.data.order.time
    wx.navigateTo({
      url: '/page/BookPage/page/CalendarPage/index?' + 'date=' + date + '&time=' + time
    })
  },

  // 增加、减少人数
  addPerson() {
    let people_no = this.data.order.people_no
    people_no++
    this.setData({
      "order.people_no": people_no
    })
  },
  descPerson() {
    let people_no = this.data.order.people_no
    if (people_no > 1) {
      people_no--
      this.setData({
        "order.people_no": people_no
      })
    }

  },

  // 获取备注内容
  setBookingNotice(e) {
    // console.log(e.detail)
    this.setData({
      booking_notice: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.chef_id);
    let chef_id = options.chef_id
    let today = new Date();
    let date = {}
    date.year = today.getFullYear();
    date.month = today.getMonth() + 1;
    date.day = today.getUTCDate() + 1;
    this.setData({
      "order.date": date,
      chef_id
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