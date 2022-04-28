sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "veterinaria/utils/Services",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/ui/Device",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "veterinaria/utils/Formatter",


],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, Services, JSONModel, Fragment, Device, Filter, FilterOperator, Sorter, Formatter) {
        "use strict";

        return Controller.extend("veterinaria.controller.MainView", {
            Formatter: Formatter,

            _mViewSettingsDialogs: {},

            onInit: async function () {
                await this.loadModel("veterinaria.json", "modeloPrueba");
                console.log(this.getView().getModel("modeloPrueba").getData())


            },

            loadModel: async function (json, path) {
                const oResponse = await Services.getLocalJSON(
                    json
                );
                const oDataOrders = oResponse[0];
                let oModel = new JSONModel();
                oModel.setData(oDataOrders);
                this.getView().setModel(oModel, path);



            },

            onFilterName: function (oEvent) {

                this.oFilterName = this.getSearchFilter ("name", oEvent.getParameter("query"), FilterOperator.Contains);

                this.onFilterChange (this.byId("tableid"), this.getFilters());
            },

            
            onFilterBreed: function (oEvent) {

                this.oFilterBreed= this.getSearchFilter ("breed", oEvent.getParameter ("query"), FilterOperator.Contains);

                this.onFilterChange (this.byId("tableid"), this.getFilters());
               
            },

            getSearchFilter: function (sField, sQuery, oFilterOperator) {

                let oFilter;
                if (sQuery) {
                    oFilter = new Filter(sField, oFilterOperator, sQuery);
                }
                else { 
                    oFilter = null;

                }
                return oFilter;
            },


            onFilterChange: function (oTable, aFilters){
                             
                var oBinding = oTable.getBinding("items");
                
                if (aFilters){
                    var oFilter = new Filter (aFilters, true )
                    oBinding.filter(oFilter)



                }

            },

            getFilters: function (){

                var aFilters = [];

                if (this.oFilterName){
                    aFilters.push (this.oFilterName)
                }

                if (this.oFilterBreed){
                    aFilters.push (this.oFilterBreed)
                }
                
                return aFilters;

            },


            onSortDialogConfirm: function (oEvent) {
                let oMParams = oEvent.getParameters(),
                    oTable = this.byId("tableid"),
                    oBinding = oTable.getBinding("items"),
                    sPath,
                    oSorter,
                    bDescending;

                sPath = oMParams.sortItem.getKey();
                bDescending = oMParams.sortDescending;
                oSorter = new Sorter(sPath, bDescending);
                oBinding.sort(oSorter);


            },

            onOpenSortPopUp: function (oEvent) {
                this.openSettingDialog(this.byId("sortDialog"), "veterinaria.view.fragment.sorterPopUp");
            },
            test: function () {
                if (!this._oDialogSort) {
                    this._oDialogSort = sap.ui.xmlfragment("veterinaria.view.fragment.sorterPopUp", this);
                    this.getView().addDependent(this._oDialogSort);
                }
                this._oDialogSort.open();
            },
            openSettingDialog: function (oDialog, sFrgamentId) {
                try {
                    if (!oDialog) {
                        this.getViewSettingsDialog(sFrgamentId)
                            .then(function (oViewSettingsDialog) {
                                this.getView().addDependent(oViewSettingsDialog);
                                oViewSettingsDialog.open();
                            }.bind(this));
                    } else {
                        oDialog.open();
                    }
                } catch (oError) {
                    console.log(oError)
                }
            },
            getViewSettingsDialog: function (sDialogFragmentName) {
                let pDialog = this._mViewSettingsDialogs[sDialogFragmentName];
                if (!pDialog) {
                    pDialog = Fragment.load({
                        id: this.getView().getId(),
                        name: sDialogFragmentName,
                        controller: this
                    }).then(function (oDialog) {
                        if (Device.system.desktop) {
                            oDialog.addStyleClass("sapUiSizeCompact");
                        }
                        return oDialog;
                    });
                    this._mViewSettingsDialogs[sDialogFragmentName] = pDialog;
                }
                return pDialog;
            },
        });
    });
