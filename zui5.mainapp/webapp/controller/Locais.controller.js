sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/core/UIComponent'
],
function (Controller, UIComponent) {
    "use strict";

    return Controller.extend("br.com.sinosbyte.zui5.mainapp.controller.Locais", {
        onInit: function () {

            this.getRouter().getRoute('locais').attachMatched({}, this.onRouteMatched, this);
        },
        getRouter: function () {
			return UIComponent.getRouterFor(this);
		},
        onRouteMatched: function (oMatched) {
        }
    });
});
