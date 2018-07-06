//index.js
const app = getApp()

Page({
  data: {
    inputShowed: false,
    inputVal: "",
    hidden: true,
    rearch_size: '80%'
  },
  showInput: function () {
    this.setData({
      inputShowed: true,
      rearch_size: '60%'
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false,
      rearch_size: '80%'
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: "",
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  hiddle_rearch: function(){
    if (this.data.inputVal == ''){
      this.setData({
        inputShowed: false
      })
    }
  },
  onLoad: function (options) {
    const that = this
    wx.request({
      url: 'https://www.ikjmls.cn/image/index',
      success: function (res) {
        var data = res.data
        var array = wx.base64ToArrayBuffer(res.data)
        var base64 = wx.arrayBufferToBase64(array)
        if (res.statusCode == 200) {
          that.setData({
            imageData: 'data:image/jpeg;base64,' + base64,  // data 为接口返回的base64字符串  
          })
        }
      }
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
    const that = this
    that.setData({
      one_one: 'animated fadeIn',
      one_one1: 'animated zoomIn',
      rearch_size: '80%',
      inputVal: '',
      inputShowed: false,
    });
  },
  next: function () {
    var inputVal = this.data.inputVal
    if (inputVal != '') {
      console.log(inputVal)
      wx.navigateTo({
        url: 'poetry_rhythmic/poetry_rhythmic?keyword=' + inputVal,
      })
    }
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
  to2: function () {
    wx.navigateTo({
      url: '/pages/index/poetry_article/poetry_article',
    })
  },
  to1: function () {
    wx.navigateTo({
      url: '/pages/index/poetry_library/poetry_library',
    })
  },
  to3: function () {
    wx.navigateTo({
      url: '/pages/index/poetry_library_rule/poetry_library_rule',
    })
  },
  to4: function () {
    wx.navigateTo({
      url: '/pages/double/double',
    })
  },
});