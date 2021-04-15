const app = getApp()
let gb=app.globalData
let login=require("../../utils/login")
let check=require("../../utils/checksname")
Page({
    onLoad:function(){
      
      let that=this
      login.getopid()
      let openId=wx.getStorageSync('openid')
      wx.request({
        url:gb.baseurl+'/database/',
        data:{},
        method:"GET",
        header:{
          content:"application/json",
          'Authorization':openId
        },
        success(res){
          that.setData({
            dbarrays:res.data.data
          })
          console.log(res)
        },
        fail(res){
          console.log(res)
        },
    })
    check.checksname()
  },

    onShow:function() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    },


    db_insert: function(){
      wx.navigateTo({
        url: '../db-insert/db-insert',
  
      })
    },
  
    showActionSheet: function(){
     wx.showActionSheet({
       itemList: ['nihao1','nihao2'],
     })
    }

})







 