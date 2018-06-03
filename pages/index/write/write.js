//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    rule: "中仄仄平平，中仄平平。中平中仄仄平平。中仄中平平仄仄，中仄平平。中仄仄平平，中仄平平，中平中仄仄平平。中仄中平平仄仄，中仄平平。",
    focus:false,
    input_value:''
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
          pz_list: pz_list
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
  onShow: function () {
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
    this.setData({
      list: list1,
      pz_list: pz_list,
      list_write: list1,
      list_input: list2
    })
  }
})
