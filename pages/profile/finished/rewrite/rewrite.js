//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    focus:false,
    input_value:'',
    canItap: true,
    class_like: 'button',
    hidden: true,
    open_ok: true,
    loadingHidden: false
  },
  onLoad: function(options){
    const that = this
    wx.request({
      url: 'https://www.ikjmls.cn/image/cz',
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
    var sn = options.sn;
    wx:wx.request({
      url: 'https://www.ikjmls.cn/rewrite/' + sn,
      success: function(res) {
        if (res.data.data.open == '1'){
          var open_ok1 = false
        }else{
          var open_ok1 = true
        }
        that.setData({
          rhythmic: res.data.data.rhythmic,
          rule: res.data.data.rule,
          paragraphs: res.data.data.paragraphs,
          pz_str: res.data.data.pz_str,
          open_ok:open_ok1,
          sn: sn
        })
        wx.setNavigationBarTitle({
          title: that.data.rhythmic
        })
        that.refresh()
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onShow: function(){
    this.setData({
      loadingHidden: true
    })
  },
  bindButtonTap: function (e) {
    var value = e.detail.value
    var list2 = {};
    list2[e.currentTarget.dataset.id] = 1;
    this.setData({
      focus: true,
      list_input: list2,
      input_value: ''
    })
  },
  bindKeyInput: function (e) {
    var new_list = {}
    const that = this
    var a = e.detail.value.split('')
    var rule_list = this.data.rule.split('。')
    for (var i = 0; i < rule_list.length; i++) {
      if (this.data.list_input[i] != 1) {
        new_list[i] = this.data.list_write[i]
      }
      else {
        new_list[i] = this.data.list_write[i]
        for (var j = 0; j < this.data.list_write[i].length && j < a.length; j++) {
          if (this.data.list[i][j] == '，' || this.data.list[i][j] == '、'){
            new_list[i][j] = this.data.list[i][j]
          }
          else{
          new_list[i][j] = a[j]
          }
        }
        var url = 'https://www.ikjmls.cn/pingze/' + a.join("")
        console.log(url)
      }
    }
    wx:wx.request({
      url: url,
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res)
        var pz_list = {}
        var pz_result = {}
        for (var i = 0; i < rule_list.length; i++) {
          if (that.data.list_input[i] != 1) {
            pz_list[i] = {}
            pz_list[i] = that.data.pz_list[i]
          } else {
            pz_list[i] = {}
            pz_list[i] = that.data.pz_list[i]
            pz_result[i] = res.data.result.split('')
            for (var j = 0; j < pz_result[i].length; j++) {
              if (pz_result[i][j] == '中' || that.data.list[i][j] == '中') {
                pz_list[i][j] = 1
              } else {
                if (pz_result[i][j] == '空' || that.data.list[i][j] == ',' || that.data.list[i][j] == '，' || that.data.list[i][j] == '、') {
                  pz_list[i][j] = '-'
                } else {
                  if (pz_result[i][j] == that.data.list[i][j]) {
                    pz_list[i][j] = 1
                  } else {
                    pz_list[i][j] = 0
                  }
                }
              }
            }
          }
        }
        console.log(pz_list)
        that.setData({
          pz_list: pz_list,
          canItap: true,
          class_like: "button",
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    this.setData({
      list_write: new_list,
    },
      () => {
        console.log('赋值成功')})
  }, 
  save: function(){
    const that = this
        var str_write = ""
        for (var i = 0; i < that.data.hang; i++) {
          str_write = str_write + that.data.list_write[i].join("") + "。"
        }
        var url = 'https://www.ikjmls.cn/user/' + app.globalData.openid + '/user_name/' + app.globalData.name + '/iscreating/' + str_write + '/rhythmic/' + that.data.rhythmic + '/sn/' + that.data.sn
        console.log(url)
        wx: wx.request({
          url: url,
          success: function (res) {
            that.setData({
              class_like: 'green_button'
            })
          },
          fail: function (res) { },
          complete: function (res) { },
        })
  },
  refresh: function () {
    var list = {};
    var list1 = {};
    var list2 = {};
    var pz_list = {};
    var rule_list = this.data.rule.substr(0, this.data.rule.length - 1).split('。');
    for (var i = 0; i < rule_list.length; i++) {
      var x = rule_list[i].split('');
      list[i] = x
    }
    var pz_str_list = this.data.pz_str.substr(0, this.data.pz_str.length - 1).split(',');
    for (var i = 0; i < pz_str_list.length; i++) {
      var x = pz_str_list[i].split('');
      pz_list[i] = x
    }
    var paragraphs_list = this.data.paragraphs.substr(0, this.data.paragraphs.length - 1).split('。');
    for (var i = 0; i < paragraphs_list.length; i++) {
      var x = paragraphs_list[i].split('');
      list1[i] = x
    }
    list2[0] = 1
    var hang = rule_list.length
    this.setData({
      list: list,
      pz_list: pz_list,
      list_write: list1,
      list_input: list2,
      hang: hang
    })
  },
  open: function(){
    this.setData({
      hidden: false
    })
  },
  cancel: function(){
    this.setData({
      hidden: true
    })
  },
  confirm: function(){
    const that = this
    wx:wx.request({
      url: 'https://www.ikjmls.cn/open/' + that.data.sn,
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        that.setData({
          open_ok: false,
          hidden: true
        })
        wx:wx.showToast({
          title: '公开成功！',
          icon: 'success',
          image: '',
          duration: 0,
          mask: true,
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      },
      fail: function(res) {},
      complete: function(res) {},
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
        title: app.globalData.name + "的创作！",
        desc: app.globalData.name + "又有新作！快来围观！",
        path: '/pages/share/share?iscreating_id=' + this.data.sn
      }
  }
})
