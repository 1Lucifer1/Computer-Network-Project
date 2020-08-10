//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    inputVal: "",
    show: []
  },
  bindTextAreaBlur: function (e) {
    this.setData({
      inputVal: e.detail.value
    })
  },
  formSubmit: function (e) {
    var temp = this.data.show;
    temp.push(this.data.inputVal);
    this.setData({
      show: temp
    })
    console.log(this.data.inputVal)
  },
  torelease: function (e) {
    wx.navigateTo({
      url: '/pages/release/release',
    })
  },
  todateTag: function (e) {
    wx.navigateTo({
      url: '/pages/canlendar/canlendar',
    })
  },
  todetails: function (e) {
    wx.navigateTo({
      url: '/pages/confession/confession',
    })
  },
  tohole: function (e) {
    wx.navigateTo({
      url: '/pages/hole/hole',
    })
  }, 
  // goRelease: function () {
  //   wx.navigateTo({
  //     url: '/pages/release'
  //   })
  // }


})