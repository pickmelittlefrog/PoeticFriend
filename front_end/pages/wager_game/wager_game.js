/**
 * @author 王亦强
 * 本页面位于pages/wager_game/wager_game.js
 * 主要实现了飞花令的界面，由于无法联机，只能本地一人发送飞花令。
 */

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wager: "花",
    input_value:"",
    gamer: [0, 1, 2, 3, 4, 5],
    sentence: ["化作春泥更护花", "", "", "", "", ""],
    userInfo: {},
    hasUserInfo: false,
    context: "",
    count:1
  },

  openConfirm: function() {
    wx.showModal({
      title: '飞花令',
      content: '每人每轮有30s作答时间，回答含有关键字的诗句；30s时间内可以多次作答。',
      confirmText: "确定",
      showCancel: false,
      success: function(res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击主操作')
        }
      }
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取用户信息
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  context: function(e) {
    this.setData({
      context: e.detail.value
    })
  },

  send: function() {
    if (this.test_wager()) {
      var curSentence = "sentence["+this.data.count+"]";
      this.setData({
        [curSentence]: this.data.context,
        count: this.data.count+1,
        input_value:""
      })
      setTimeout(this.clear, 1000)
    }
    else {
      wx.showModal({
        title: '提示',
        content: '请输入带"' + this.data.wager +'"的诗句/词句哦!',
        showCancel:false,
        confirmText:'好的'
      })
    }
  },

  test_wager: function(){
    return this.data.context.indexOf(this.data.wager) >= 0;
  },

  clear: function () {
      //要延时执行的代码
      if (this.data.count == 6) {
        this.setData({
          count: 0,
          sentence: ["", "", "", "", "", ""]
        })
      }
  }, 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})