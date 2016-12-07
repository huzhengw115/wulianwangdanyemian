angular.module('starter.services', [])

.service('newsService', ['$http', '$q', function ($http, $q) {
	var getNewsData = function () {
		var newsData = []
		var deferred = $q.defer()
		$http.get('json/news.json')
		.success(function (data) {
			newsData = data
			deferred.resolve(newsData)
		})
		.error(function () {
			console.log('读取资讯失败')
			deferred.reject()
		})
		return deferred.promise
	}
	var getProjectData = function () {
		var projectData = []
		var deferred = $q.defer()
		$http.get('json/project.json')
		.success(function (data) {
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
