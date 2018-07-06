//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    focus: false,
    input_value: '',
    canItap: true,
    class_like: 'button',
    canIshare: false,
    loadingHidden: false,
    hidden: true,
    content2: '',
    my_sn: '',
    inputVal: "",
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  onLoad: function (options) {
    const that = this
    var sn = Math.floor(Math.random() * 42)
    wx.request({
      url: 'https://www.ikjmls.cn/image/bg' + sn,
      success: function (res) {
        var data = res.data
        var array = wx.base64ToArrayBuffer(res.data)
        var base64 = wx.arrayBufferToBase64(array)
        if (res.statusCode == 200) {
          that.setData({
            imageData: 'data:image/jpeg;base64,' + base64,  // data 为接口返回的base64字符串  
            loadingHidden: true
          })
        }
      }
    })
    var sn = options.sn
    console.log(sn)
    wx: wx.request({
      url: 'https://www.ikjmls.cn/iscreating_look_duoren/' + sn,
      success: function (res) {
        console.log(res)
        var paragraphs = res.data.data[0].paragraphs1
        that.setData({
          author: res.data.data[0].author,
          rhythmic: res.data.data[0].rhythmic,
          paragraphs1: paragraphs,
          sn: sn
        })
        wx.setNavigationBarTitle({
          title: that.data.rhythmic
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
    setTimeout(function () {
      console.log(app.globalData.ok)
      if (app.globalData.ok == "1") {
        that.setData({
          hidden: true
        })
      }
      if (app.globalData.ok == "0") {
        that.setData({
          hidden: false
        })
      }
    }, 1000)
    wx: wx.request({
      url: 'https://www.ikjmls.cn/user/' + app.globalData.openid + '/name/' + app.globalData.name,
      success: function (res) {
        console.log(res)
        app.globalData.get_user = true;
        app.globalData.looked = res.data.data[0].looked
        app.globalData.is_creating = res.data.data[0].is_creating
        app.globalData.finished = res.data.data[0].finished
      },
      fail: function (res) {
      },
      complete: function (res) { },
    })
  },
  onShow: function () {
  },
  bindKeyInput: function (e) {
    const that = this
    var a = e.detail.value
    this.setData({
      title: a,
    })
  },
  bindKeyInput1: function (e) {
    const that = this
    var a = e.detail.value
    this.setData({
      content1: a,
    })
  },
  bindKeyInput2: function (e) {
    const that = this
    var a = e.detail.value
    this.setData({
      content2: a,
    })
  },
  save: function () {
    const that = this
    if(this.data.my_sn == ''){
    if (that.data.content2 != '') {
      var str_write = ""
      str_write = that.data.paragraphs1 + '&' + that.data.content2
      var rhythmic = that.data.rhythmic
      var url = 'https://www.ikjmls.cn/user/' + app.globalData.openid + '/user_name/' + app.globalData.name + '&' + that.data.author + '/iscreating/' + str_write + '/rhythmic/' + rhythmic + '/guanlianid/' + that.data.sn
      console.log(url)
      wx: wx.request({
        url: url,
        success: function (res) {
          that.setData({
            class_like: 'green_button',
            my_sn: res.data.sn
          })
          wx.showToast({
            title: '保存成功~',
            icon: '',
            image: '',
            duration: 1000,
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
      wx.showModal({
        title: '提示！',
        content: '对词不能为空哦',
        showCancel: false,
        cancelText: '',
        cancelColor: '',
        confirmText: '',
        confirmColor: '',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }}else{
      if (that.data.content2 != '') {
        var str_write = ""
        str_write = that.data.paragraphs1 + '&' + that.data.content2
        var rhythmic = that.data.rhythmic
        var url = 'https://www.ikjmls.cn/user/' + app.globalData.openid + '/user_name/' + app.globalData.name + '&' + that.data.author + '/iscreating/' + str_write + '/rhythmic/' + rhythmic + '/sn/' + that.data.my_sn
        console.log(url)
        wx: wx.request({
          url: url,
          success: function (res) {
            that.setData({
              class_like: 'green_button'
            })
            wx.showToast({
              title: '保存成功~',
              icon: '',
              image: '',
              duration: 1000,
              mask: true,
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          },
          fail: function (res) { },
          complete: function (res) { },
        })
      } else {
        wx.showModal({
          title: '提示！',
          content: '对词不能为空哦',
          showCancel: false,
          cancelText: '',
          cancelColor: '',
          confirmText: '',
          confirmColor: '',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
    }
  },
  onShareAppMessage: function () {
    console.log(this.data.sn)
    const that = this
    return {
      title: app.globalData.name + "的创作！",
      desc: app.globalData.name + "又有新作！快来围观！",
      path: '/pages/share/share?iscreating_id=' + that.data.sn
    }
  },
  index: function () {
    wx.switchTab({
      url: '/pages/index/index',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  confirm: function (e) {
    if (this.data.inputVal != '') {
      const that = this
      this.setData({
        hidden: true
      })
      app.globalData.name = this.data.inputVal
      wx: wx.request({
        url: 'https://www.ikjmls.cn/user/' + app.globalData.openid + '/name/' + that.data.inputVal,
        success: function (res) {
          console.log(res)
          app.globalData.get_user = true;
          app.globalData.looked = res.data.data[0].looked
          app.globalData.is_creating = res.data.data[0].is_creating
          app.globalData.finished = res.data.data[0].finished
          wx: wx.showToast({
            title: '命名成功~',
            icon: '',
            image: '',
            duration: 1500,
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        },
        fail: function (res) {
        },
        complete: function (res) { },
      })
    } else {
      this.setData({
        hidden: false
      })
    }
  },
})
