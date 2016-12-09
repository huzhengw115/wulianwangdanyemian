angular.module('starter.services', [])

//所有数据的读取
.service('newsService', ['$http', '$q', function ($http, $q) {
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
		getProjectData: getProjectData
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
