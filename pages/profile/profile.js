//pages/profile/profile.js
const app = getApp()

Page({
  data: {
    motto: '（只有登陆才可以查看创作和收藏的作品哦）',
    code: null,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log(app.globalData.openid)
    if (app.globalData.get_user) {
      console.log(app.globalData.get_user)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
  },
  getUserInfo: function (e) {
    wx.login({
      success: res => {
        this.setData({ code: res.code })
        console.log(this.data.code)
        const that = this
        wx: wx.request({
          url: 'https://www.ikjmls.cn/code/' + that.data.code,
          success: function (res) {
            console.log(res)
            app.globalData.openid = res.data.openid
            wx: wx.request({
              url: 'https://www.ikjmls.cn/user/' + app.globalData.openid + '/name/' + app.globalData.userInfo.nickName,
              success: function (res) {
                console.log(res.data)
                console.log(res.data.data)
                console.log(res.data.data[0])
                console.log(res.data.data[0].looked)
                app.globalData.get_user = true;
                app.globalData.looked = res.data.data[0].looked
                app.globalData.is_creating = res.data.data[0].is_creating
                app.globalData.finished = res.data.data[0].finished
                console(app.glbalData.looked)
              },
              fail: function (res) { },
              complete: function (res) { },
            })
          },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
    })
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
