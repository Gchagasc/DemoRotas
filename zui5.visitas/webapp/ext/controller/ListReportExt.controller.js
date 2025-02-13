sap.ui.define([
], function () {
    'use strict';

    return {

        _getModel: function (sModel) {
           return this.getView().getModel(sModel);
        },

        _getTable: function (){
            return this.getView().byId("listReport").getTable();
        },

        setarRota: function (oEvent) {
            this.setarRotaFalse();

            this._getTable().getSelectedContextPaths().forEach(sPath => {
                this._getModel().setProperty(sPath+ "/Rota", true);
            });

            this._getModel().submitChanges();
            this._getModel().refresh();
        },

        setarRotaFalse: function () {


            this._getTable().getItems().forEach(item => {

                
                this._getModel().setProperty(item.getBindingContextPath() + "/Rota", false);
                
            });
            
        }
    };
});