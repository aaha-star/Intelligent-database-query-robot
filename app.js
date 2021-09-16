// app.js
var plugin = requirePlugin("chatbot");
App({
  onLaunch() {
    let nowopid=this.globalData.nowuseropid
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    let that=this
    let opId=wx.getStorageSync('openid')



    plugin.init({
      appid: "xollf73uAAggKwCpdc6rE1WAOIx1vV",
      openid: "oYy7J5Hz6qnTLE-02CFixOUH7k78", // 小程序的openid，必填项
      success: () => {},
      fail: error => {console.log("nivsi")},
      guideList:['开始查询','结束查询','显示学生表'],
      textToSpeech: 1,
      welcome: "请问有什么需要帮助？",
      background: "rgba(247,251,252,1)",
      guideCardHeight: 40,
      operateCardHeight: 90,
      history: true,
      navHeight: 0,
      robotHeader: 'https://res.wx.qq.com/mmspraiweb_node/dist/static/miniprogrampageImages/talk/leftHeader.png',
      userHeader: 'https://res.wx.qq.com/mmspraiweb_node/dist/static/miniprogrampageImages/talk/rightHeader.png',
      userName: 'xgy',
      anonymous: false,
      hideMovableButton: false
   });
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
