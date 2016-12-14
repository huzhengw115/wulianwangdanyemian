angular.module('WxService', [])

.service('WeixinService', function () {
  
  //去获取url签名什么的方法
  var getStamp = function () {

  }
  
  var config = function () {
    //现在先自己定义一些
    var dongxi = {
      'appId': '123123',
      'timestamp': 'timestamp',
      'nonceStr': 'nonceStr',
      'signature': 'signature'
    }

    wx.config({
      debug: true,      // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: dongxi.appId,        // 必填，公众号的唯一标识
      timestamp: dongxi.timestamp,      // 必填，生成签名的时间戳
      nonceStr: dongxi.nonceStr,     // 必填，生成签名的随机串
      signature: dongxi.signature,    // 必填，签名，见附录1
      jsApiList: [      // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        'onMenuShareTimeline',
        'onMenuShareAppMessage'
      ]
    })

    wx.error(function (res) {
      console.log('res:',res)
    })

  }

  return {
    getStamp: getStamp,
    config: config
  }

})

.service('WeixinShare', function () {

  var wxShare = function (title, picture, url, desc) {
    
    wx.onMenuShareTimeline({
      title: title, // 分享标题
      link: url, // 分享链接
      imgUrl: picture, // 分享图标
      success: function () { 
          // 用户确认分享后执行的回调函数
      },
      cancel: function () { 
          // 用户取消分享后执行的回调函数
      }
    })

    wx.onMenuShareAppMessage({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: url, // 分享链接
      imgUrl: picture, // 分享图标
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () { 
          // 用户确认分享后执行的回调函数
      },
      cancel: function () { 
          // 用户取消分享后执行的回调函数
      }
    })

  }
})