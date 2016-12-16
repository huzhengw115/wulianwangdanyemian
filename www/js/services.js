angular.module('starter.services', [])

//所有数据的读取
.service('newsService', ['$http', '$q', function ($http, $q) {
  //表格标题数据
  var tableTitle = [{"attachment":"方案介绍","investment":"投入资金","advantage":"方案优势","effect":"预期效果","benefit":"预期产生效益","range":"应用范围","difficulty":"实施难度程度","place":"适用场景"}]
  //资讯页面的数据读取，newsID值由上层的controller传递而来
	var getNewsData = function (newsId) {
		var newsData = []
		//由url中的ID值来控制读取的数据是什么
		var url = 'http://gov.im2m.com.cn/api/news/detail/id/'
		url += newsId
		url += '?callback=JSON_CALLBACK'
		var deferred = $q.defer()
		$http.get('json/news.json')
		//$http.jsonp(url)
		.success(function (data) {
			console.log('data:', data)
			newsData = data
			deferred.resolve(newsData)
		})
		.error(function (err) {
			console.log('读取资讯失败err: ', err)
			deferred.reject(err)
		})
		return deferred.promise
	}
	//方案页面的数据读取
	var getProjectData = function (projectId) {
		var projectData = []
		var deferred = $q.defer()
		var url = 'http://gov.im2m.com.cn/api/Solutions/detail/id/'
		url += projectId
		url += '?callback=JSON_CALLBACK'
		$http.get('json/project.json')
		//$http.jsonp(url)
		.success(function (data) {
			console.log('data:', data)
			projectData = data
			deferred.resolve(projectData)
		})
		.error(function () {
			console.log('读取方案失败')
			deferred.reject()
		})
		return deferred.promise
	}
	return {
		getNewsData: getNewsData,
		getProjectData: getProjectData,
    tableTitle: tableTitle
	}
}])

//加载动画的方法
.factory('LoaderService', ['$rootScope', '$ionicLoading', function ($rootScope, $ionicLoading) {
  return {
  	//页面加载时的动画效果
    show: function () {
      $rootScope.loading = $ionicLoading.show({
        template: '<i>加载中...</i>',
        animation: 'fade-in',
        showBackdrop: true,
        minWidth: 200,
        showDelay: 10
      })
    },
    //页面加载完成之后关闭动画效果
    hide: function () {
      $ionicLoading.hide()
    }
  }
}])

// 图片的放大插件
.service('swipeService', ['$document', function ($document) {
  var photoswipe = function () {
    var items = []
    var pswpElement = document.querySelectorAll('.pswp')[0]
    var options = {
      index: 0,
      shareEl: false,
      tapToClose: true  
    }

    function imgOnload(img, index) {
      return function () {
        // console.log("imgOnload: [index, img]", index, img);
        // 只有实际图片宽度大于250时，才需要放大图片，否则可能时图标或者无需放大的图片。
        if (img.naturalWidth > 250) {
          var item = {
            src: img.src,
            w: img.naturalWidth,
            h: img.naturalHeight
          }
          items.push(item)
          angular.element(img).bind("click", bindImg(index))
        }
      }
    }

    function bindImg(index) {
      return function () {
        console.log("bindImg: [index, items]", index, items)
        options.index = index
        var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options)
        gallery.init()
        gallery.goTo(index)
      }
    }

    var databigpic = angular.element($document.find("main"))
    databigpic.ready(function () {
      var imgs = databigpic.find("img")
      console.log('imgs:',imgs)
      for(var index = 0; index < imgs.length; ++index) {
        var img = imgs[index]
        if(img.naturalWidth == 0 && img.naturalHeight == 0) {
          // 绑定图片加载完成事件，加载完以后才能获取图片Size
          angular.element(img).bind("load", imgOnload(img, index))
        } else {
          imgOnload(img, index)();
        }
      }
    })
  }
  return{
    photoswipe: photoswipe
  }
}])
