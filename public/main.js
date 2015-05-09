"use strict"

var app = angular.module('app', ["ui.router", "controller.home", "controller.jurassicSystems"]);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
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
    .state('projects', {
      url: "/projects",
      templateUrl: "html/projects.html"
    })
    .state('jsflags', {
      url: "/jsflags",
      templateUrl: "html/jsflags.html"
    })
    .state('webcrawler', {
      url: "/webcrawler",
      templateUrl: "html/webcrawler.html"
    })
    .state('sms-tracker', {
      url: "/sms-tracker",
      templateUrl: "html/smsTracker.html"
    })
    .state('jurassicsystems', {
      url: "/jurassicsystems",
      templateUrl: "jurassicsystems/jurassicSystems.html",
      controller: "jurassicSystemsCtrl"
    });

 //    $locationProvider.html5Mode({
	//   enabled: true,
	//   requireBase: false
	// });

})

.controller("AppCtrl", function($scope, $http, $state, $timeout) {
	$scope.app = {
		showMenu: false
	};

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

	$scope.app.toggleMenu = function() {
		$scope.app.showMenu = !$scope.app.showMenu;
		console.log("toggle!");
	};

	

});




angular.module("controller.home", [])

.controller("homeCtrl", function($scope) {
	var graduationDate = new Date("April 2013");
	var now = new Date();
	var internshipYear = 1;
	var month_diff = (now.getFullYear() - graduationDate.getFullYear() + internshipYear) * 12 + now.getMonth() - graduationDate.getMonth();
	var experienceYears = Math.floor(month_diff / 12);
	var experienceMonths = month_diff % 12;
	var pluarMonths = (experienceMonths === 1) ? " month" : " months";

	$scope.home = {
		timeExperience: experienceYears + " years and " + experienceMonths + pluarMonths
	};
	
});

angular.module("controller.jurassicSystems", [])

.controller("jurassicSystemsCtrl", function($scope, $rootScope) {

});
