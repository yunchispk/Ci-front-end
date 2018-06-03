// pages/profile/liked/liked.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log(app.globalData.openid)
    if (app.globalData.get_user){
      const that = this;
      wx: wx.request({
        url: 'https://www.ikjmls.cn/poetrys/' + app.globalData.openid,
        success: function (res) {
          that.setData({
            results: res.data.data
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  onShareAppMessage: function () {
  
  }
})