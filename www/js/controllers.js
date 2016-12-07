angular.module('starter.controllers', [])

.controller('NewsCtrl', ['$scope', 'newsService', 'swipeService', 'LoaderService', function ($scope, newsService, swipeService, LoaderService) {
	var getNewsData = function () {
		LoaderService.show()
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
		LoaderService.hide()
	}
	getNewsData()
}])

.controller('ProjectCtrl', ['$scope', 'newsService', 'swipeService', 'LoaderService', function ($scope, newsService, swipeService, LoaderService) {
	$scope.projectData = []
	$scope.openButton = true
	var getProjectData = function () {
		LoaderService.show()
		newsService.getProjectData().then(function (projectData) {
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
}])
