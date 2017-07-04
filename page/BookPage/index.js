// page/BookPage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    order: {
      // menu_name: "",

      people_no: NaN,
      menu_price: NaN,
      booking_notice: "",

      date: {
        year: 2017,
        month: 5,
        day: 2
      },
      time: "12:00"
    }
  },

  // 提交订单
  booking() {
    let _this = this
    // 获取token 和 phone
    try {
      var token = wx.getStorageSync('token')
      var phone = wx.getStorageSync('phone')
      console.log(token)
      console.log(phone)
      console.log(Boolean(token) + Boolean(phone))
      if (!token || !phone) {

        console.log("未登录")
        wx.navigateTo({
          url: '/page/LoginPage/index'
        });
        return
      }

    } catch (e) {
      // Do something when catch error
      console.log(e)
    }
    
    // 新增订单
    let chef_id = _this.data.chef_id
    let menus = []
    let menu = {}
    menu.menu_id = _this.data.order.menu.menu_id
    menu.people_no = _this.data.order.people_no
    menu.menu_price = _this.data.order.menu_price
    menus.push(menu)

    let meal_time = new Date()
    meal_time.setFullYear(_this.data.order.date.year)
    meal_time.setMonth(_this.data.order.date.month - 1)
    meal_time.setDate(_this.data.order.date.day)
    meal_time = meal_time.Format("yyyy-MM-dd " + _this.data.order.time + ":00")

    let booking_notice = _this.data.order.booking_notice

    wx.request({
      method: "POST",
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
        if (res.data.error_code == '400') {
          console.log("token已过期")
          wx.navigateTo({
            url: '/page/LoginPage/index'
          });
          return false
        }
        wx.navigateBack({
          delta: 1
        })
      }
    })

  },

  // 套餐选择
  selectMenu() {
    let _this = this
    let menuList = this.data.chef.menus
    let itemList = []
    for (let i = 0; i < menuList.length; i++) {
      itemList.push(menuList[i].menu_name)
    }
    wx.showActionSheet({
      itemList: itemList,
      success: function (res) {
        console.log(res.tapIndex)

        _this.setData({
          "order.menu": menuList[res.tapIndex],
          "order.people_no": menuList[res.tapIndex].menu_price[0].people,
          "order.menu_price": menuList[res.tapIndex].menu_price[0].cost,

        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },


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
    if (people_no < this.data.order.menu.menu_price[this.data.order.menu.menu_price.length - 1].people) {
      people_no++

      let menu_price = this.data.order.menu.menu_price.find(function (n) {
        return n.people == people_no
      })

      this.setData({
        "order.people_no": people_no,
        "order.menu_price": menu_price.cost
      })
    }

  },
  descPerson() {
    let people_no = this.data.order.people_no
    if (people_no > this.data.order.menu.menu_price[0].people) {
      people_no--

      let menu_price = this.data.order.menu.menu_price.find(function (n) {
        return n.people == people_no
      })

      this.setData({
        "order.people_no": people_no,
        "order.menu_price": menu_price.cost
      })
    }

  },

  // 获取备注内容
  setBookingNotice(e) {
    // console.log(e.detail)
    this.setData({
      "order.booking_notice": e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let chef = JSON.parse(options.chef)
    let chef_id = chef.chef_id

    let menu = chef.menus[0]

    let today = new Date();
    let date = {}
    date.year = today.getFullYear();
    date.month = today.getMonth() + 1;
    date.day = today.getUTCDate() + 1;

    /**
     * 处理chef数据
     * 对menu_price 按人数进行排序
    */

    for (let i = 0; i < chef.menus.length; i++) {
      chef.menus[i].menu_price.sort(function (value1, value2) {
        return value1.people - value2.people
      })
    }

    this.setData({
      "order.date": date,
      chef,
      chef_id,
      "order.menu": menu,

      "order.people_no": chef.menus[0].menu_price[0].people,
      "order.menu_price": chef.menus[0].menu_price[0].cost
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