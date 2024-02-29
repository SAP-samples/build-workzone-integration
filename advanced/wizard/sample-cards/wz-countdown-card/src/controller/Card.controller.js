sap.ui.define(['sap/ui/core/mvc/Controller'],
  function (Controller) {
    "use strict";

    let CardController = Controller.extend("sap.it.wz.cards.countdown.controller.Card", {
      onInit: function () {
        if (!this.getOwnerComponent().card) {
          return;
        }
        let oCard = this.getOwnerComponent().card;
        let mParams = oCard.getCombinedParameters();

        let oFrame = this.byId("frame");
        oFrame.setSrc(this._getSrcUrl(mParams).href);

        let iPixelHeight = Math.max(mParams.height,
          oCard.getCardContent().getDomRef().offsetHeight);
        this.getView().setHeight(iPixelHeight + "px");

        if (oCard.editor) {
          oFrame.setPreview(oCard.editor.preview);
        }
      },
      _getSrcUrl: function (params) {
        window.prms = params;
        let url = new URL(params.widgetSrc);
        for (let param in params) {
          if (!params.hasOwnProperty(param) || param == "widgetSrc") {
            continue;
          }
          url.searchParams.append(param, params[param]);
        }
        return url;
      }
    });

    return CardController;
  });
