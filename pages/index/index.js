//index.js
const app = getApp()

Page({
  data: {
    inputShowed: false,
    inputVal: "",
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
    wx: wx.getUserInfo({
      withCredentials: true,
      lang: '',
      success: function (res) {
        console.log(res)
        app.globalData.userInfo = res.userInfo
        console.log(app.globalData.userInfo)
        wx: wx.request({
          url: 'https://www.ikjmls.cn/user/' + app.globalData.openid + '/name/' + app.globalData.userInfo.nickName,
          success: function (res) {
            console.log(res)
            app.globalData.get_user = true;
            console.log(res.data)
            console.log(res.data.data)
            console.log(res.data.data[0])
            console.log(res.data.data[0].looked)
            app.globalData.looked = res.data.data[0].looked
            app.globalData.is_creating = res.data.data[0].is_creating
            app.globalData.finished = res.data.data[0].finished
          },
          fail: function (res) { },
          complete: function (res) { },
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
});