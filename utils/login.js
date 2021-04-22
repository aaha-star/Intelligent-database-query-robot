var app=getApp()
let nowopid=app.globalData.nowuseropid
function wechatLogin(){
  var that=this 
  wx.login({
    success(res){
    openidRequests(res.code)

   
  },
    fail(res){
      console.log(res)
    }
  })
}


function openidRequests(code) {
var that=this

wx.request({
url: "http://api.mengxun.online/cxsj4/user/openId?code="+code,

method:'GET',
header: {
  'content-type': 'application/json' // 默认值
},

success(res){
  let opid=res.data.data.openId
  nowopid=opid
},
fail(res){
  console.log(res)
}
})
}

function getopenid(){
let that=this
app.getOpenid().then(function (res) {
  if (res.status == 200) {
  
     let opid=wx.getStorageSync('openid')
     console.log("已将openid存入Storage，openid为"+opid)
  } else {
    console.log(res.data);
  }
}); 
}

function setcb(){
  
}
module.exports={
  welogin:wechatLogin,
  opidget:openidRequests,
  getopid:getopenid
}