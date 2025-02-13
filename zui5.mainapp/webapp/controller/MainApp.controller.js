sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/core/UIComponent'
],
function (Controller, UIComponent) {
    "use strict";

    return Controller.extend("br.com.sinosbyte.zui5.mainapp.controller.MainApp", {
        onInit: function () {           

        },

        pressTile: function (oEvent) {
			this.navTo(oEvent.getSource().getCustomData()[0].mProperties.value);
		},
        getRouter: function () {
			return UIComponent.getRouterFor(this);
		},
        navTo: function (sName, oParameters, bReplace) {
			// this.getOwnerComponent()._setFooter();
			sap.ui.getCore().getEventBus().publish('Navigation', sName, oParameters);
			this.getRouter().navTo(sName, oParameters, undefined, bReplace);
		}
    });
});
