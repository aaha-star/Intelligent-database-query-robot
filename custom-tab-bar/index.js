Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "../pages/image/icon_component.png",
      selectedIconPath: "../pages/image/icon_component_HL.png",
      text: "数据库"
    }, {
      pagePath: "/pages/mine/mine",
      iconPath: "../pages/image/icon_API.png",
      selectedIconPath: "../pages/image/icon_API_HL.png",
      text: "我的"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      console.log(e)
      const data = e.currentTarget.dataset
      const url = data.path
      console.log(url)
      wx.switchTab({url})

      this.setData({
        selected: data.index
      })
    }
  },

})