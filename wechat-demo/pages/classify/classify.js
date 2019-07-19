// pages/classify/classify.js
import { ajax } from "../../utils/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news:[],
    goods:[],
    show:false,
    toggle: true,
  },

  audioPlay() {
    this.audioCtx.play();  //开始
  },
  audioPause() {
    this.audioCtx.pause();  //暂停
  },

  showWarning() {   //不是wifi观看的提示
    this.videoContext.pause();   //这个弹框出来的时候视频暂停
    wx.showModal({
      title: '警告',
      content: '你正在使用4G流量观看视频!!!',
      cancelText: "暂停播放",
      cancelColor: "#000000",
      confirmText: "继续播放",
      confirmColor: "#d81e06",
      success: (res) => {     //一定要是箭头函数
        if (res.confirm) {
          console.log('用户点击确定')

          wx.showToast({
            title: '土豪,你继续',
            icon: 'success',
            duration: 500
          })
          wx.setStorageSync("play", true)    //继续播放
          this.videoContext.play();
          this.setData({
            toggle: true  //  加一个开关
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  videoplay() {   //正在播放  刚开始播放的时候就是4G网络
    if (!wx.getStorageSync("play")) {
      this.showWarning();    //4g网络的时候弹出提示框
    }
  },
  videoupdate() {   //刚开始播放WiFi  播放途中切换到4G
    console.log("正在playing")
    if (!wx.getStorageSync("play") && this.data.toggle) {
      this.showWarning();  //点击取消播放  暂停
      this.setData({
        toggle: !this.data.toggle   // 开关
      })
    }
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     ajax({
       url:"http://47.103.16.105:1902/react/allNews",  //请求新闻列表的数据
       cb:(res)=>{
         console.log(res);
         this.setData({
           news:res.data.result
           
         })
       }
     })
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.audioCtx = wx.createAudioContext('myAudio')  //按钮播放音乐
    this.videoContext = wx.createVideoContext('myVideo')

    wx.getNetworkType({    //获取网络状态
      success(res) {
        const networkType = res.networkType;
        console.log(networkType)
        if (networkType == "wifi") {  //判断网路状态  存一个布尔值
          wx.setStorageSync("play", true)
        } else {
          wx.setStorageSync("play", false)
        }
      }
    })
    wx.onNetworkStatusChange(function (res) {  //切换网络状态的情况
      console.log(res.networkType)
      const networkType = res.networkType;
      if (networkType == "wifi") {
        wx.setStorageSync("play", true)
      } else {
        wx.setStorageSync("play", false)
      }
    })
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