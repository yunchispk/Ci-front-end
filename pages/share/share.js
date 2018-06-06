// pages/index/poetry_article/poetry_article.js
var app = getApp();
Page({

  data: {
      rhythmic: '',       //词名
      author: '',         //词人
      paragraphs: {},     //词正文
      //note: '',           //注释
      class_like:'button',
      canItap: true
  },

  onLoad: function (options) {
    try{
      var poetry_id = options.poetry_id
      this.setData({url : 'https://www.ikjmls.cn/poetry/' + poetry_id})
    }catch(error){
      var iscreating_id = optins.iscreating_id
      this.setData({ url: 'https://www.ikjmls.cn/iscreating_look/' + iscreating_id })
    }
    const that = this
    var id = Math.floor(Math.random() * 21000);
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
    //wx.showNavigationBarLoading();
    wx.request({
      url: that.data.url,
      success: function (res) {
        //console.log('22222')
        console.log(res.data)
        var paragraphs_list = res.data.data[0].paragraphs.split('\', \'')
        for (var i = 0; i < paragraphs_list.length; i++) {
          paragraphs_list[i] = paragraphs_list[i].substr(0, paragraphs_list[i].length - 1)
        }
        console.log(paragraphs_list)
        that.setData({
          rhythmic: res.data.data[0].rhythmic,
          paragraphs: paragraphs_list,
          author: res.data.data[0].author,
          sn: res.data.data[0].sn,
          time: res.data.data[0].time,
          class_like: "button",
          canItap: true
        })
        wx.setNavigationBarTitle({
          title: that.data.rhythmic
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
  index: function(){
    wx.switchTab({
      url: '/pages/index/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})

