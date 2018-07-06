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
    sn: '',
    content1 : '',
    title: '',
    ok_1: true
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
  },
  onShow: function () {
    wx.hideShareMenu()
  },
  bindKeyInput: function (e) {
    const that = this
    var a = e.detail.value
    this.setData({
      title: a,
    })
  },
  bindKeyInput1: function (e) {
    const that = this
    var a = e.detail.value
    this.setData({
      content1: a,
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
    const that = this
    if (this.data.sn != '') {
    } else {
      wx.showModal({
        title: '提示！',
        content: '请先保存哦',
        showCancel: false,
        cancelText: '',
        cancelColor: '',
        confirmText: '保存',
        confirmColor: '',
        success: function (res) { 
          that.save()
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  save: function () {
    const that = this
    if (that.data.content1 != '' && that.data.title != '') {
      var str_write = ""
      str_write = str_write + that.data.content1 + '&'
      var rhythmic = that.data.title
      var url = 'https://www.ikjmls.cn/user/' + app.globalData.openid + '/user_name/' + app.globalData.name + '/iscreating/' + str_write + '/rhythmic/' + rhythmic + '/guanlianid/0'
      console.log(url)
      wx: wx.request({
        url: url,
        success: function (res) {
          that.setData({
            class_like: 'green_button',
            sn: res.data.sn,
            ok_1: false
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
    } else {
      wx.showModal({
        title: '提示！',
        content: '标题和正文不能为空~',
        showCancel: false,
        cancelText: '',
        cancelColor: '',
        confirmText: '好的',
        confirmColor: '',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  onShareAppMessage: function () {
    return {
      title: app.globalData.name + "邀请你来对词！！",
      desc: "看看" + app.globalData.name + "创作了什么吧~",
      path: '/pages/double2/double2?sn=' + this.data.sn
    }
  }
})
