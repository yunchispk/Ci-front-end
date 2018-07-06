//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    focus:false,
    input_value:'',
    canItap: true,
    class_like: 'button',
    canIshare: false,
    loadingHidden: false
  },
  onLoad: function(options){
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
    var keyword = options.keyword;
    wx.setNavigationBarTitle({
      title: keyword
    })
    wx:wx.request({
      url: 'https://www.ikjmls.cn/the_rhythmic_rule/' + keyword,
      success: function(res) {
        that.setData({
          rhythmic: res.data.data[0].rhythmic,
          rule: res.data.data[0].rule
        })
        that.refresh()
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onShow: function(){
    this.setData({
      loadingHidden: false
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
          if (this.data.list[i][j] == '，' || this.data.list[i][j] == '、' || this.data.list[i][j] == ','){
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
            pz_result[i] = res.data.result.split('')
            for (var j = 0; j < pz_result[i].length; j++) {
              if (pz_result[i][j] == '中' || that.data.list[i][j] == '中') {
                pz_list[i][j] = 1
              } else {
                if (pz_result[i][j] == '空' || that.data.list[i][j] == '，' || that.data.list[i][j] == '、') {
                  pz_list[i][j] = null
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
    if (this.data.canItap == true && app.globalData.get_user == true) {
      this.setData({
        class_like: "green_button",
        canItap: false,
        canIshare: true
      })
      const that = this
      if (this.data.sn == null){
        var str_write = ""
        console.log(that.data.list_write)
        console.log(that.data.list_write.length)
        for (var i = 0; i < that.data.hang; i++){
          console.log(str_write)
          str_write = str_write + that.data.list_write[i].join("") + "。"
        }
        var url = 'https://www.ikjmls.cn/user/' + app.globalData.openid + '/user_name/' + app.globalData.name + '/iscreating/' + str_write + '/rhythmic/' + that.data.rhythmic + '/guanlianid/1'
        console.log(url)
      wx:wx.request({
        url: url,
        success: function(res) {
          that.setData({
            sn: res.data.sn
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
        fail: function(res) {},
        complete: function(res) {},
      })
      }else{
        var str_write = ""
        for (var i = 0; i < that.data.hang; i++) {
          str_write = str_write + that.data.list_write[i].join("") + "。"
        }
        var url = 'https://www.ikjmls.cn/user/' + app.globalData.openid + '/user_name/' + app.globalData.name + '/iscreating/' + str_write + '/rhythmic/' + that.data.rhythmic + '/sn/' + that.data.sn
        console.log(url)
        wx: wx.request({
          url: url,
          success: function (res) {
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
      }

    }
  },
  refresh: function () {
    var list1 = {};
    var list2 = {};
    var pz_list = {};
    var rule_list = this.data.rule.split('。');
    for (var i = 0; i < rule_list.length; i++) {
      var x = rule_list[i].split('');
      list1[i] = x
      pz_list[i] = {}
    }
    list2[0] = 1
    var hang = rule_list.length - 1
    this.setData({
      list: list1,
      pz_list: pz_list,
      list_write: list1,
      list_input: list2,
      hang: hang
    })
  },
  onShareAppMessage: function () {
    if(this.data.canIshare == true){
    return {
      title: app.globalData.name + "的创作！",
      desc: app.globalData.name + "又有新作！快来围观！",
      path: '/pages/share/share?iscreating_id=' + this.data.sn
    }
    }
  }
})
