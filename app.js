// app.js
App({
  onLaunch() {
    let nowopid=this.globalData.nowuseropid
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    let that=this
    // 登录
    wx.login({
  
    })
  },

getOpenid: function () {
  var that = this;
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        //code 获取用户信息的凭证
        if (res.code) {
          //请求获取用户openid
          wx.request({
            url: "http://api.mengxun.online/cxsj4/user/openId?code="+res.code,
            method: 'GET',
            header: {
              'Content-type': 'application/json'
            },
            success: function (res) {
              wx.setStorageSync('openid', res.data.data.openId);//存储openid
              var res = {
                status: 200,
                data: res.data.data.openid
              }
              resolve(res);
            }
          });
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
          reject('error');  
        }
      }
    })
  });
},

  globalData: {
    nowuseropid:null,
    userInfo: null,
    baseurl: "http://api.mengxun.online/cxsj4"
  }
})
