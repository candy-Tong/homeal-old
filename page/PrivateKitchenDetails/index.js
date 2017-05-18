// page/PrivateKitchenDetails/index.js
Page({
  data: {
    "cover": "http://img95.699pic.com/photo/00037/1338.jpg_wh300.jpg",
    "kitchen_info": {
      "avatar": "http://homeal.com.hk/assets/img/cook/cook_1.jpg",
      "name": "小路私房菜",
      "desc": "会做各种潮汕美食",
      "tag": [
        "潮汕美食"
      ]
    },
    "navigate":
    [{
      "name": "推荐菜单",
      "num": 66
    }, {
      "name": "自选菜单",
      "num": 371
    }, {
      "name": "用户评价",
      "num": 195
    }
    ],
    "currentTag": "recommend-menu"
  },
  setCurrentTag(event) {
    let index = event.currentTarget.dataset.index;
    console.log(index);
    switch (index) {
      case 0:
        this.setData({ currentTag: "recommend-menu" });
        break;
      case 1:
        this.setData({ currentTag: "optional-menu" });
        break;
      case 2:
        this.setData({ currentTag: "rating" });
        break;
      default:
        console.log("fail to setCurrentTag,wrong index");
        break;
    }
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    wx.request({
      url: 'http://homeal.com.hk/api/Cook_rest/cook?cid=1', 
      data: {
        cid:1
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
      }
    })
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
  // ,
  // onShareAppMessage: function () {
  //   return {
  //     title: '自定义转发标题',
  //     path: '/page/PrivateKitchenDetails/index',
  //     success: function (res) {
  //       // 转发成功
  //       console.log(res);
  //     },
  //     fail: function (res) {
  //       // 转发失败
  //     }
  //   }
  // }
})