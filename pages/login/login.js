// index.js
// 获取应用实例
const app = getApp()

Page({
  onLoad: function(options) {
        var that = this;  
        //查看是否授权   
        wx.getSetting({   
          success: function(res) {
            if (res.authSetting['scope.userInfo']) {
              console.log("用户授权了");
            } else {
              //用户没有授权
              console.log("用户没有授权");
            }
          }
        });
      },
  
    data:{
      avatarUrl:'0',
      nickName:'0',
      code:'0',
      openId:'0'
    },

    
  //通过wx.login接口获取用户code
  wechatLogin: function(event) {
      var that=this 
      wx.login({
        success(res){
          console.log(res)
          that.setData({
            code:res.code
          })
          that.openidRequests()
        },
        fail(res){
          console.log(res)
        }
      }),

      //通过wx.getUserProfile接口获取用户昵称以及头像链接
      wx.getUserProfile({
        desc:"正在登录",
        lang: 'zh_CN',
        success(res){
          console.log(res)
          let userInfo=res.userInfo
          that.setData({
            avatarUrl: userInfo.avatarUrl,
            nickName: userInfo.nickName 	// 通过 setData 存进去
          })
          that.storeUser()
        },
        fail(res){
          console.log(res)
        }
    })
  },
  
  // 获取openid
  openidRequests: function () {
    var that=this

    wx.request({
    url: app.globalData.baseurl+'/user/openId?code='+this.data.code,
 
    method:'GET',
    header: {
      'content-type': 'application/json' // 默认值
    },

    success(res){
      console.log(res)
      that.setData({
        openId:res.data.data.openId
      })
    },
    fail(res){
      console.log(res)
    }
    })
  },

  
  
  
  //保存用户信息
  storeUser:function ( ) {
    console.log(this.data)
    var that=this
    wx.request({
      url: 'http://api.mengxun.online/cxsj4/user/',
      data:{
        openId:that.data.openId,
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
    
  }

  });
    
