// pages/db-insert/db-insert.js
const app = getApp()
let gb=app.globalData
let login=require("../../utils/login")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    driverids:null
  },
  onLoad:function(){
    let that=this
    login.getopid()
    let openId=wx.getStorageSync('openid')
    wx.request({
      url:gb.baseurl+ '/driver/',
      date:{},
      method:"GET",
      header:{
        'content-type': 'application/json',
        'Authorization':openId
      },
      success(res){

        console.log(res.data.data)
        that.setData({
          driverids:res.data.data
        })
        
      },
      fail(res){
        console.log(res)
      }
    })
  },



  formSubmit: function(e){
    console.log(e.detail.value)
    let  dbdata=e.detail.value
    login.getopid()
    dbdata.openId=wx.getStorageSync('openid')
    console.log(dbdata.openid)
    console.log(dbdata)
    wx.request({
      url: app.globalData.baseurl+'/database/',
      data:dbdata,
      method:'post',
      header:{
        'content-type': 'application/json' ,// 默认值
        'Authorization':dbdata.openId
      },
      success(res){
        console.log(res)
      },
      console(res){
        console.log(res)
      }
      })
  }


  
})