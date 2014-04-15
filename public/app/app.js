var myApp = angular.module('myApp', [])
	.config(function($routeProvider) {
			$routeProvider
			.when('/', {
				templateUrl: '/app/views/main.html',
				controller: 'MainCtrl'
			});
	});

myApp.controller('MainCtrl', function($scope) {
	$scope.message = 'Welcome to myApp!';
});