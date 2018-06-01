// pages/index/poetry_article/poetry_article.js
Page({
  data: {
    poetry_article: {
      title: '',       //词名
      poet: '',        //词人
      content: '',     //词正文
      note: '',        //注释
    },

    onLoad: function (options) {
      this.getData();
    },

    //获取词详情
    getData: function () {
      wx.showNavigationBarLoading();
      wx.request({
        url: app._server + "/poetry/<id>",
        method: 'POST',
        data: app.key({
          openid: app._user.openid,//
        }),
      });
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
  }
})

