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
        var paragraphs = res.data.data[0].paragraphs1
        that.setData({
          rhythmic: res.data.data[0].rhythmic,
          paragraphs: paragraphs,
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
  share: function () {
    this.onShareAppMessage()
  },
  save: function () {
    const that = this
    var str_write = ""
    str_write = str_write + that.data.paragraphs + '&'
    var rhythmic = that.data.rhythmic
    var url = 'https://www.ikjmls.cn/user/' + app.globalData.openid + '/user_name/' + app.globalData.name + '/iscreating/' + str_write + '/rhythmic/' + rhythmic + '/sn/' + that.data.sn
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
    return {
      title: app.globalData.name + "邀请你来对词！！",
      desc: "看看" + app.globalData.name + "创作了什么吧~",
      path: '/pages/double2/double2?sn=' + this.data.sn
    }
  }
})
