sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
  "use strict";

  return Controller.extend("my.brand.Main", {
    onInit: function () {
      // Gets the component of the controller's view
      // https://sapui5.hana.ondemand.com/sdk/#/api/sap.ui.core.mvc.Controller/methods/getOwnerComponent
      var oComponent = this.getOwnerComponent(),
        oSelect = this.byId('brandCombobox'),
        oCard = oComponent.oCard
      // Brand list data.
      var oModel = new JSONModel({
        "brands": [
          {
            "text": "BrandA",
            "key": "BrandA"
          },
          {
            "text": "BrandB",
            "key": "BrandB"
          },
          {
            "text": "BrandC",
            "key": "BrandC"
          }
        ]
      });
      this.getView().setModel(oModel);
      // Get Context Value from Workzone, getContextValue will return a promise.
      // https://sapui5untested.int.sap.eu2.hana.ondemand.com/#/api/sap.ui.integration.Host%23methods/getContextValue
      oCard.getHostInstance().getContextValue("sap.workzone.samples.context/brand").then(function (value) {
        // set comboBox selected key
        // https://sapui5.hana.ondemand.com/sdk/#/api/sap.m.ComboBox/methods/setSelectedKey
        oSelect.setSelectedKey(value);
      });
    },

    handleChange: function (oEvent) {
      var oComponent = this.getOwnerComponent();
      var oCard = oComponent.oCard;
      var brand = oEvent.mParameters.value;

      // Update Workzone context by trigger action.
      // https://sapui5untested.int.sap.eu2.hana.ondemand.com/#/api/sap.ui.integration.widgets.Card%23methods/triggerAction
      oCard.triggerAction({
        type: "updateContext",
        parameters: {
          "namespace": "sap.workzone.samples.context",
          "context": {
            "brand": brand
          }
        }
      });
    }
  });
});