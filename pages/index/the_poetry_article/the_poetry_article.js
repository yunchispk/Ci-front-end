// pages/index/poetry_article/poetry_article.js
var app = getApp();
Page({

  data: {
      rhythmic: '',       //词名
      author: '',         //词人
      paragraphs: {},     //词正文
      //note: '',           //注释
  },

  onLoad: function (options) {
    this.getData();
  },

  //获取词详情 
  getData: function () {
    const that = this
    var id = Math.floor(Math.random() * 21000);
    var sn = Math.floor(Math.random() * 10)
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
    //wx.showNavigationBarLoading();
    wx.request({
      url: app._server + '/poetry/' + id,
      success: function (res) {
        //console.log('22222')
        console.log(res.data)
        var paragraphs_list = res.data.data[0].paragraphs.split('\', \'')
        that.setData({
          rhythmic: res.data.data[0].rhythmic,
          paragraphs: paragraphs_list,
          author: res.data.data[0].author,
          sn: sn
        })
      },
      fail: function (res) {
        console.log('fail 222')
      },
      // data: app.key({
      //   openid: app._user.openid,//
      // }),
    })
    },

/**
 * 用户点击右上角分享
 */
onShareAppMessage: function () {
  return {
    title: list.title,
    desc: list.content,
    path: '/index/poetry_article/poetry_article?dataid=' + id
  }
}

})

