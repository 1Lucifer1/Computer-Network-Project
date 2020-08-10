// components/inputDetail/inputDetail.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    confessionOrHole: {
      type: String,
      value: ''
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    //type: ['未分类', '证件', '书籍文具', '电子设备', '生活用品', '其他'],
    typeIndex: 0,

    releaseText: '',
    imgLocalPath: [],
    //thingsType: '',
    releaseCall: '',
    releaseRemind: false,

    releaseType: 'confession',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    checkUploadForm(releaseType) {
      // console.log(releaseType)
      let that = this
      let promises = []
      if (that.data.releaseText) {
        that.setData({
          releaseType,
        })
        if (that.data.imgLocalPath.length > 0) {
          wx.showLoading({
            title: '正在发布...'
          });

          that.data.imgLocalPath.forEach(element => {
            promises.push(that.promiseUplodImg(element))
          })

          Promise.all(promises)
            .then((imgCloudPath) => {
              console.log(imgCloudPath);
              that.uploadRelease(imgCloudPath)
            })
            .catch((err) => { console.log(err); })

        } else {
          that.uploadRelease()
        }

      } else {
        wx.showToast({
          title: '内容或分类为空',
          image: '../../../asserts/icons/my_icon_still@2x.png',
          duration: 1800
        })
      }
    },

    promiseUplodImg(element) {
      return new Promise((resolve, reject) => {
        //一次只能上传一张图片到数据库
        const filePath = element;
        let a = filePath.lastIndexOf('.');
        let b = filePath.lastIndexOf('.', a - 1);
        let c = filePath.substring(b + 1, a);
        const cloudPath = c + filePath.match(/\.[^.]+?$/);
        console.log(cloudPath);

        wx.cloud.uploadFile({
          filePath,
          cloudPath,
          success: (res) => {
            console.log('上传成功', res)
            resolve(res.fileID)
          },
          fail: (err) => {
            console.log('上传失败', err)
          }
        });
      })
    },

    uploadRelease(imgCloudPath) {
      console.log('uploadRelease');
      // let imgCloudPath = imgCloudPath || []
      let that = this
      console.log(that);
      wx.cloud.callFunction({
        name: "wall-uploadinput",
        data: {
          releaseType: that.data.releaseType,
          releaseImg: imgCloudPath,
          releaseText: that.data.releaseText,
          //thingsType: that.data.thingsType,
          releaseCall: that.data.releaseCall,
          releaseRemind: that.data.releaseRemind,
        },
        success: () => {
          wx.hideLoading();
          console.log(imgCloudPath);
          const releaseType = that.data.releaseType
          wx.redirectTo({
            url: `/pages/${releaseType}/${releaseType}`
          })
          console.log(`/pages/${releaseType}/${releaseType}`);
          wx.hideNavigationBarLoading()
        },
        fail: (err) => {
          console.log(err);
        },
        complete: () => {
          that.setData({
            releaseText: '',
            imgLocalPath: [],
            //thingsType: '',
            releaseCall: '',
            releaseRemind: false,
            releaseType: '',
            typeIndex: 0,
          })

        }
      })
    },

    // bindtypeChange: function (e) {
    //   // console.log('picker type 发生选择改变，携带值为', e.detail.value);
    //   //const thingsType = ['none', 'card', 'booktool', 'electroic', 'lifetool', 'others']
    //   this.setData({
    //     typeIndex: e.detail.value,
    //     //thingsType: thingsType[e.detail.value]
    //   })
    //   //console.log(this.data.thingsType)
    // },
    chooseImage() {
      let that = this;
      // 点击发布并确认不为空再上传图片等
      wx.chooseImage({
        count: 3,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          console.log(res)
          that.setData({
            //可选择多张图片上传
            imgLocalPath: that.data.imgLocalPath.concat(res.tempFilePaths)
          })
        }
      })
    },
    previewImage(e) {
      console.log(e)
      wx.previewImage({
        current: e.currentTarget.id,
        urls: this.data.imgLocalPath
      })
    },
    switchChange(e) {
      console.log('switch 发生 change 事件，携带值为', e.detail.value)
      this.setData({
        releaseRemind: e.detail.value
      })

    },
    onInputChange(e) {
      this.setData({
        releaseText: e.detail.value
      })
      // console.log(this.data.releaseText)
    },
    onInputCall(e) {
      this.setData({
        releaseCall: e.detail.value
      })
      // console.log(this.data.releaseCall)
    }
  }
})
