let app=getApp()
let gb=app.globalData

function checkshortname(sname){

  let openId=wx.getStorageSync('openid')
  
  wx.request({
    url: gb.baseurl+'/database/',
    method:"GET",
    data:{},
    header:{
      'content-type': 'application/json',
      'Authorization':openId
    },
    success(res){
      let i=0
      let shortnames=res.data.data
      for(i=0;i<shortnames.length;++i){
        shortnames[i]=shortnames[i].shortName
      }
      for(i=0;i<shortnames.length;++i){
        if(sname==shortnames[i]){
            wx.showModal({
              showCancel: "false",
              title: '提示',
              content: '短名重复，请重新输入短名，'
            })
        }
      }

    }
  })
}

module.exports={
  checksname:checkshortname
}