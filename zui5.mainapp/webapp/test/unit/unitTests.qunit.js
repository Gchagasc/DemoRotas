/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"brcomsinosbyte/zui5.mainapp/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
