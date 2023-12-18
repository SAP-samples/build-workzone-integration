sap.ui.define([
  "sap/ui/core/UIComponent"
], function (UIComponent) {
  "use strict";

  var Component = UIComponent.extend("sap.workzone.samples.vaccination", {
    onCardReady: function (oCard) {
      this.oCard = oCard;
    }
  });

  return Component;
});
