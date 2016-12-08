angular.module('starter.controllers', [])

.controller('NewsCtrl', ['$scope', 'newsService', 'swipeService', 'LoaderService', '$stateParams', function ($scope, newsService, swipeService, LoaderService, $stateParams) {
	//读取数据
	var getNewsData = function () {
		//获取ID值
		var newsId = $stateParams.newsId
		//载入加载动画
		LoaderService.show()
		//从service中调用数据方法
		newsService.getNewsData(newsId).then(function (newsData) {
			$scope.newsData = newsData
			console.log('$scope.newsData:',$scope.newsData)
			//图片的插件
			swipeService.photoswipe()
			//防止数据中不存在图片的数据时页面上出现小图标
			if($scope.newsData.pic == '') {
				$scope.isPicShow = false
			}else {
				$scope.isPicShow = true
			}
		})
		//关闭加载动画
		LoaderService.hide()
	}
	getNewsData()
}])

.controller('ProjectCtrl', ['$timeout', '$scope', 'newsService', 'swipeService', 'LoaderService', '$stateParams', function ($timeout, $scope, newsService, swipeService, LoaderService, $stateParams) {
	$scope.projectData = []
	$scope.openButton = true
	//读取数据
	var getProjectData = function () {
		//获取ID
		var projectId = $stateParams.projectId
		//页面加载前的动画
		LoaderService.show()
		//调用获取数据的方法
		newsService.getProjectData(projectId).then(function (projectData) {
			$scope.projectData = projectData
			console.log('$scope.projectData.tags:',$scope.projectData.tags)
			console.log('$scope.projectData:',$scope.projectData)
			//图片插件
			swipeService.photoswipe()
		})
		//关闭动画
		LoaderService.hide()
	}
	//点击表格时放大表格中的内容
	$scope.showTable = function (data) {
		$scope.isShow = true
		$scope.tableShow = data
		console.log($scope.tableShow)
		//放大的表格是ng-if控制，所以控制html先出现画面再加载动画
		$timeout(function() {
			$scope.isTableShow = !$scope.isTableShow
		}, 50)
	}
	//点击放大后表格来关闭它
	$scope.hideTable = function () {
		$scope.isShow = false
		$scope.isTableShow = !$scope.isTableShow
	}
	//点击表格下方的开关来控制表格的伸缩
	$scope.toBeLong = function () {
		$scope.projectTable = !$scope.projectTable
		$scope.openButton = !$scope.openButton
		$scope.closeButton = !$scope.closeButton
	}
	getProjectData()
}])
