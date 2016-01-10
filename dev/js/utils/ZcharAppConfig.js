angular.module('ZcharAppConfig', [])
.provider('ZcharAppConfig', function () {
	var config = {
		locale: 'en_us',
		serviceURLBase: ''
	};
	return {
		set: function (settings) {
			angular.extend(config, settings);
		},
		$get: function () {
			return config;
		}
	};
});