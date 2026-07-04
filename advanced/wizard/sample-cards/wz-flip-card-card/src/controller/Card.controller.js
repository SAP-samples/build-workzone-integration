sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";

  return Controller.extend("sap.it.wz.cards.flip_card.controller.Card", {
    onInit: function () {
      if (!this.getOwnerComponent().card) {
        return;
      }
      let oCard = this.getOwnerComponent().card;
      let mParameters = oCard.getCombinedParameters();

  
      let htmlContent = this._getWidgetHtml(mParameters);
      let oFrame = this._createIframe(htmlContent);

      if (oCard.editor) {
        oFrame.setPreview(oCard.editor.preview);
      }

      this.getView().setHeight(mParameters.height + 12 + "px");
    },
    _createIframe: function (content) {
      let minimizedContent = content.replaceAll(/\n\s*/g, '');
      let blob = new Blob([minimizedContent], { type: "text/html" });
      let oFrame = this.byId("frame");
      oFrame.setSrc(URL.createObjectURL(blob));
      return oFrame;
    },
    _getWidgetHtml: function (params) {
      let innerHtml = `<div class='flip-card-inner'>
        <div class='flip-card-front'>
          <div class='section header-section'>
            <p>${params.frontHeader}</p>
          </div>
          <div class='section description-section'>
            <p>${params.frontDescription}</p>
          </div>
          <div class='section caption-section'>
            <p>${params.frontCaption}</p>
          </div>
        </div>
        <div class='flip-card-back'>
          <div class='section header-section'>
            <p>${params.backHeader}</p>
          </div>
          <div class='section description-section'>
            <p>${params.backDescription}</p>
          </div>
          <div class='section caption-section'>
            <p>${params.backCaption}</p>
          </div>
        </div>
      </div>`;

      if (params.url && params.url.length > 0) {
        innerHtml = `<a href="${params.url}" target="_blank">${innerHtml}</a>`;
      }

      return `<!DOCTYPE HTML>
        <html>
        <head>
        <style>${this._getWidgetStyle(params)}</style>
        </head>
        <body>
          <div id='body'>
            <div id='flip_card' class='flip-card'>${innerHtml}</div>
          </div>
        </body>
      </html>`;
    },
    _getWidgetStyle: function (params) {
      function hasText(paramName) {
        return params[paramName].length > 0;
      }
      function getStyleParam(param) {
        return (param && param != "" ? param : null);
      }

      let frontHeaderHeight = hasText("frontHeader") ? 20 : 0;
      let frontCaptionHeight = hasText("frontCaption") ? 20 : 0;
      let frontDescriptionHeight = 90 - frontHeaderHeight - frontCaptionHeight;
      let backHeaderHeight = hasText("backHeader") ? 20 : 0;
      let backCaptionHeight = hasText("backCaption") ? 20 : 0;
      let backDescriptionHeight = 90 - backHeaderHeight - backCaptionHeight;

      let frontColor = getStyleParam(params.frontColor);
      let frontImage = getStyleParam(params.frontImage);
      let frontTextShadow = getStyleParam(params.frontTextShadow);
      let backColor = getStyleParam(params.backColor);
      let backImage = getStyleParam(params.backImage);
      let backTextShadow = getStyleParam(params.backTextShadow);

      return `
        html, body {
          height: 100%;
          width: 100%;
          margin: 0;
          overflow: auto;
          font-family: Arial, Helvetica, sans-serif;
        }
        .settings-body {
          background-color: #FFF;
        }
        .flip-card {
          background-color: transparent;
          width: 200px;
          height: 200px;
          padding: 5px 0;
          perspective: 2500px;
          -webkit-perspective: 2500px;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }
        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }
        .flip-card-front {
          background-color: white;
          color: black;
        }
        .flip-card-back {
          background-color: dodgerblue;
          color: white;
          transform: rotateY(180deg);
        }
        .section {
          display: flex;
          margin: auto;
          text-align: center;
          overflow: hidden;
        }
        .header-section,
        .caption-section {
          height: 20%;
        }
        .description-section {
          height: 50%;
          padding-top: 5%;
          padding-bottom: 5%;
        }
        #flip_card p {
          margin: auto;
          padding: 0 5%;
        }
        #body {
          display: flex;
          justify-content: center;
          overflow: hidden;
        }
        .flip-card {
          width: ${params.height}px;
          height: ${params.height}px;
        }
        .flip-card-front {
          ${frontColor ? `background-color: ${frontColor};` : ""}
          ${frontImage ? `background-image: url("${frontImage}");` : ""}
          ${frontTextShadow ? `text-shadow: ${frontTextShadow};` : ""}
          color: ${params.frontFontColor};
          font-size: ${params.frontFontSize}px;
        }
        .flip-card-back {
          ${backColor ? `background-color: ${backColor};` : ""}
          ${backImage ? `background-image: url("${backImage}");` : ""}
          ${backTextShadow ? `text-shadow: ${backTextShadow};` : ""}
          color: ${params.backFontColor};
          font-size: ${params.backFontSize}px;
        }
        .flip-card-front .header-section{
          height: ${frontHeaderHeight}%;
          font-size: 1.5em;
        }
        .flip-card-front .description-section {
          height: ${frontDescriptionHeight}%;
        }
        .flip-card-front .caption-section {
          height: ${frontCaptionHeight}%;
        }
        .flip-card-back .header-section{
          height: ${backHeaderHeight}%;
        }
        .flip-card-back .description-section {
          height: ${backDescriptionHeight}%;
        }
        .flip-card-back .caption-section {
          height: ${backCaptionHeight}%;
        }
        .header-section{
          font-size: 1.5em;
        }
        .caption-section{
          font-size: 1.2em;
        }
      `;
    },
  });
});
