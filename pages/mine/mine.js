// index.js
// 获取应用实例
const app = getApp()
let login=require("../../utils/login.js")

Page({
  date:{
    id:null
  },
    onLoad: function () {
      var that = this;  
      app.getOpenid().then(function (res) {
        if (res.status == 200) {
          that.setData({
            id: wx.getStorageSync('openid')
          })
        } else {
          console.log(res.data);
        }
      }); 
    },
  onShow:function(){
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
    selected: 1
    })
  }

  },

  onReady:function(){

  },
})