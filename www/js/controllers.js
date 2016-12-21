angular.module('starter.controllers', [])

.controller('NewsCtrl', ['$scope', 'newsService', 'swipeService', 'LoaderService', '$stateParams', function ($scope, newsService, swipeService, LoaderService, $stateParams) {
  
  $scope.picture = 'img/title.jpg'

  //读取数据
  var getNewsData = function () {
    //获取ID值
    var newsId = $stateParams.newsId
    //载入加载动画
    LoaderService.show()
    //从service中调用数据方法
    newsService.getNewsData(newsId).then(function (newsData) {
      $scope.newsData = newsData
      $scope.tags = newsData.tags
      console.log('$scope.newsData:', $scope.newsData)
      //图片的插件
      swipeService.photoswipe()
      //防止数据中不存在图片的数据时页面上出现小图标
      if('pic' in newsData && newsData.pic != '') {
        $scope.isPicShow = true
        $scope.picture = newsData.pic
      } else {
        $scope.isPicShow = false
      }
      //分享
      //WeixinShare.wxShare($scope.newsData.title, $scope.picture, '#/tab/special/' + newsId, 'desc')
    })
    .finally(function () {
      //关闭加载动画
      LoaderService.hide()
    })
  }

  getNewsData()
}])

.controller('ProjectCtrl', ['$timeout', '$scope', 'newsService', 'swipeService', 'LoaderService', '$stateParams', function ($timeout, $scope, newsService, swipeService, LoaderService, $stateParams) {
  $scope.projectData = []
  $scope.openButton = true
  $scope.tableTitle = newsService.tableTitle[0]

  //读取数据
  var getProjectData = function () {
    //获取ID
    var projectId = $stateParams.projectId
    //页面加载前的动画
    LoaderService.show()
    //调用获取数据的方法
    newsService.getProjectData(projectId).then(function (projectData) {
      $scope.projectData = projectData
      $scope.tags = projectData.tags
      console.log('$scope.projectData.tags:',$scope.projectData.tags)
      console.log('$scope.projectData:',$scope.projectData)
      //图片插件
      swipeService.photoswipe()
      //分享
      //WeixinShare.wxShare($scope.newsData.title, $scope.picture, '#/tab/special/' + newsId, 'desc')
    })
    .finally(function () {
      //关闭加载动画
      LoaderService.hide()
    })
  }

  //点击表格时放大表格中的内容
  $scope.showTable = function (title,data) {
    console.log(data)
    if(data.length > 9) {
      $scope.isShow = true
      $scope.titleShow = title
      $scope.tableShow = data
      console.log($scope.tableShow)
      //放大的表格是ng-if控制，所以控制html先出现画面再加载动画
      $timeout(function() {
        $scope.isTableShow = !$scope.isTableShow
      }, 0)
    }
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

//专题
.controller('SpecialCtrl', ['$scope', 'newsService', 'swipeService', 'LoaderService', '$stateParams', function ($scope, newsService, swipeService, LoaderService, $stateParams) {
  //读取数据
  var getSpecialData = function () {
    //获取ID值
    var specialId = $stateParams.specialId
    
    //载入加载动画
    LoaderService.show()

    //从service中调用数据方法
    newsService.getNewsData(specialId).then(function (newsData) {
      $scope.specialData = newsData
      console.log('$scope.specialData:',$scope.specialData)
      //分享
      //WeixinShare.wxShare($scope.newsData.title, $scope.picture, '#/tab/special/' + newsId, 'desc')
    })
    .finally(function () {
      //关闭加载动画
      LoaderService.hide()
    })
  }

  getSpecialData()

}])
