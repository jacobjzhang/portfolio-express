// create the module and name it scotchApp
var jakeApp = angular.module('jakeportfolio', ['ngRoute']);

jakeApp.config(function($routeProvider){
        $routeProvider
	    // .when('/', {
	    //   templateUrl: '/pages/home.html',
	    //   controller: 'mainController'
	    // })
        .when('/portfolio_item/:item_number', {
          templateUrl: '/pages/item.html',
          controller: 'mainController'
        })
        .otherwise({
        	templateUrl: '/pages/home.html',
	    	controller: 'mainController' });
});

// create the controller and inject Angular's $scope
jakeApp.controller('mainController', ['$scope', '$rootScope', '$routeParams', '$http', '$location', '$anchorScroll', 
    function($scope, $rootScope, $routeParams, $http, $location, $anchorScroll) {

      // Load pages on startup
      $http.get('../../portfolio.json').success(function (data) {
        angular.forEach(data.movies, function(item) {
         if (item.episode_number == $routeParams.item_number) 
          $scope.page = item;
        });
      	$rootScope.portfolio = data.movies;
      });
      
      $scope.scrollTo = function(id) {
      	$location.hash(id);
      	$anchorScroll();
   	  };
      
      $scope.fullView = function()
	    {
	    	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
	    	var screenwidth = $(window).width();
		    var screenheight = $(window).height();
		    $(document).ready(function() {
		    	if (!isMobile) {
			    	$(".intro").width(screenwidth).height(screenheight);
		    	} else {
			        $(".intro").css({'background-size':'cover','height':'600px'});
			    }
			});
			
	   };
    	
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
	
jakeApp.directive('afterRender', ['$timeout', function ($timeout) {
    var def = {
        restrict: 'A',
        terminal: true,
        transclude: false,
        link: function (scope, element, attrs) {
            $timeout(scope.$eval(attrs.afterRender), 100);  //Calling a scoped method
        }
    };
    return def;
}]);
