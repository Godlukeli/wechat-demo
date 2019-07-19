// pages/newlist/newlist.js
import { ajax } from "../../utils/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    new:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "新闻列表"
    })
    
    console.log(options.url)
    this.setData({  //改变data的值
      new: options.title,
    })
    var url =options.url
    ajax({
      url: "http://47.103.16.105:1902/react/getNews",
      data: { 
        keyword: this.data.new
      },
      cb: (res) => {
        // console.log(res);
        this.setData({
          new: res.data.result
        })
      }
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