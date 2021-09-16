// pages/db-modify/dbmodify.js
const app = getApp()
let gb=app.globalData
let baseurl=app.globalData.baseurl
let login=require("../../utils/login")
let check=require("../../utils/checksname")

Page({



  /**
   * 生命周期函数--监听页面加载
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

  onReady: function () {

  },


  onShow: function () {

  },
 
  formSubmit:function(e){
    console.log(e)
    var pages = getCurrentPages()    //获取加载的页面
    var currentPage = pages[pages.length - 1]    //获取当前页面的对象

    var url = currentPage.route    //当前页面url
    var options = currentPage.options    //如果要获取url中所带的参数可以查看options
    let id=options.id//获取到了携带参数dbid
    let dbdata=e.detail.value
    dbdata.dbDriverId=this.data.driverId
    console.log(dbdata.dbDriverId)
    let opid=wx.getStorageSync('openid')
    console.log(opid)
    wx.request({
      url:baseurl+'/database/'+id,
      data:dbdata,
      method:"PUT",
      header:{
        'content':'application/json',
        'Authorization':opid
      },
      success(res){
        console.log(res)
        wx.switchTab({
          url: '../index/index',
        })
      },
      fail(res){
        console.log(res)
      }
    })
  }

})