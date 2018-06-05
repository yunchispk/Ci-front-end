//discover.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    this.setData({
      loadingHidden: false
    })
    const that = this;
    wx: wx.request({
      url: 'https://www.ikjmls.cn/return_look',
      success: function (res) {
        that.setData({
          results: res.data.data,
          loadingHidden: true
        })
        var list = {}
        var list1 = {}
        console.log(res.data.data.length)
        for (var i = 0; i < res.data.data.length; i++) {
          list1 = res.data.data[i].paragraphs.substr(0, res.data.data[i].paragraphs.length - 1).split('。');
          list[i] = list1
        }
        that.setData({
          list_write: list
        })

      },
      fail: function (res) { },
      complete: function (res) { },
    })
    
  },
  onLoad: function () {
    const that = this
    wx.request({
      url: 'https://www.ikjmls.cn/image/bg20',
      success: function (res) {
        var data = res.data
        var array = wx.base64ToArrayBuffer(res.data)
        var base64 = wx.arrayBufferToBase64(array)
        if (res.statusCode == 200) {
          that.setData({
            imageData: 'data:image/jpeg;base64,' + base64,  // data 为接口返回的base64字符串  
          })
        }
      }
    })
  },
  rewrite: function (e) {
    var sn = e.currentTarget.dataset.sn;
    console.log(sn)
    wx.navigateTo({
      url: 'rewrite/rewrite?sn=' + sn,
    })
  },
})