// components/infoCard/infoCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    releaseInfo: {
      type: Array,
      value: []
    }
  },


  /**
   * 组件的初始数据
   */
  data: {
    textExpa: false,
    callIcon: '../../asserts/icons/lostfound_icon_chat_p@2x.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    textExpander: function () {
      let self = this;
      if (this.data.textExpa) {
        self.setData({
          textExpa: false
        })
        console.log(this.data.textExpa);
      } else {
        self.setData({
          textExpa: true
        })
        console.log(this.data.textExpa);
      }
    },
    previewImage(e) {
      console.log(e)
      wx.previewImage({
        current: e.currentTarget.id,
        urls: [e.currentTarget.id]
      })
    },
  }
})
