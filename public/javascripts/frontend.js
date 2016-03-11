// create the module and name it scotchApp
var jakeApp = angular.module('jakeportfolio', ['ngRoute']);

jakeApp.config(function($routeProvider){
        $routeProvider
        .when('/', {
          templateUrl: '/pages/home.html',
          controller: 'mainController'
        })
        .when('/portfolio_item/:item_number', {
          templateUrl: '/pages/item.html',
          controller: 'portController'
        })
        .when('/test', {
          templateUrl: '/pages/test.html',
          controller: 'mainController'
        })
        .otherwise({ redirectTo: '/pages/test.html' });
});

// create the controller and inject Angular's $scope
jakeApp.controller('mainController', ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http) {

      // Load pages on startup
      $http.get('../../portfolio.json').success(function (data) {
        $rootScope.portfolio = data.movies;
      });

}]);

jakeApp.controller('portController', ['$scope', '$rootScope', '$routeParams', '$http',
    function($scope, $rootScope, $routeParams, $http) {

      // Load pages on startup
      var item_number = $routeParams.item_number;

      $scope.message = "";
      console.log("Using Portfolio Controller");
      
      // Load pages on startup
      $http.get('../../portfolio.json').success(function (data) {
        $rootScope.portfolio = data;
      });
      
      $scope.item = $rootScope.portfolio;
}]);

jakeApp.directive('typewrite', ['$timeout', function ($timeout) {
		function linkFunction (scope, iElement, iAttrs) {
			var timer = null,
				initialDelay = iAttrs.initialDelay ? getTypeDelay(iAttrs.initialDelay) : 200,
				typeDelay = iAttrs.typeDelay ? getTypeDelay(iAttrs.typeDelay) : 200,
				blinkDelay = iAttrs.blinkDelay ? getAnimationDelay(iAttrs.blinkDelay) : false,
				cursor = iAttrs.cursor ? iAttrs.cursor : '|',
				blinkCursor = iAttrs.blinkCursor ? iAttrs.blinkCursor === "true" : true,
				auxStyle;
			if (iAttrs.text) {
				timer = $timeout(function() {
					updateIt(iElement, 0, iAttrs.text);
				}, initialDelay);
			}

			function updateIt(element, i, text){
				if (i <= text.length) {
					element.html(text.substring(0, i) + cursor);
					i++;
					timer = $timeout(function() {
						updateIt(iElement, i, text);
					}, typeDelay);
					return;
				} else {
					if (blinkCursor) {
						if (blinkDelay) {
							auxStyle = '-webkit-animation:blink-it steps(1) ' + blinkDelay + ' infinite;-moz-animation:blink-it steps(1) ' + blinkDelay + ' infinite ' +
										'-ms-animation:blink-it steps(1) ' + blinkDelay + ' infinite;-o-animation:blink-it steps(1) ' + blinkDelay + ' infinite; ' +
										'animation:blink-it steps(1) ' + blinkDelay + ' infinite;';
							element.html(text.substring(0, i) + '<span class="blink" style="' + auxStyle + '">' + cursor + '</span>');
						} else {
							element.html(text.substring(0, i) + '<span class="blink">' + cursor + '</span>');
						}
					} else {
						element.html(text.substring(0, i));
					}
				}
			}

			function getTypeDelay(delay) {
				if (typeof delay === 'string') {
					return delay.charAt(delay.length - 1) === 's' ? parseInt(delay.substring(0, delay.length - 1), 10) * 1000 : +delay;
				}
			}

			function getAnimationDelay(delay) {
				if (typeof delay === 'string') {
					return delay.charAt(delay.length - 1) === 's' ? delay : parseInt(delay.substring(0, delay.length - 1), 10) / 1000;
				}
			}

			scope.$on('$destroy', function() {
				if(timer) {
					$timeout.cancel(timer);
				}
			});
		}

		return {
			restrict: 'A',
			link: linkFunction,
			scope: false
		};

	}]);