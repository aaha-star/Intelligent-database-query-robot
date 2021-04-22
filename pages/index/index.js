const app = getApp()
let gb = app.globalData
let login = require("../../utils/login")
let check = require("../../utils/checksname")
let dbop = require("../../utils/util")
Page({
  onLoad: function () {
    console.log("执行了onLoad函数")
    let that = this
    login.getopid()
    let openId = wx.getStorageSync('openid')

    wx.request({
      url: gb.baseurl + '/database/',
      data: {},
      method: "GET",
      header: {
        'content': "application/json",
        'Authorization': openId
      },
      success(res) {
        that.setData({
          dbarrays: res.data.data
        })
        // console.log(res)
      },
      fail(res) {
        console.log(res)
      },
    })

  },

  onShow: function () {
    this.onLoad()
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },


  db_insert: function () {
    wx.navigateTo({
      url: '../db-insert/db-insert',

    })
  },

  dboption: function (e) {
    let dbid = e.target.id
    let that = this
    wx.showActionSheet({
      itemList: ['查询', '修改', '删除'],
      success(res) {
        let index = res.tapIndex
        switch (index) {
          case 0: dbop.dbquery(dbid); that.onLoad(); break;
          case 1: dbop.dbmodify(dbid); console.log("执行了dbmodify函数"); that.onShow(); break;
          case 2: dbop.dbdelete(dbid); console.log("执行了dbdelete函数"); that.onShow(); break;
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })

  }


})







