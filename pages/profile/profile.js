//pages/profile/profile.js
const app = getApp()

Page({
  data: {
    motto: '（只有登陆才可以查看创作和收藏的作品哦）',
    code: null,
    name: '',
    hasUserInfo: false,
    canIUse: wx.canIUse('getUserInfo'),
    hidden: true,
    inputVal: '',
    fx: false
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
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log(app.globalData.openid)
    const that = this
    setTimeout(function () {
      if (app.globalData.get_user) {
        console.log(app.globalData.get_user)
        that.setData({
          hasUserInfo: true,
          name: app.globalData.name
        })
        wx.setNavigationBarTitle({
          title: that.data.name + "的主页"
        })
      }
    }, 1000)
  },
  toast: function(){
    this.setData({
      hidden: false
    })
  },
  rename: function (e) {
    console.log(this.data.inputVal)
    if (this.data.inputVal != ''){
    const that = this
    wx: wx.request({
      url: 'https://www.ikjmls.cn/user/' + app.globalData.openid + '/rename/' + that.data.inputVal,
      success: function (res) {
        console.log(res)
        that.setData({
          name: that.data.inputVal,
          hidden: true
        })
        wx.setNavigationBarTitle({
          title: that.data.name
        })
        wx: wx.showToast({
          title: '修改成功~',
          icon: '',
          image: '',
          duration: 1500,
          mask: true,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
    })
    }
  },
  info: function(){
    wx.showModal({
      title: '关于',
      content: '感谢使用我们的小程序哦！有不合理的地方请多多包涵~',
      showCancel: true,
      cancelText: '我真帅',
      cancelColor: '',
      confirmText: '我最美',
      confirmColor: '',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }

})