(function () {
	'use strict';

	jQuery.sap.declare('sap.ui.sinosbyte.controls.CORSController');

	sap.ui.core.Control.extend('buildx.app.controller.core.CORSController', {
		_applicationPath: '/api',
		_server: '10.1.1.145',
		_port: '8081',

		getUrl: function (apiPath, reqPath) {
			let url;
			if (this.isNativeApp() || this.isStandalone()) {
				url = 'http://' + this._server + ':' + this._port + this._applicationPath + apiPath;
			} else {
				url = this._applicationPath + apiPath;
			}

			if (reqPath) url += reqPath;
			return url;
		},

		isNativeApp: function () {
			return false;
		},

		isStandalone: function () {
			// TODO verificar forma de descobrir se é standalone
			return true;
		},

		getCorsConfig: function () {},
	});
})();
