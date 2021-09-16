const app = getApp();
const plugin = requirePlugin('WechatSI');
Page({
  data: {
    content: '今天是个好天气',
    src: '',
    translateResult: '此处显示翻译结果'
  },
  onReady(e) {
    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.onError(function(res) {
      console.log(res);
      wx.showToast({
        title: '语音播放失败',
        icon: 'none',
      })
    })
  },
  inputChange: function(e) {
    this.setData({
      content: e.detail.value,
    })
  },
  playVoice: function(e) {
    var that = this;
    var content = this.data.content;
    plugin.textToSpeech({
      lang: "zh_CN",
      tts: true,
      content: content,
      success: function(res) {
        console.log(res);
        console.log("succ tts", res.filename);
        that.setData({
          src: res.filename
        })
        that.play();
      },
      fail: function(res) {
        console.log("fail tts", res)
      }
    })
  },

  play: function(e) {
    if (this.data.src == '') {
      console.log(暂无语音);
      return;
    }
    this.innerAudioContext.src = this.data.src
    this.innerAudioContext.play();
  },


  stopVoice: function(e) {
    this.innerAudioContext.pause();
  },

  translateToEnglish: function(e) {
    var that = this;
    that.translate("zh_CN", "en_US")
  },

  translateToChinese: function(e) {
    var that = this;
    that.translate("en_US", "zh_CN")
  },

  translate: function(lfrom, lto) {
    var that = this;
    var content = this.data.content;
    plugin.translate({
      lfrom: lfrom,
      lto: lto,
      content: content,
      success: function(res) {
        if (res.retcode == 0) {
          console.log("result", res.result)
          that.setData({
            translateResult: res.result
          })

        } else {
          console.warn("翻译失败", res)
          that.setData({
            translateResult: "翻译失败"
          })
        }
      },
      fail: function(res) {
        console.log("网络失败", res)
        that.setData({
          translateResult: "网络失败"
        })
      }
    })
  }

})

