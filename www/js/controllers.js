angular.module('starter.controllers', [])

.controller('NewsCtrl', ['$scope', 'newsService', 'swipeService', 'LoaderService', '$stateParams', function ($scope, newsService, swipeService, LoaderService, $stateParams) {
	var getNewsData = function () {
		var newsId = $stateParams.newsId
		console.log('newsId:', newsId)
		LoaderService.show()
		newsService.getNewsData(newsId).then(function (newsData) {
			$scope.newsData = newsData
			console.log('$scope.newsData:',$scope.newsData)
			swipeService.photoswipe()
			if($scope.newsData.pic == '') {
				$scope.isPicShow = false
			}else {
				$scope.isPicShow = true
			}
		})
		LoaderService.hide()
	}
	getNewsData()
}])

.controller('ProjectCtrl', ['$timeout', '$scope', 'newsService', 'swipeService', 'LoaderService', '$stateParams', function ($timeout, $scope, newsService, swipeService, LoaderService, $stateParams) {
	$scope.projectData = []
	$scope.openButton = true
	var getProjectData = function () {
		var projectId = $stateParams.projectId
		console.log('projectId:', projectId)
		LoaderService.show()
		newsService.getProjectData(projectId).then(function (projectData) {
			$scope.projectData = projectData
			console.log('$scope.projectData:',$scope.projectData)
			swipeService.photoswipe()
		})
		LoaderService.hide()
	}
	$scope.showTable = function (data) {
		$scope.isShow = true
		$scope.tableShow = data
		console.log($scope.tableShow)
		$timeout(function() {
			$scope.isTableShow = !$scope.isTableShow
		}, 50)
	}
	$scope.hideTable = function () {
		$scope.isShow = false
		$scope.isTableShow = !$scope.isTableShow
	}
	$scope.toBeLong = function () {
		$scope.projectTable = !$scope.projectTable
		$scope.openButton = !$scope.openButton
		$scope.closeButton = !$scope.closeButton
	}
	getProjectData()
}])
