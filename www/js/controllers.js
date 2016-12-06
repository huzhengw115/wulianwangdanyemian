angular.module('starter.controllers', [])

.controller('NewsCtrl', function ($scope, newsService, swipeService) {
	var getNewsData = function () {
		newsService.getNewsData().then(function (newsData) {
			$scope.newsData = newsData
			console.log('$scope.newsData:',$scope.newsData)
			swipeService.photoswipe()
			if($scope.newsData.pic == '') {
				$scope.isPicShow = false
			}else {
				$scope.isPicShow = true
			}
		})
	}
	getNewsData()
})

.controller('ProjectCtrl', function ($scope, newsService) {
	$scope.projectData = []
	$scope.openButton = true
	var getProjectData = function () {
		newsService.getProjectData().then(function (projectData) {
			$scope.projectData = projectData
			console.log('$scope.projectData:',$scope.projectData)
			// swipeService.photoswipe()
		})
	}
	$scope.showTable = function (data) {
		$scope.isShow = true
		$scope.tableShow = data
		console.log($scope.tableShow)
	}
	$scope.hideTable = function () {
		$scope.isShow = false
	}
	$scope.toBeLong = function () {
		$scope.projectTable = !$scope.projectTable
		$scope.openButton = !$scope.openButton
		$scope.closeButton = !$scope.closeButton
	}
	getProjectData()
})
