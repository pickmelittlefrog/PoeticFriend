/**
 * @author 王亦强
 * 本页面位于pages/room/room.js
 * 实现了多人创作时，在房间中等待好友加入的功能。
 * 由于还未实现多人联机，所以尚未对进入房间的朋友人数进行判断。
 */

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    grids: [0, 1, 2, 3, 4, 5],
    name: '无题',
    index: 0,
    slider:2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var name = this.data.name;
    if (options.name != "") {
      name = options.name;
    }
    var slider = options.slider;
    var index = options.index;
    var grids = this.data.grids.slice(0, slider);
    this.setData({
      name: name,
      index: index,
      slider: slider,
      grids: grids
    })
    console.log(slider);
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

  start_indite: function(e){
    wx.navigateTo({
      url: '../indite_chain/indite?name=' + this.data.name + '&index='+this.data.index+'&slider='+this.data.slider,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})