// page/HomePage/index.js
var TD = require('../../utils/tdweapp');

Page({
  data: {
    banner: [],
    currentArea: "汕头",
    msg_num: "2",
    main_rest: [],
    // 预先加载下一页
    nextPage: [],
    currPage: 1,

    // 下拉刷新，加载更多标志
    // true为可以执行 
    reflash_flag: true,
    loadMore_flag: true


  },

  //进入私厨页面
  goChefDetail(event) {
    console.log(event.currentTarget.dataset);
    let chef_id = event.currentTarget.dataset.chef_id;
    wx.navigateTo({
      url: '/page/PrivateKitchenDetails/index?chef_id=' + chef_id
    })
  },





  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    let _this = this;

    // 请求banner图片
    wx.request({
      url: 'http://homeal.com.hk/api/main_rest/banners',
      success(res) {

        _this.setData({
          banner: res.data.result
        });
      }
    });

    // 请求chefs信息
    wx.request({
      url: 'http://homeal.com.hk/api/main_rest/chefs',
      data: {
        page: 1,
        count: 1
      },
      success(res) {
        console.log(res.data);
        _this.setData({
          main_rest: res.data.result
        });
      }
    });

    // 预加载
    wx.request({
      url: 'http://homeal.com.hk/api/main_rest/chefs',
      data: {
        page: 2,
        count: 1
      },
      success(res) {
        console.log(res.data);
        _this.setData({
          nextPage: res.data.result
        });
      }
    });
  },

  // 下拉刷新
  onPullDownRefresh() {

    // 标志为false则退出
    if (!this.data.reflash_flag) {
      return false
    }
    console.log("刷新页面")
    let _this = this;

    // 请求banner图片
    wx.request({
      url: 'http://homeal.com.hk/api/main_rest/banners',
      success(res) {

        _this.setData({
          banner: res.data.result,
          currPage: 1
        });
      }
    });

    // 请求chefs信息
    wx.request({
      url: 'http://homeal.com.hk/api/main_rest/chefs',
      data: {
        page: 1,
        count: 1
      },
      success(res) {
        console.log(res.data);
        _this.setData({
          main_rest: res.data.result
        });
      },
      complete() {
        _this.setData({
          reflash_flag: true
        })
      }
    });
    this.setData({
      reflash_flag: false
    });

    // 预加载
    wx.request({
      url: 'http://homeal.com.hk/api/main_rest/chefs',
      data: {
        page: 2,
        count: 1
      },
      success(res) {
        console.log(res.data);
        _this.setData({
          nextPage: res.data.result
        });
      }
    });
  },
  // 加载更多
  onReachBottom() {
    if (!this.data.loadMore_flag) {
      console.log("阻止加载更多，等待上次更新")
      return false
    }
    // 使用预加载
    if (this.data.nextPage.length == 0) {
      console.log("已经是最后一页了")
      return
    }
    let main_rest = this.data.main_rest
    main_rest = main_rest.concat(this.data.nextPage)
    this.setData({
      main_rest
    })

    let currPage = this.data.currPage
    currPage++
    console.log("加载更多")
    let _this = this;

    // 请求chefs信息
    wx.request({
      url: 'http://homeal.com.hk/api/main_rest/chefs',
      data: {
        page: currPage + 1,
        count: 1
      },
      success(res) {
        _this.setData({
          currPage,
          nextPage: res.data.result,
          loadMore_flag: true
        });
      }
    });
    this.setData({
      loadMore_flag: false
    });

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