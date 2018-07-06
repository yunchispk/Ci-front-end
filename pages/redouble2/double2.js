//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    focus: false,
    input_value: '',
    canItap: true,
    class_like: 'button',
    canIshare: false,
    loadingHidden: false,
    hidden: true,
    paragraphs2: ''
  },
  onLoad: function (options) {
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
    var sn = options.sn
    wx: wx.request({
      url: 'https://www.ikjmls.cn/iscreating_look_duoren/' + sn,
      success: function (res) {
        console.log(res)
        if (res.data.data[0].open == '1') {
          var open_ok1 = false
        } else {
          var open_ok1 = true
        }
        var paragraphs1 = res.data.data[0].paragraphs1
        var paragraphs2 = res.data.data[0].paragraphs2
        that.setData({
          author: res.data.data[0].author,
          rhythmic: res.data.data[0].rhythmic,
          paragraphs1: paragraphs1,
          paragraphs2: paragraphs2,
          open_ok: open_ok1,
          sn: sn
        })
        wx.setNavigationBarTitle({
          title: that.data.rhythmic
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  onShow: function () {
  },
  bindKeyInput: function (e) {
    const that = this
    var a = e.detail.value
    this.setData({
      rhythmic: a,
    })
  },
  bindKeyInput1: function (e) {
    const that = this
    var a = e.detail.value
    this.setData({
      paragraphs: a,
    })
  },
  bindKeyInput2: function (e) {
    const that = this
    var a = e.detail.value
    this.setData({
      content2: a,
    })
  },
  save: function () {
    const that = this
    var str_write = ""
    str_write = str_write + that.data.paragraphs + '&'
    var rhythmic = that.data.rhythmic
    var url = 'https://www.ikjmls.cn/user/' + app.globalData.openid + '/user_name/' + app.globalData.name + '&' + that.data.author + '/iscreating/' + str_write + '/rhythmic/' + rhythmic + '/sn/' + that.data.sn
    console.log(url)
    wx: wx.request({
      url: url,
      success: function (res) {
        that.setData({
          class_like: 'green_button'
        })
        wx.showToast({
          title: '保存成功~',
          icon: '',
          image: '',
          duration: 1000,
          mask: true,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  open: function () {
    this.setData({
      hidden: false
    })
  },
  cancel: function () {
    this.setData({
      hidden: true
    })
  },
  confirm: function () {
    const that = this
    wx: wx.request({
      url: 'https://www.ikjmls.cn/open/' + that.data.sn,
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        that.setData({
          open_ok: false,
          hidden: true
        })
        wx: wx.showToast({
          title: '公开成功！',
          icon: 'success',
          image: '',
          duration: 0,
          mask: true,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  disopen: function () {
    const that = this
    wx: wx.request({
      url: 'https://www.ikjmls.cn/disopen/' + that.data.sn,
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        that.setData({
          open_ok: true,
        })
        wx: wx.showToast({
          title: '隐藏成功！',
          icon: 'success',
          image: '',
          duration: 0,
          mask: true,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  onShareAppMessage: function () {
    console.log(this.data.sn)
    const that = this
    return {
      title: app.globalData.name + "的创作！",
      desc: app.globalData.name + "又有新作！快来围观！",
      path: '/pages/share/share?iscreating_id=' + that.data.sn
    }
  },

})
