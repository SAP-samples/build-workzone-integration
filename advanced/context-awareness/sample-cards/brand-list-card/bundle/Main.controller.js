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
            "text": "Brand A",
            "key": "BrandA"
          },
          {
            "text": "Brand B",
            "key": "BrandB"
          },
          {
            "text": "Brand C",
            "key": "BrandC"
          }
        ]
      });
      this.getView().setModel(oModel);
      // Get Context Value from Workzone, getContextValue will return a promise.
      // https://sapui5untested.int.sap.eu2.hana.ondemand.com/#/api/sap.ui.integration.Host%23methods/getContextValue
      oCard.getHostInstance().getContextValue("sap.workzone.samples.context/brand/value").then(function (value) {
        // set comboBox selected key
        // https://sapui5.hana.ondemand.com/sdk/#/api/sap.m.ComboBox/methods/setSelectedKey
        oSelect.setSelectedKey(value);
      });
    },

    handleChange: function (oEvent) {
      var oComponent = this.getOwnerComponent();
      var oCard = oComponent.oCard;
      var brandValue = oEvent.getParameter("selectedItem").getKey();
      var brandText = oEvent.getParameter("selectedItem").getText();

      // Update Workzone context by trigger action.
      // https://sapui5untested.int.sap.eu2.hana.ondemand.com/#/api/sap.ui.integration.widgets.Card%23methods/triggerAction
      oCard.triggerAction({
        type: "Custom",
        parameters: {
          "namespace": "sap.workzone.samples.context",
          "type": 'updateContext',
          "context": {
            // this is the context key used to update corresponding cards
            "brand": {
              "value": brandValue,              // context value to update corresponding cards
              "displayValue": brandText,        // display Text for this context key shown in the filter bar
              "displayLabel": "Selected Brand"  // display label for this context key shown in the filter bar
            }
          }
        }
      });
    }
  });
});