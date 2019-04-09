/**
 * @author 王亦强
 * 本文件位于pages/poem_chain/poem_chain.js
 * 主要实现了单人创作 类别与诗/词名 选择的界面
 */

//获取应用实例
const App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: -1,
    poem_type: false,
    poem_name: "",
    focus: false,
    array: ['五言律诗', '七言律诗', '五言绝句', '七言绝句', '词'],
    verse: ['念奴娇','沁园春','蝶恋花'],
    verseIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  /**
   * 点击--判断用户选择诗或词
   */
  poem_type: function() {
    this.setData({
      poem_type: true
    })
  },

  /**
   * 点击--跳转到赋诗页面
   */
  indite: function() {
    var index = this.data.index;
    var page = '';
    wx.navigateTo({
      url: '../../pages/indite_solo/indite?name=' + this.data.poem_name + '&index=' + this.data.index,
    })
  },

  poem_name: function(e) {
    this.setData({
      poem_name: e.detail.value
    })
  },

  select: function(e) {
    console.log(e.currentTarget.dataset.id)
  },

  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  bindVerseChange(e) {
    this.setData({
      verseIndex: e.detail.value,
      poem_name: this.data.verse[e.detail.value]
    })
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