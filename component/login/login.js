// component/login/login.js
const app=getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    Logins:{
      type:Number,
      value:'niao'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

    wechatLogin(){
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
      })
  },


  openidRequests() {
    var that=this

    wx.request({
    url: app.globalData.baseurl+'/user/openId?code='+this.data.code,
 
    method:'GET',
    header: {
      'content-type': 'application/json' // 默认值
    },

    success(res){
      app.globalData.nowuseropid=res.data.data.openId
      console.log(res)
    },
    fail(res){
      console.log(res)
    }
    })
  },

},
})

