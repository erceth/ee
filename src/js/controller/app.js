"use strict"

var app = angular.module('app', ["ui.router", "controller.home"]);

app.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/home");

	$stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "html/home.html",
      controller: "homeCtrl"
    })
    .state('about', {
      url: "/about",
      templateUrl: "html/about.html"
    });

})

.controller("AppCtrl", function($scope, $http) {

	$scope.url = "http://www.cnn.com";
	$scope.results = false;
	$scope.desending = true;
	$scope.predicate = "-count";
	$scope.ignoreStopWords = true;
	$scope.message = "";

	$scope.crawl = function() {
		$http.get("/crawl", {
			params: {url: $scope.url, ignoreStopWords: $scope.ignoreStopWords}
		}).success(function(data, status, headers, config) {
			if (data.error) {
				$scope.message = data.message;
			} else {
				$scope.results = data.results;
				$scope.message = "";
			}
		}).error(function(data, status, headers, config) {
			$scope.message = "Error connecting to server.";
			console.error(data, status);
		});
	};

	$scope.toggleWord = function() {
		if ($scope.predicate === "word") {
			$scope.predicate = "-word";
		} else {
			$scope.predicate = "word";
		}
	};

	$scope.toggleCount = function() {
		if ($scope.predicate === "count") {
			$scope.predicate = "-count";
		} else {
			$scope.predicate = "count";
		}
	};
});
