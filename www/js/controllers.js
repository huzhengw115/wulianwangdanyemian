angular.module('starter.controllers', [])

.controller('NewsCtrl', function ($scope, newsService) {
	var getNewsData = function () {
		newsService.getNewsData().then(function (newsData) {
			$scope.newsData = newsData
			console.log('$scope.newsData:',$scope.newsData)
		})
	}
	getNewsData()
})

.controller('ProjectCtrl', function ($scope, newsService) {
	$scope.projectData = []
	var getProjectData = function () {
		newsService.getProjectData().then(function (projectData) {
			$scope.projectData = projectData
			console.log('$scope.projectData:',$scope.projectData)
		})
	}
	$scope.showTable = function (data) {
		$scope.isShow = true
		console.log(data)
		$scope.tableShow = data
		console.log($scope.tableShow)
	}
	$scope.hideTable = function () {
		$scope.isShow = false
	}
	getProjectData()
})
