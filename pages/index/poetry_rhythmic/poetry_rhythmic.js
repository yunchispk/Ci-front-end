// pages/profile/liked/liked.js
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
  onLoad: function (options) {
    console.log(app.globalData.openid)
    if (app.globalData.get_user){
      const that = this;
      var keyword = options.keyword
      wx.setNavigationBarTitle({
        title: keyword + '的结果'
      })
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
      wx: wx.request({
        url: 'https://www.ikjmls.cn/rearch/' + keyword,
        success: function (res) {
          that.setData({
            results: res.data.data,
            loadingHidden: true,
            num: res.data.num
          })
          var list = {}
          var list1 = {}
          console.log(res.data.data.length)
          if(that.data.num != 0){
          for (var i = 0; i < res.data.data.length; i++) {
            list1 = res.data.data[i].paragraphs.split('\', \'');
            list[i] = list1
          }
          that.setData({
            results_content: list
          })
        }else{
          wx.showModal({
            title: '温馨提示~',
            content: '没有找到数据诶，换个关键词试试~\n最好搜短句哦',
            showCancel: false,
            confirmText: '好吧好吧',
            confirmColor: '',
            success: function (res) {
              wx.switchTab({
                url: '/pages/index/index',
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { },
              })
              },
            fail: function(res) {},
            complete: function(res) {},
          })
        }
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  onShow: function(){
    this.setData({
      loadingHidden: false
    })
  },
  next: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '/pages/index/poetry_library/poetry_rhythmic/poetry_article/poetry_article?id=' + id,
    })
  },
})