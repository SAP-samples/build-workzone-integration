/*
 * ! ${copyright}
 */

sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";
  function isDark(rgbcolor) {
    rgbcolor = rgbcolor || window.getComputedStyle(document.body).backgroundColor;
    var match = /rgb\((\d+).*?(\d+).*?(\d+)\)/.exec(rgbcolor);
    if (!match) {
      return false;
    }
    var r = parseInt(match[1]),
      g = parseInt(match[2]),
      b = parseInt(match[3]),
      yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return (yiq <= 128);
  }

  return Controller.extend("sap.it.wz.cards.twitter.controller.Card", {
    onInit: function () {
      if (!this.getOwnerComponent().card) {
        return;
      }
      let oCard = this.getOwnerComponent().card;
      let mParameters = oCard.getCombinedParameters();


      let content = ""; 

      let [target, options] = this._getTimelimeParams(mParameters);
      switch (mParameters.widgetType) {
        case "tweet":
          content = this._getTweetScript(mParameters.tweetId, target, options);
          break;
        default:
          content = this._getTimelineScript(target, options);
      }

      var src = URL.createObjectURL(new Blob([content], { type: "text/html" }));
      var oFrame = this.byId("frame");
      oFrame.setSrc(src);

      if (oCard.editor) {
        oFrame.setPreview(oCard.editor.preview);
      }

      var iPixelHeight = Math.max(mParameters.height, oCard.getCardContent().getDomRef().offsetHeight);
      this.getView().setHeight(iPixelHeight + "px");
    },
    _getTimelineScript: function (target, options = {}) {
      let sTarget = JSON.stringify(target);
      let sOptions = JSON.stringify(options);
      let timelineScript = `twttr.widgets.createTimeline(${sTarget}, element, ${sOptions});`
      return this._getIframeHtml(timelineScript);
    },
    _getTweetScript: function (id, target, options) {
      let sTarget = JSON.stringify(target);
      let sOptions = JSON.stringify(options);
      let tweetScript = `twttr.widgets.createTweet("${id}", element, ${sOptions});`;
      return this._getIframeHtml(tweetScript);
    },
    _getIframeHtml: function (sScript) {
      let elementId = "widget_container";
      return `<!DOCTYPE HTML>
      <html id="card_body">
      <head>
        <script src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <style>
        ::-webkit-scrollbar { width: 8px; } 
        ::-webkit-scrollbar-track { border-radius: 10px; } 
        ::-webkit-scrollbar-thumb { border-radius: 10px; background: #AFAFAF }
        #card_body{
          overflow :hidden;
        }
        #card_body:hover{
          overflow-y: overlay;
        }
        </style>
      </head>
      <body >
          <div id="${elementId}"></div>
      </body>
          <script>
            let element = document.getElementById("${elementId}");
            ${sScript}
          </script>
        </html>`;
    },
    _getTimelimeParams: function (mParameters) {
      let params = {};
      params.sourceType = mParameters.widgetType || "profile";
      let username = mParameters.userName.replace("@", "");
      switch (params.sourceType) {
        case "list":
          params.ownerScreenName = username;
          params.slug = mParameters.listName;
          break;
        case "collection":
          params.id = mParameters.collectionId;
          break;
        default:
          // profile & likes
          params.screenName = username;
      }

      let options = { dnt: true, ariaPolite: "polite" };
      options.theme = mParameters.theme;
      if (mParameters.theme === "auto") {
        options.theme = isDark() ? "dark" : "light";
      }
      if (mParameters.setTweetsLimit) {
        options.tweetLimit = mParameters.numberOfTweets;
      }

      let chrome = [];
      if (!mParameters.header) chrome.push("noheader");
      if (!mParameters.footer) chrome.push("nofooter");
      options.chrome = chrome.join(",");

      return [params, options];
    }
  });
});
