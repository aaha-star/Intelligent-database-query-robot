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
    url: '/pages/yuyin/yuyin?id='+dbid,
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
          })
        },
        fail(res){
          console.log(res)
        }
      })
}


module.exports = {
  formatTime,
  dbquery:dbquery,
  dbmodify:dbmodify,
  dbdelete:dbdelete,
}
