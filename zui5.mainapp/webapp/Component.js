/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "br/com/sinosbyte/zui5/mainapp/model/models",
        'sap/ui/model/json/JSONModel'
    ],
    function (UIComponent, Device, models, JSONModel) {
        "use strict";

        return UIComponent.extend("br.com.sinosbyte.zui5.mainapp.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");



                // register child applications
			    jQuery.sap.registerModulePath("locais", "/sap/bc/ui5_ui5/sap/zui5_locais");
			    jQuery.sap.registerModulePath("visitas", "/sap/bc/ui5_ui5/sap/zui5_visitas");
            }

        });
    }
);