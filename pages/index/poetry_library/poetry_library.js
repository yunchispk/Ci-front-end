//pages/index/poetry_library/poetry_library.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: '',//服务器列表地址
      success: function (res) {
        that.setData({
          array: res.data
        })
      }
    })
  },

  //携带ID跳转
  short: function (e) {
    var id = e.target.id
    wx.navigateTo({
      url: '../index/poetry_library/poetry_library?dataid=' + id
    })
  },

  /**
   * 页面上拉触底事件的处理函数 //到底部刷新
   */
  onReachBottom: function () {
    var that = this
    num = num + 5

    wx.request({
      url: '',//服务器列表地址
      data: {
        number: num
      },
      header: {
        'content-type': 'applocation/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          array: res.data
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
