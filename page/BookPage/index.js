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
      menu: 1,
      date: {
        year: 2017,
        month: 5,
        day: 2
      },
      time: {
        hour: 12,
        min: 0
      },
      person_num: 2,
      price: 168,
      note: ""
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