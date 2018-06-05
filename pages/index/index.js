//index.js
const app = getApp()

Page({
  data: {
    inputShowed: false,
    inputVal: "",
    hidden: true,
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  onLoad: function (options) {
    const that = this
    setTimeout(function () {
      if (app.globalData.ok == "1") {
        that.setData({
          hidden: true
        })
      } else {
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
  onShow: function(){
    this.setData({
      inputVal: '',
      inputShowed: false,
    })
  },
  next: function () {
    var inputVal = this.data.inputVal
    console.log(inputVal)
    wx.navigateTo({
      url: 'poetry_rhythmic/poetry_rhythmic?keyword=' + inputVal,
    })
  },
  confirm: function(e){
    if (this.data.inputVal != ''){
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
        wx:wx.showToast({
          title: '命名成功~',
          icon: '',
          image: '',
          duration: 1500,
          mask: true,
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      },
      fail: function (res) {
      },
      complete: function (res) { },
    })
  }else{
      this.setData({
        hidden: false
      })
  }
  }
});