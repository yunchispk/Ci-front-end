// pages/index/poetry_article/poetry_article.js
Page({
  data: {

  },

  onLoad: function (options) {
    var that = this
    id = options.dataid
    wx.request({
      url: '',//服务器列表地址
      data: {
        id: id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        list = res.data
        that.setData({
          article: res.data
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return{
      title:list.title,
      desc:list.content,
      path: '/index/poetry_article/poetry_article?dataid=' + id
    }
  } 
})

