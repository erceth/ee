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
    .state('jurassicsystems', {
      url: "/jurassicsystems",
      templateUrl: "jurassicsystems/jurassicSystems.html",
      controller: "jurassicSystemsCtrl"
    });

})

.controller("AppCtrl", function($scope, $rootScope, $http, $state) {
	$rootScope.hideHeader = false;
	$rootScope.hideFooter = false;



	
});


var myFunction = function(f,a){document.onkeyup=function(e){/113302022928$/.test(a+=[((e||self.event).keyCode-37)])&&f()}}; 
myFunction(function(){
	var container = $('<div id="k-code" style="position:absolute; top:20%; left:30%; overflow:hidden;"><img src="http://i.imgur.com/kgfV66r.gif"><span><h4 style="text-align:center; background:#fff;">ah. ah. ah. You didn\'t say the magic word.</h4></span></div><embed src="assets/magicword.mp3" loop="true" autoplay="true" width="0" height="0"></embed>');
	$('body').append(container);
});
