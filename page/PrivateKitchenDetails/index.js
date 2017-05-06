// page/PrivateKitchenDetails/index.js
Page({
  data: {
    "cover": "http://img95.699pic.com/photo/00037/1338.jpg_wh300.jpg",
    "kitchen_info": {
      "avatar": "http://candycute.cn/imooc/Yii_blog/advanced/frontend/web/static/images/avatar/small.jpg",
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
})