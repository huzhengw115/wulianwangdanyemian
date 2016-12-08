angular.module('starter.services', [])

.service('newsService', ['$http', '$q', function ($http, $q) {
	var getNewsData = function (newsId) {
		var newsData = []
		var url = 'http://gov.im2m.com.cn/api/news/detail/id/'
		url += newsId
		url += '?callback=JSON_CALLBACK'
		var deferred = $q.defer()
		//$http.get('json/news.json')
		$http.jsonp(url)
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
	var getProjectData = function (projectId) {
		var projectData = []
		var deferred = $q.defer()
		var url = 'http://gov.im2m.com.cn/api/Solutions/detail/id/'
		url += projectId
		url += '?callback=JSON_CALLBACK'
		//$http.get('json/project.json')
		$http.jsonp(url)
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

.factory('LoaderService', ['$rootScope', '$ionicLoading', function ($rootScope, $ionicLoading) {
  return {
    show: function () {
      $rootScope.loading = $ionicLoading.show({
        template: '<i>加载中...</i>',
        animation: 'fade-in',
        showBackdrop: true,
        minWidth: 200,
         showDelay: 10
      })
    },
    hide: function () {
      $ionicLoading.hide()
    }
  }
}])
