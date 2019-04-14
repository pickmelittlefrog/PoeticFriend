/**
 * @author 王亦强
 * 以下代码位于pages/indite_solo/indite.js
 * 主要实现了单人创作的功能模块，其中分别包括赋诗和填词两个部分，页面跳转位于publish函数内，
 * @sentence 保存了每个诗/词句
 * @poem_name 保存了诗/词的名字
 * 由于和多人创作功能近似，不多做赘述
 */

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "无题",
    maxLen: 0,
    author: "",
    choice: [],
    reim: [1, 2, 3, 4],
    quatrain: [1, 2],
    sentence: new Array(),
    index: 0,
    files: [],
    verse_content: '　　凭高眺远，见长空万里，云无留迹。桂魄飞来光射处，冷浸一天秋碧。玉宇琼楼，乘鸾来去，人在清凉国。江山如画，望中烟树历历。\n　　我醉拍手狂歌，举杯邀月，对影成三客。起舞徘徊风露下，今夕不知何夕。便欲乘风，翻然归去，何用骑鹏翼。水晶宫里，一声吹断横笛。',
    parasList: [
      '凭高眺远，',
      '见长空万里，',
      '云无留迹。',
      '桂魄飞来光射处，',
      '冷浸一天秋碧。',
      '玉宇琼楼，',
      '乘鸾来去，',
      '人在清凉国。',
      '江山如画，',
      '望中烟树历历。'
    ],
    verse_top_half: [{
      "len": 4,
      "id": 0,
      "punc": "，",
      "content": "凭高眺远"
    }, {
      "len": 5,
      "id": 1,
      "punc": "，",
      "content": "见长空万里"
    }, {
      "len": 4,
      "id": 2,
      "punc": "。",
      "content": "云无留迹"
    }, {
      "len": 7,
      "id": 3,
      "punc": "，",
      "content": "桂魄飞来光射处"
    }, {
      "len": 6,
      "id": 4,
      "punc": "。",
      "content": "冷浸一天秋碧"
    }, {
      "len": 4,
      "id": 5,
      "punc": "，",
      "content": "玉宇琼楼"
    }, {
      "len": 4,
      "id": 6,
      "punc": "，",
      "content": "乘鸾来去"
    }, {
      "len": 5,
      "id": 7,
      "punc": "。",
      "content": "人在清凉国"
    }, {
      "len": 4,
      "id": 8,
      "punc": "，",
      "content": "江山如画"
    }, {
      "len": 6,
      "id": 9,
      "punc": "。",
      "content": "望中烟树历历"
    }]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var name = this.data.name;
    if (options.name != "") {
      name = options.name;
    }
    var index = options.index;
    this.setData({
      name: name,
      index: index
    })
    if (index == 0 || index == 1) {
      this.setData({
        choice: this.data.reim
      })
    } else {
      this.setData({
        choice: this.data.quatrain
      })
    }
    if (index == 0 || index == 2) {
      this.setData({
        maxLen: 5
      })
    } else {
      this.setData({
        maxLen: 7
      })
    }

    var userInfo = app.globalData.userInfo;
    this.setData({
      author:userInfo.nickName
    })
  },


  sentence1: function(e) {
    var id = e.currentTarget.dataset.id;
    var curSentence = "sentence[" + 2 * id + "]";
    this.setData({
      [curSentence]: e.detail.value
    })
    console.log(this.data.sentence[2 * id]);
  },

  sentence2: function(e) {
    var id = e.currentTarget.dataset.id;
    var curSentence = "sentence[" + (2 * id + 1) + "]";
    this.setData({
      [curSentence]: e.detail.value
    })
    console.log(this.data.sentence[2 * id + 1]);
  },

  paras: function(e) {
    var id = e.currentTarget.dataset.id;
    var curSentence = "sentence[" + id + "]";
    this.setData({
      [curSentence]: e.detail.value
    })
    console.log(this.data.sentence[id]);
  },

  chooseImage: function(e) {
    var that = this;
    wx.chooseImage({
      count:1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },

  previewImage: function(e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },

  deleteImage: function (e) {
    var files = [];
    this.setData({
      files: files
    });
  },

// {
//     "poem_id": "12345",//由后端生成的唯一序列
//     "title": "春色满园关不住",
//     "master": "小新",//房主
//     "authors": ["小新", "风间", "妮妮", "正南"],
//     "cover_url": "http://xxx.com/pics/xiaoxin.pic",//封面图片的地址
//     "like_count": 20,//被点赞次数
//     "average_score": 9.01,//平均得分
//     "publish_timestamp": 1488481383,//发布时间
//     "is_Regular": false,
//     "paragraphs": [
//       "衔泥燕，", "飞到画堂前。", "占得杏梁安稳处，", "体轻唯有主人怜，", "堪羡好因缘。"
//     ],
//     "comments": [
//       {
//         "is_first_comment": true,//是否为一级评论
//         "comment_content": "blablabla",//评论内容
//         "comment_id": "10",//该条评论的id，后端生成，只有一级评论有，二级评论该字段为空
//         "comment_user_name": "小新",//评论人用户名
//         "usr_pic_url": "http://",//评论人头像图片,只有为一级评论时才需要，其余情况为空
//         "reply_user_name": "风间",//该评论是回复给谁的，若为一级评论该字段为空
//         "reply_comment_id": "5",//二级评论所在一级评论的id，一级评论的该字段为空
//         "comment_timestamp": 1488481383,//评论时间
//       },{},{},{},{}...//所有评论
//     ]
//   },


  publish: function() {
    // 除此之外应该还要传递发布所需数据
    var poem = {};
    poem.poem_id = 1;
    poem.title = this.data.name;
   
    var userInfo = app.globalData.userInfo;
    console.log(userInfo);
    poem.master = userInfo.nickName;
    poem.authors = new Array(userInfo.nickName);
    wx.switchTab({
      url: '../../pages/index/index'
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