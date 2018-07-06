// pages/profile/liked/liked.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: false
  },
  onShow: function(){
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.openid)
    if (app.globalData.get_user){
      const that = this;
      var keyword = options.keyword
      wx.setNavigationBarTitle({
        title: keyword
      })
      wx.setNavigationBarTitle({
        title: keyword//页面标题为路由参数
      })
      wx: wx.request({
        url: 'https://www.ikjmls.cn/rhythmic/' + keyword,
        success: function (res) {
          that.setData({
            results: res.data.data,
          })
          setTimeout(function () {
            that.setData({
            loadingHidden: true
            })
          }, 1000)
          var list = {}
          var list1 = {}
          console.log(res.data.data.length)
          for (var i = 0; i < res.data.data.length; i++) {
            list1 = res.data.data[i].paragraphs.split('\', \'');
            list[i] = list1
          }
          that.setData({
            results_content: list
          })

        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
    const that = this
    var sn = Math.floor(Math.random() * 42)
    wx.request({
      url: 'https://www.ikjmls.cn/image/bg' + sn,
      success: function (res) {
        var data = res.data
        var array = wx.base64ToArrayBuffer(res.data)
        var base64 = wx.arrayBufferToBase64(array)
        if (res.statusCode == 200) {
          that.setData({
            imageData: 'data:image/jpeg;base64,' + base64,  // data 为接口返回的base64字符串  
            loadingHidden : true
          })
        }
      }
    })
  },
  next: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '/pages/index/poetry_library/poetry_rhythmic/poetry_article/poetry_article?id=' + id,
    })
  },
})