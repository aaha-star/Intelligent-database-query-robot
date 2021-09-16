// pages/chatbot/chatbot.js
const app = getApp()
var plugin = requirePlugin("chatbot");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad:function(){
    var pages = getCurrentPages()    //获取加载的页面
    var currentPage = pages[pages.length - 1]    //获取当前页面的对象

    var url = currentPage.route    //当前页面url
    var options = currentPage.options    //如果要获取url中所带的参数可以查看options
    console.log(options)
    let dbid=options.id
    this.setData({
      dbid:dbid
    })
  },



  getQueryCallback: function(e) {
    console.log(e)
  },
  openWebview:function(e){
    let url = e.detail.weburl
    console.log(url)
    let parameter=this.getUrlword(url)
    console.log(parameter)
    let id=this.data.dbid
    let word=parameter.word
    let srSql=parameter.srSql
    wx.navigateTo({
        url: '/pages/srResult/srResult?id='+id+'&word='+word+'&srSql='+srSql
    })
  },

  getUrlword:function(url){
    let words=url.split("?")[1].split("&")
    let parameter=new Object()
    parameter.word=words[0].split("=")[1]
    parameter.srSql=words[1].split("=")[1]
    return parameter
  }
})