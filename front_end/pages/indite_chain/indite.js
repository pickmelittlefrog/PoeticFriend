/**
 * @author 王亦强
 * 以下代码位于pages/indite_chain/indite.js
 * 主要实现了多人创作的功能模块，其中分别包括赋诗和填词两个部分，页面跳转位于publish函数内，
 * @sentence 保存了每个诗/词句
 * @poem_name 保存了诗/词的名字
 * 由于多人功能尚未实现，尚未进行作者名的保存
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "无题",
    maxLen: 0,
    choice: [],
    reim: [1, 2, 3, 4],
    quatrain: [1, 2],
    sentence: new Array(), // 保存诗句
    index: 0,
    files: [],
    slider: 0, // 房间人数
    sentence_finished: new Array(), // 保存已经提交的诗句
    sentence_finished_cache: new Array(), // 缓存尚未提交的诗句
    countdown: 0, //减少还未提交的诗句数
    ready: false, //用于判断是否可以发布
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

  // 数据处理函数 日后可以考虑使用
  // parseData: function() {
  //   var parasList = [
  //     '凭高眺远，',
  //     '见长空万里，',
  //     '云无留迹。',
  //     '桂魄飞来光射处，',
  //     '冷浸一天秋碧。',
  //     '玉宇琼楼，',
  //     '乘鸾来去，',
  //     '人在清凉国。',
  //     '江山如画，',
  //     '望中烟树历历。'
  //   ]
  //   var json = [];
  //   for (var i = 0; i < parasList.length; i++) {
  //     var j = {};
  //     j.len = parasList[i].length - 1;
  //     j.id = i;
  //     j.punc = parasList[i].charAt(j.len);
  //     j.content = parasList[i].slice(0, j.len);
  //     json.push(j);
  //   }
  //   this.setData({
  //     verse_top_half: JSON.stringify(json)
  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var name = this.data.name;
    if (options.name != "") {
      name = options.name;
    }
    var index = options.index;
    var slider = options.slider;
    this.setData({
      name: name,
      index: index,
      slider: slider
    })
    if (index == 0 || index == 1) {
      this.setData({
        choice: this.data.reim,
        sentence_finished: [false, false, false, false, false, false, false, false],
        sentence_finished_cache: [false, false, false, false, false, false, false, false],
        countdown: 8
      })
    } else if (index == 2 || index == 3) {
      this.setData({
        choice: this.data.quatrain,
        sentence_finished: [false, false, false, false],
        sentence_finished_cache: [false, false, false, false],
        countdown: 4
      })
    } else this.setData({
      sentence_finished: new Array(),
      sentence_finished_cache: new Array(),
      countdown: this.data.verse_top_half.length
    })
    if (index == 0 || index == 2) {
      this.setData({
        maxLen: 5
      })
    } else {
      this.setData({
        maxLen: 7
      })
    }
  },

/**
 * 以下函数用于处理第一句诗（逗号之前），目测还可以和sentence2再次集成
 */
  sentence1: function(e) {
    var id = e.currentTarget.dataset.id;
    var target = 2 * id;
    var curSentence = "sentence[" + target + "]";
    var curSentenceFinished = "sentence_finished_cache[" + target + "]";
    this.setData({
      [curSentence]: e.detail.value
    })
    console.log(this.data.sentence[target]);
    if (e.detail.value.length == this.data.maxLen) {
      this.setData({
        [curSentenceFinished]: true,
        countdown: this.data.countdown - 1
      })
    }
  },
/**
 * 以下函数用于处理第二句诗（逗号之后）
 */
  sentence2: function(e) {
    var id = e.currentTarget.dataset.id;
    var target = 2 * id + 1;
    var curSentence = "sentence[" + target + "]";
    var curSentenceFinished = "sentence_finished_cache[" + target + "]";
    this.setData({
      [curSentence]: e.detail.value
    })
    console.log(this.data.sentence[target]);
    if (e.detail.value.length == this.data.maxLen) {
      this.setData({
        [curSentenceFinished]: true,
        countdown: this.data.countdown - 1
      })
    }
  },
/**
 * 以下函数用于处理作词部分
 * @id 用于保存id
 * @curSentence 保存现在所作的这句词
 */
  paras: function(e) {
    var id = e.currentTarget.dataset.id;
    var curSentence = "sentence[" + id + "]";
    var curSentenceFinished = "sentence_finished_cache[" + id + "]";
    this.setData({
      [curSentence]: e.detail.value
    })
    console.log(this.data.sentence[id]);
    if (e.detail.value.length == this.data.verse_top_half[id].len) {
      this.setData({
        [curSentenceFinished]: true,
        countdown: this.data.countdown - 1
      })
    }
  },
/**
 * 提交当前单句（由于还未实现多人功能，目前可以提交多句）
 */
  submit: function() {
    this.setData({
      sentence_finished: this.data.sentence_finished_cache
    })
    if (this.data.countdown == 0) {
      this.setData({
        ready: true
      })
    }
  },
/**
 * 发布你的作品，跳转回主页
 */
  publish: function() {
    // 除此之外应该还要传递发布所需数据,目前构想是扔给globaldata然后回主页时主页直接加载globaldata数据
    wx.switchTab({
      url: '../../pages/index/index'
    })
  },
/**
 * 选择图像
 */
  chooseImage: function(e) {
    var that = this;
    wx.chooseImage({
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
/**
 * 预览图像
 */
  previewImage: function(e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
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