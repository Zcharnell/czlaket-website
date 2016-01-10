function slide($timeout) {
	return {
		restrict:'A',
		scope: {
			delay:'=',
			duration:'='
		},
		link: function (scope, element,attrs) {
			element.addClass('slide');
			element.addClass('out');

			$timeout(function(){
				element.removeClass('out');
			},scope.delay);
		}
	};
}

slide.$inject = ['$timeout'];
angular.module('ZcharApp').directive('slide', slide);