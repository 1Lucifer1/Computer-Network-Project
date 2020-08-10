// miniprogram/pages/release/release.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['表白墙', '树洞'],
    foundOrLost: ['在这里写下你的表白...', '在这里写下你的小纸条...'],
    clickStatus: 0,
    releaseTypes: ['confession', 'hole'],
    isLogin: false,
    isUpload: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const skey = wx.getStorageSync('skey');
    // if (skey) {
    //   console.log('skey', skey);
    //   //检查 session_key是否过期以改变登陆状态
    //   wx.checkSession({
    //     success: () => {
    //       //没过期则调用获取信息
    //       this.handleGetLocalUserInfo().then(userInfo => {
    //         app.globalData.avatarUrl = userInfo.avatarUrl
    //         app.globalData.nickName = userInfo.nickName
    //         app.globalData.isLogin = true
    //       })
    //     },
    //     fail: () => {
    //       app.globalData.isLogin = false
    //     }
    //   })
    // } else {
    //   console.log('过期')
    //   app.globalData.isLogin = false
    // }

  },
  handleGetLocalUserInfo() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: res => {
          console.log(res)
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                console.log('用户 res', res);
                const userInfo = res.userInfo;
                resolve(userInfo);
              }
            })
          }
        }
      })
    })
  },
  onTitleChange: function (e) {
    //console.log(e.detail)
    this.setData({
      clickStatus: e.detail
    })
  },

  checkUploadForm: function () {
    let that = this
    this.setData({
      isUpload: true
    })
    this.inputDetail = this.selectComponent('#inputDetail')
    this.inputDetail.checkUploadForm(that.data.releaseTypes[that.data.clickStatus])
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

    // console.log(app.globalData.isLogin);
    // var that = this;
    // if (app.globalData.isLogin) {

    // } else {
    //   wx.showToast({
    //     title: '请授权登录',
    //     image: '../../../asserts/icons/my_icon_still@2x.png',
    //     duration: 1500
    //   })
    //   setTimeout(function () {
    //     wx.switchTab({
    //       url: '/pages/mine/mine',
    //     })
    //   }, 1800);
    // }
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