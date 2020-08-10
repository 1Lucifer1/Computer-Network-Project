// components/category/category.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type:Array,
      value:[]
    }
  },
  onLoad: function () {
    
  },
  /**
   * 组件的初始数据
   */
  data: {
    activeIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabClick: function (e) {
      this.setData({
          activeIndex: e.currentTarget.id
      })
      let outActiveIndex = e.currentTarget.id
      this.triggerEvent('onTitleChange',outActiveIndex)
    }
  }
})


