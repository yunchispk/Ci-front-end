//app.js
App({
  version: 'v0.0.0', //版本号
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        const that = this
        this.globalData.code = res.code
        wx: wx.request({
          url: 'https://www.ikjmls.cn/code/' + res.code,
          success: function (res) {
            console.log(res)
            that.globalData.openid = res.data.openid
            that.globalData.ok = res.data.ok
            that.globalData.name = res.data.name
            that.globalData.like_tosat = res.data.ok
            console.log(that.globalData.openid)
          },
          fail: function (res) { },
          complete: function (res) { },
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
   
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
  },
  globalData: {
    get_user: false,
    fxts : true,
  },
  _server: 'https://www.ikjmls.cn',
})