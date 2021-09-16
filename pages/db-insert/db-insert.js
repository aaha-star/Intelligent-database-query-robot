// pages/db-insert/db-insert.js
const app = getApp()
let gb=app.globalData
let login=require("../../utils/login")
let check=require("../../utils/checksname")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    items:[
      {value:'',name:'mysql'},
      {value:'',name:'sqlserve'},
      {value:'',name:'oracle'},
      {value:'',name:'postgresql'},
    ]
  },
  onLoad:function(){
    
    let that=this
    login.getopid()
    let openId=wx.getStorageSync('openid')
    console.log(openId)
    wx.request({
      url:gb.baseurl+ '/driver/',
      date:{},
      method:"GET",
      header:{
        'content-type': 'application/json',
        'Authorization':openId
      },
      success(res){
      console.log(res)
      for(let i=0;i<res.data.data.length;++i){
        let value='items['+i+'].value'
        console.log(value)
        that.setData({
          [value]:res.data.data[i].driverId
        })
      }
      },
      fail(res){
        console.log(res)
      }
    })
  },


  
  checkboxChange:function(e){
    console.log(e)
    this.setData({
      driverId:e.detail.value
    })
  },


  formSubmit: function(e){
    console.log(e.detail.value)

    let  dbdata=e.detail.value
    dbdata.dbDriverId=this.data.driverId
    check.checksname(dbdata.shortName)
    login.getopid()
    dbdata.openId=wx.getStorageSync('openid')

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
        wx.switchTab({
          url: '../index/index'
        })
      },
      console(res){
        console.log(res)
      }
      })
     
      

  }


  
})