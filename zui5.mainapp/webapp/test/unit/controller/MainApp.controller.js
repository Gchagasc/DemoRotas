/*global QUnit*/

sap.ui.define([
	"brcomsinosbyte/zui5.mainapp/controller/MainApp.controller"
], function (Controller) {
	"use strict";

	QUnit.module("MainApp Controller");

	QUnit.test("I should test the MainApp controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
