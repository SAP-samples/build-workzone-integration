sap.ui.define([
  "sap/ui/core/UIComponent"
], function (UIComponent) {
  "use strict";

  return UIComponent.extend("sap.workzone.samples.context.regionCard.Component", {
    onCardReady: function (oCard) {
      this.oCard = oCard;
    }
  });
});
