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
    this.getData();
  },
  more: function(){
    this.getData();
  },
  like: function(){
    if (this.data.canItap == true && app.globalData.get_user == true){
      this.setData({
        class_like: "red_button",
        canItap: false
      })
    const that = this;
    wx:wx.request({
      url: 'https://www.ikjmls.cn/user/' + app.globalData.openid + '/poetry/' + that.data.sn,
      success: function(res) {
        app.globalData.looked = app.globalData.looked + that.data.sn + ','
        console.log(app.globalData.looked)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    }
  },
  //获取词详情 
  getData: function () {
    const that = this
    var id = Math.floor(Math.random() * 21000);
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
    //wx.showNavigationBarLoading();
    wx.request({
      url: app._server + '/poetry/' + id,
      success: function (res) {
        //console.log('22222')
        console.log(res.data)
        var paragraphs_list = res.data.data[0].paragraphs.split('\', \'')
        for(var i = 0; i < paragraphs_list.length; i++){
          paragraphs_list[i] = paragraphs_list[i].substr(0, paragraphs_list[i].length-1)
        }
        console.log(paragraphs_list)
        that.setData({
          rhythmic: res.data.data[0].rhythmic,
          paragraphs: paragraphs_list,
          author: res.data.data[0].author,
          sn: res.data.data[0].sn,
          class_like: "button",
          canItap:true
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

