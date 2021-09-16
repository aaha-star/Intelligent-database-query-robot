// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number:0,
    nickName:"未登录",
    src:"/images/index1.png",
    newsList: []
  },
  // 获取个人信息
  getMyInfo:function(e){

    let openid=wx.getStorageSync('openID')
    let that=this
    wx.getUserProfile({
      desc:"正在登录",
      lang: 'zh_CN',
      success(res){
        console.log(res)
        let userInfo=res.userInfo
        that.setData({
          avatarUrl: userInfo.avatarUrl,
          nickName: userInfo.nickName, 	// 通过 setData 存进去
          isLogin:true
        })
        wx.request({
          url: 'http://api.mengxun.online/cxsj4/user/',
          data:{
            openId:openid,
            nickName:that.data.nickName,
            avatar:that.data.avatarUrl,
          },
          method:'POST',
          header:{
            'content-type': 'application/json' // 默认值
          },
          success(res){
            console.log(res)
          },
          fail(res){
            console.log(res)
          }
      
        })
      },
      fail(res){
        console.log(res)
      }
  })

  },

  onShow: function () {
    if( this.data.isLogin ){
      this.getMyFavorites()
    }

      if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
      selected: 1
      })
    
  }
},


})