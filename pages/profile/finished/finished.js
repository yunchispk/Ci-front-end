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
  onShow: function(){
    this.setData({
      loadingHidden: false
    })
    console.log(app.globalData.openid)
    if (app.globalData.get_user) {
      const that = this;

      wx: wx.request({
        url: 'https://www.ikjmls.cn/iscreating/' + app.globalData.openid,
        success: function (res) {
          console.log(res)
          try{
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
          } catch (error) {
            wx.showModal({
              title: '提示',
              content: '似乎没有作品呢，快选个词牌写一首吧~',
              showCancel: true,
              cancelText: '取消',
              cancelColor: '',
              confirmText: '去写一首',
              confirmColor: '',
              success: function (res) {
                if (res.confirm == true){
                wx.redirectTo({
                  url: '/pages/index/poetry_library_rule/poetry_library_rule',
                  success: function (res) { },
                  fail: function (res) { },
                  complete: function (res) { },
                })
                }
              },
              fail: function (res) { },
              complete: function (res) { },
            })
          }

        },
        fail: function (res) {
        },
        complete: function (res) { },
      })
    }
  },
  onLoad: function () {
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