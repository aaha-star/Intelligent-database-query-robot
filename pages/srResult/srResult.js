// pages/srResult/srResult.js
const app = getApp();
let baseurl=app.globalData.baseurl
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pages = getCurrentPages()    //获取加载的页面
    var currentPage = pages[pages.length - 1]    //获取当前页面的对象

    var url = currentPage.route    //当前页面url
    var options = currentPage.options    //如果要获取url中所带的参数可以查看options
    this.setData({
      dbid:options.id,
      word:options.word,
      srSql:options.srSql
    })
    let openId=wx.getStorageSync('openid')
    let data={}
    data.dbId=this.data.dbid
    data.srSql=this.data.srSql
    let that=this
    wx.request({
      url: baseurl+'/select/',
      data:data,
      method:"POST",
      header:{
        'content-type': 'application/json',
        'Authorization':openId
      },
      success(res){
        console.log(res.data.data)
        let searcharra=new Array()
        for(let i=0;i<res.data.data.length;++i){
          that.setData({
            searcharray:res.data.data
          })
          that.setData({
            keylist:Object.keys(that.data.searcharray[0]),
          })
          let searcharray=that.data.searcharray
          that.setData({
            valuelist:" "
          })
          for(let i=0;i<searcharray.length;i++){
            var param = {};
            var string = "valuelist[" + that.data.valuelist.length + "]";
            param[string] =Object.values(that.data.searcharray[i])
            that.setData(param);
        
          }
          console.log(that.data.valuelist)
        }
     

      },
      fail(res){
        console.log(res)
      }
    })
  
  },

})