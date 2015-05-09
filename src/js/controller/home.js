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
