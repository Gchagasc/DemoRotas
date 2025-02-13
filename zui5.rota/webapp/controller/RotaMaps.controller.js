sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("br.com.sinosbyte.zui5.rota.controller.RotaMaps", {
            onInit: function () {

                this.map;
                this.directionsService;
                this.directionsRenderer;
                this.geocoder;

                this.getView().setModel(this.getOwnerComponent().getModel());
                this.getView().setModel(this.getOwnerComponent().getModel("directionsModel"), "directionsModel");

                var data = {
                    "Start": {
                        "Nome": "Unisinos",
                        "Cidade": "São Leopoldo"
                    },
                    "End": {
                        "Nome": "Sinosbyte",
                        "Cidade": "São Leopoldo"
                    }
                };

                this.getView().getModel("directionsModel").setData(data);

                this.getView().getModel("directionsModel").refresh();

                var htmlContent = this.byId("htmlContent");

                if (htmlContent.getContent() === "") {
                    htmlContent.setContent("<div id='map' class='map'/>");
                }

                this.getView().getModel().attachRequestCompleted(this, this.onRequestCompleted);
                this.getView().getModel().bindList("/Rota").loadData();

                sap.ui.getCore().getEventBus().subscribe('', 'dataLoaded', this.setDirections, this);

            },
            onRequestCompleted: function () {
                sap.ui.getCore().getEventBus().publish('', 'dataLoaded');

            },
            onRenderMap: function () {

                var that = this;
                // initMap is now async
                async function initMap() {
                    // Request libraries when needed, not in the script tag.
                    const { Map } = await google.maps.importLibrary("maps");

                    const { DirectionsService } = await google.maps.importLibrary("routes");
                    const { DirectionsRenderer } = await google.maps.importLibrary("routes");
                    const { Geocoder } = await google.maps.importLibrary("geocoding")

                    that.directionsService = new DirectionsService();
                    that.directionsRenderer = new DirectionsRenderer();
                    that.geocoder = new Geocoder();
                    // Short namespaces can be used.
                    that.map = new Map(document.getElementById("map"), {
                        center: { lat: -34.397, lng: 150.644 },
                        zoom: 8,
                    });

                    that.directionsRenderer.setMap(that.map);

                }

                initMap();
            },
            setDirections: function () {

                var oModel = this.getView().getModel();
                var oDirectionsModel = this.getView().getModel("directionsModel");

                var waypoints = [];

                for (const data in oModel.oData) {
                    if (oModel.oData[data]) {
                        var rota = oModel.oData[data];

                        if (!rota.Atendido) {
                            var waypoint = { location: rota.Nome + " - " + rota.Cidade }
                            waypoints.push(waypoint);
                        }
                    }
                }


                var request = {
                    origin: oDirectionsModel.getData().Start.Nome + " - " + oDirectionsModel.getData().Start.Cidade,
                    destination: oDirectionsModel.getData().End.Nome + " - " + oDirectionsModel.getData().End.Cidade,
                    travelMode: "DRIVING",
                    waypoints: waypoints
                };

                var that = this;

                this.directionsService.route(request, function (response, status) {
                    if (status == 'OK') {
                        that.directionsRenderer.setDirections(response);
                    }
                });

            },
            onSelectionChange: function (oEvent) {

                var that = this;

                var sPath = oEvent.getParameters().listItem.getBindingContextPath();
                var rota = this.getView().getModel().getProperty(sPath);

                var apipath = "https://nominatim.openstreetmap.org/search?q=" + rota.Nome + ", " + rota.Cidade + "&format=geocodejson";

                new JSONModel(fetch(apipath)
                    .then(response => response.text())
                    .then(function (result) {
                        var coordinates = JSON.parse(result).features[0].geometry.coordinates;
                        that.map.panTo(new google.maps.LatLng(coordinates[1], coordinates[0]))
                    })
                    .catch(error => console.log('error', error)));




            },
            onVisitaRealizada: function () {
                var oTable = this.getView().byId("list");

                var sPath = oTable.getSelectedItem().getBindingContextPath();

                this.getView().getModel().setProperty(sPath + "/Atendido", true);
                this.getView().getModel().setProperty(sPath + "/Rota", false);

                var that = this;

                this.getView().getModel().submitChanges();

                this.getView().getModel("directionsModel").setProperty("/Start/Nome", this.getView().getModel().getProperty(sPath + "/Nome"));
                this.getView().getModel("directionsModel").setProperty("/Start/Cidade", this.getView().getModel().getProperty(sPath + "/Cidade"));
                this.getView().getModel("directionsModel").refresh();



            }
        });
    });
