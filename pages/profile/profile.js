//pages/profile/profile.js
const app = getApp()

Page({
  data: {
    motto: '（只有登陆才可以查看浏览记录以及创作的作品）',
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
    if (app.globalData.userInfo) {
      this.setData({
        code:app.globalData.code,
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      wx.login({
        success: res => {
          this.setData({code : res.code})
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
        }
      })
      app.userInfoReadyCallback = res => {
        this.setData({
          code: app.globalData.code,
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.login({
        success: res => {
          this.setData({ code: res.code })
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
        }
      })
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            code: res.code,
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    wx.login({
      success: res => {
        this.setData({ code: res.code })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
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
