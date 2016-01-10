function LandingCtrl(ZcharAppService, $timeout, $scope,$window) {
	//this.programs = PrefsGuiService.programs();
	//PrefsGuiService.stateChangeToLastProgram();
	this.heroImageStyle = {
		height:$window.innerHeight + 'px'
	};
	this.heroTitleStyle = {
		top:$window.innerHeight*0.35 + 'px'
	};
	// console.log(todos);

	var w = angular.element($window);
	var that = this;

	w.bind('resize', function(){
		console.log(that);
		that.heroImageStyle.height = $window.innerHeight + 'px';
		that.heroTitleStyle.top = $window.innerHeight*0.35 + 'px';
	  	$scope.$apply();
	});
}
LandingCtrl.$inject = ['ZcharAppService','$timeout','$scope','$window'];

angular.module('ZcharApp').controller('LandingCtrl', LandingCtrl);