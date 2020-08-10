// pages/findAndLoss/findAndLoss.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  findTap:function(){
    wx.navigateTo({
      url: './found/found',
    })
  },

  lostTap:function(){
    wx.navigateTo({
      url: './lost/lost',
    })
  },

  releaseTap:function(){
    wx.navigateTo({
      url: './release/release',
    })
  }



})