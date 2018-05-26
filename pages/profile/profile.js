//pages/profile/profile.js
Page({
  getProfile(res) {
    //console.log(res.detail.userInfo)  //console.log()函数
    this.setData({
      "profile": res.detail.userInfo
    })
  },
  data: {
    "profile": {
      nickName: '请登陆'
      //"avatarUrl": '/image/profile/avatar.png'
    }
  }
})
