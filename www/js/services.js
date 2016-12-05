angular.module('starter.services', [])

.service('newsService', function ($http, $q) {
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
})
