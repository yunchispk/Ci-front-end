// pages/profile/liked/liked.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: false,
    imageshare: "data:image/jpeg;base64,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"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.hideShareMenu()
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
            loadingHidden: true
          })
        }
      }
    })
    console.log(app.globalData.openid)
    if (app.globalData.get_user) {
      const that = this;
      wx: wx.request({
        url: 'https://www.ikjmls.cn/poetrys/' + app.globalData.openid,
        success: function (res) {
          try {
            that.setData({
              results: res.data.data
            })
            var list = {}
            var list1 = {}
            console.log(res.data.data.length)
            for (var i = 0; i < res.data.data.length; i++) {
              list1 = res.data.data[i].paragraphs.split('\', \'');
              list[i] = list1
            }
            that.setData({
              results_content: list,
              loadingHidden: true
            })
          } catch (error) {
            wx.showModal({
              title: '提示',
              content: '似乎没有收藏呢，快去找找看吧~',
              showCancel: true,
              cancelText: '取消',
              cancelColor: '',
              confirmText: '随机一首',
              confirmColor: '',
              success: function (res) {
                if (res.confirm == true) {
                  wx.redirectTo({
                    url: '/pages/index/poetry_article/poetry_article',
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
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  onShow: function () {
  },
  next: function (e) {
    var sn = e.currentTarget.dataset.sn;
    console.log(sn)
    wx.navigateTo({
      url: 'poetry_article/poetry_article?sn=' + sn,
    })
  },
  sure: function (e){
    this.setData({
      delete_sn: e.currentTarget.dataset.sn
    })
    const that = this
    wx.showModal({
      title: '确定要删除吗？',
      content: '一旦删除无法恢复！',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '',
      confirmText: '删除',
      confirmColor: 'red',
      success: function(res) {
        if (res.confirm){
          that.delete1()
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  delete1: function (e) {
    console.log(e)
    this.setData({
      results: '',
      results_content: ''
    })
    const that = this
    wx: wx.request({
      url: 'https://www.ikjmls.cn/user_id/' + app.globalData.openid + '/delete2/' + that.data.delete_sn,
      success: function (res) {
        console.log(res)
        wx: wx.request({
          url: 'https://www.ikjmls.cn/poetrys/' + app.globalData.openid,
          success: function (res) {
            try {
              that.setData({
                results: res.data.data
              })
              var list = {}
              var list1 = {}
              console.log(res.data.data.length)
              for (var i = 0; i < res.data.data.length; i++) {
                list1 = res.data.data[i].paragraphs.split('\', \'');
                list[i] = list1
              }
              that.setData({
                results_content: list,
                loadingHidden: true
              })
            } catch (error) {
              wx.showModal({
                title: '提示',
                content: '似乎没有收藏呢，快去找找看吧~',
                showCancel: true,
                cancelText: '取消',
                cancelColor: '',
                confirmText: '随机一首',
                confirmColor: '',
                success: function (res) {
                  if (res.confirm == true) {
                    wx.redirectTo({
                      url: '/pages/index/poetry_article/poetry_article',
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
          fail: function (res) { },
          complete: function (res) { },
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  onShareAppMessage: function (e) {
    return {
      title: app.globalData.name + "的分享！",
      desc: "看看" + app.globalData.name + "给你分享了什么吧~",
      path: '/pages/share/share?poetry_id=' + e.target.dataset.sn
    }
  }
})