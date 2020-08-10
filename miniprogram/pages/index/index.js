//index.js

const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  onLoad: function() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo,
              })
              console.log(this.data.userInfo)

              
              wx.cloud.callFunction({
                name: 'createUser',
                data: {
                  avatarUrl: this.data.userInfo.avatarUrl,
                  nickName: this.data.userInfo.nickName,
                },
                success: res => {
                  // console.log(res);
                  console.log('用户信息', this.data.userInfo)
                  app.globalData.avatarUrl = this.data.userInfo.avatarUrl
                  app.globalData.nickName = this.data.userInfo.nickName
                  app.globalData.isLogin = true
                  // that.setData({
                  //   isLogin: true,
                  //   nickName: this.data.userInfo.nickName,
                  //   userAvatar: this.data.userInfo.avatarUrl
                  // })
                  console.log(app.globalData.isLogin );
                  
                  wx.hideLoading()
                  // that.onShow()
                },
                fail: err => {
                  console.log(err);
                },
                complete: e => {
                  console.log(e);
                }
              })
            },
            fail: err => {
              console.log(err);
            }
          })

        }
      }
    })
  },
  myTap:function(){
    wx.navigateTo({
      url: './my/my',
    })
  },
  seeTap:function(){
    wx.navigateTo({
      url: './see/see',
    })
  },
  collectionTap:function(){
    wx.navigateTo({
      url: './collection/collection',
    })
  },
  draftTap:function(){
    wx.navigateTo({
      url: './my_draft/my_draft',
    })
  },
  recentlyTap:function(){
    wx.navigateTo({
      url: './recently/recently',
    })
  },
})
