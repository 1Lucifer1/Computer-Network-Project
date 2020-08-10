
// miniprogram/pages/findAndLoss/found/found.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabbarText: 'found',
    releaseInfo: [],
    typeTitle: ['all', 'card', 'booktool', 'electroic', 'lifetool', 'others'],
    thingsType: 'all',
    middleArr: [],
    currentPage: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

  },
  onTitleChange(e) {
    console.log(e);
    this.setData({
      thingsType: this.data.typeTitle[e.detail]
    })
    console.log(this.data.thingsType);
    this.showPage()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  
  showPage() {
    // console.log('test');
    let that = this
    if (that.data.thingsType == 'all') {
      that.setData({
        releaseInfo: that.data.middleArr
      })
    } else {
      let newArr = []
      const val = that.data.thingsType
      that.data.middleArr.forEach(item => {
        if( item.thingsType == val){
          newArr.push(item)
        }
      })
      console.log(newArr);
      that.setData({
        releaseInfo: newArr
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    wx.showNavigationBarLoading();
    wx.cloud.callFunction({
      name: 'getRelease',
      data: {
        tabbarText: that.data.tabbarText,
        currentPage: that.data.currentPage
      },
      success: res => {
        that.setData({
          middleAewdrr: res.result,
        })
        console.log(that.data.middleArr)
        that.showPage()
      },
      fail: (err) => {
        console.log(err)
      },
      complete: () => {
        wx.hideNavigationBarLoading()
      }
    })
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
    
    // this.onShow()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
    this.setData({
      currentPage: this.data.currentPage + 1
    })
    console.log(this.data.currentPage);
    this.onShow()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})