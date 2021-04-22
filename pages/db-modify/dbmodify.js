// pages/db-modify/dbmodify.js
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})