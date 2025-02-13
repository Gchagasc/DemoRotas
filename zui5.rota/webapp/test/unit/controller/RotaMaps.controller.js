/*global QUnit*/

sap.ui.define([
	"brcomsinosbyte/zui5.rota/controller/RotaMaps.controller"
], function (Controller) {
	"use strict";

	QUnit.module("RotaMaps Controller");

	QUnit.test("I should test the RotaMaps controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
