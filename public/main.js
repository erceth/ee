"use strict"

var app = angular.module('app', ["ui.router", "controller.home", "controller.jurassicSystems"]);

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
    })
    .state('jsflags', {
      url: "/jsflags",
      templateUrl: "html/jsflags.html"
    })
    .state('webcrawler', {
      url: "/webcrawler",
      templateUrl: "html/webcrawler.html"
    })
    .state('jurassicsystems', {
      url: "/jurassicsystems",
      templateUrl: "jurassicsystems/jurassicSystems.html",
      controller: "jurassicSystemsCtrl"
    });

})

.controller("AppCtrl", function($scope, $http, $state, $timeout) {

	$scope.kc = true;


	$scope.hideFooterHeader = function() {
		return $state.current.name === "jurassicsystems";
	};
	
	//do you know the konami code?
	var myFunction = function(f,a){document.onkeyup=function(e){/113302022928$/.test(a+=[((e||self.event).keyCode-37)])&&f()}}; 
	myFunction(function() {
		$state.go("jurassicsystems");
	});


	

	$timeout(function() {
		$scope.kc = false;
	}, 3000);

	

});




angular.module("controller.home", [])

.controller("homeCtrl", function($scope) {
	
});

angular.module("controller.jurassicSystems", [])

.controller("jurassicSystemsCtrl", function($scope, $rootScope) {

});
