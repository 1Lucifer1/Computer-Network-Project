// written by 陆张驰


var app = getApp()
    
var message = '';

var textList = []


var user_id = (Math.random()*10).toString();

var has_find = false

function Message(_content, _isYours) {
  this.content = _content;
  this.isYours = _isYours;
}



var httpConnector = {
  url: 'http://101.132.120.92:8085/', // for test
  res_data: '',
  GET: function(url_last){
    var that = this;
    wx.request({
      url: this.url + url_last,
      header: {
        'content-type': 'application/json'
      },
      success (res) {
        that.res_data = res.data.toString();
        //console.log("GET: " + that.res_data);
        
      }
    })
  },
  POST: function(url_last, info){
    var that = this;
    wx.request({
      url: this.url + url_last,
      data: info,
      method: "POST",
      header: {
       'content-type': 'application/x-www-form-urlencoded'
      },
      success (res) {
        that.res_data = res.data.toString();
        //console.log("POST: " + that.res_data);
      }
    })
  },
}

var getHttpConnector = httpConnector;

Page({
  data: {
    message : '',
    messageList:textList,
    hidden:false,
    hasInRoom: false,
    headInfo: '',
    tailInfo: ''
  },
  getInput:function(e){
    this.setData({
      message: e.detail.value
    })
  },
  add: function(){
    var that = this;
    console.log("PRESS");
    // console.log(this.data.message.length);
    if(this.data.message.length > 0){
      httpConnector.POST("send", {"user": user_id, "info": this.data.message})
      that.setData({
        message: ""
      })
    }
  },
  onLoad: function () {
    var that = this;
    wx.getUserInfo({
      success: res => {
        user_id = res.userInfo
        console.log(user_id);
        
      }
    })
    console.log(user_id);
    this.setData({
      message: '',
      has_find: false
    })
    httpConnector.GET("test")
    setTimeout(function () {
      if (httpConnector.res_data != "Success"){
        that.setData({
          hidden: true,
          headInfo: "网络异常"
        })
        console.error("网络异常")
      } 
      else{
        var addUserInterval = setInterval(function () {
          httpConnector.POST("add", {"user": user_id})
          if (httpConnector.res_data == "0"){
            that.setData({
              hidden: true
            });
            that.setData({
              has_find: true,
              headInfo: "匹配成功 打个招呼吧~"
            })
            httpConnector.res_data = ""
            clearInterval(addUserInterval)
          }
        }, 1000)
        
        var info_length = 1;
        var info = ""
        var contactInterval = setInterval(function () {
          if(that.data.has_find){
            wx.request({
              url: "http://101.132.120.92:8085/get",
              data: {"user": user_id},
              method: "POST",
              header: {
               'content-type': 'application/x-www-form-urlencoded'
              },
              success (res) {
                info = res.data;
                if (info == "-1") {
                  that.setData({
                    tailInfo: "服务器重启了 请重新配对"
                  })
                  clearInterval(contactInterval)
                }
                if(info.length > info_length){
                  info_length = info.length
                  var infoList = info.split("&|&")
                  for (var i = textList.length; i < infoList.length; i++){
                    var newInfo = infoList[i]
                    var newMessage = new Message(newInfo.substring(1), newInfo.startsWith("Y"))
                    textList.push(newMessage)
                    that.setData({
                      messageList: textList
                    })
                  }
                }
              }
            })
            
          } 
        }, 500)
      }
    }, 500)
  }
})
