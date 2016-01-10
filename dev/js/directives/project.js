function project() {
	return {
		restrict:'E',
		replace:true,
		templateUrl:'templates/directives/project.tpl.html',
		scope: {
			projectTitle:'='
		},
		link: function (scope, element) {
			scope.projectVar = scope.projectTitle.replace(/\s+/g, '');
		}
	};
}

project.$inject = [];
angular.module('ZcharApp').directive('project', project);