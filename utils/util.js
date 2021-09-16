let app=getApp()
let baseurl=app.globalData.baseurl



const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
function dbquery(dbid){
  wx.redirectTo({
    url: '/pages/chatbot/chatbot?id='+dbid,
  })
}

function dbmodify(dbid){
    wx.redirectTo({
      url: '/pages/db-modify/dbmodify?id='+dbid,
    })
}


function dbdelete(dbid){
      let opid=wx.getStorageSync('openid')
      wx.request({
        url: baseurl+'/database/'+dbid,
        method:"DELETE",
        data:{},
        header:{
          'content':'application/json',
          'Authorization':opid
        },
        success(res){
          console.log(res)
          wx.switchTab({
            url: '../index/index',
            success: function (e) {
              var page = getCurrentPages().pop();
              if (page == undefined || page == null) return;
              page.onLoad();
            }
          })
        },
        fail(res){
          console.log(res)
        }
      })
}

function getAccesstoken(){
  wx.request({
    url:' https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx6a0d19e2490d51d5&secret=02d8da61a66479cdbf4577c72ff1877b',
    method:'GET',
    header:{
      'content':'application/json',
    },
    success(res){
      console.log(res)
    },
    fail(res){
      console.log(res)
    }
  })
}

function ZUtranslate(word){
    
}

module.exports = {
  formatTime,
  getAccesstoken:getAccesstoken,
  dbquery:dbquery,
  dbmodify:dbmodify,
  dbdelete:dbdelete,
}
