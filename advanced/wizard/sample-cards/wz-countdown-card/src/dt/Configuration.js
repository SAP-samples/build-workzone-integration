sap.ui.define(["sap/ui/integration/Designtime"
], function (Designtime) {
  "use strict";

  var Configuration = Designtime.extend("sap.workzone.cpkg.card.sample.Configuration");
  Configuration.prototype.create = function () {
    return {
      form: {
        items: {
          "headerGroup": {
            "label": "Header options",
            "type": "group",
            "hint": "In case of troubles please visit <a style='font-size: 0.875rem;' href='https://workzone.one.int.sap/site#workzone-home&/groups/F1KNChCkM0gQcr3mlbzAD4/overview_page/SHJL9fBsjhelwXZDEKoGSw'> SAP Work Zone Help Center</a>"
          },
          "headerVisibility": {
						"manifestpath": "/sap.card/header/visible",
						"type": "boolean",
						"label": "Visible Header",
            "defaultValue" : true
					},
          "title": {
            "manifestpath": "/sap.card/header/title",
            "type": "string",
            "defaultValue": "Countdown",
            "label": "Title",
            "visible": "{items>headerVisibility/value}"
          },
          "subTitle": {
            "manifestpath": "/sap.card/header/subTitle",
            "type": "string",
            "defaultValue": "",
            "label": "Subtitle",
            "visible": "{items>headerVisibility/value}"
          },
          "headericon": {
            "manifestpath": "/sap.card/header/icon/src",
            "type": "string",
            "label": "Card Icon",
            "allowDynamicValues": false,
            "allowSettings": false,
            "visualization": {
              "type": "IconSelect",
              "settings": {
                "value": "{currentSettings>value}",
                "editable": "{currentSettings>editable}"
              }
            },
            "visible": "{items>headerVisibility/value}"
          },
          "bodyGroup": {
            "label": "Body options",
            "type": "group"
          },
          "widgetSrc": {
            "manifestpath": "/sap.card/configuration/parameters/widgetSrc/value",
            "type": "string",
            "defaultValue": "https://opensocialgadgets-a426ead53.dispatcher.hana.ondemand.com/cards/countdown/web/index.html",
            "label": "Widget Source URL",
            "visible" : false
          },
          "targetDate": {
            "manifestpath": "/sap.card/configuration/parameters/targetDate/value",
            "type": "datetime",
            "defaultValue": new Date(),
            "label": "Final Countdown Date"
          },
          "seconds": {
            "manifestpath": "/sap.card/configuration/parameters/seconds/value",
            "type": "boolean",
            "defaultValue": false,
            "label": "Show Seconds"
          },
          "minutes": {
            "manifestpath": "/sap.card/configuration/parameters/minutes/value",
            "type": "boolean",
            "defaultValue": false,
            "label": "Show Minutes"
          },
          "hours": {
            "manifestpath": "/sap.card/configuration/parameters/hours/value",
            "type": "boolean",
            "defaultValue": false,
            "label": "Show Hours"
          },
          "days": {
            "manifestpath": "/sap.card/configuration/parameters/days/value",
            "type": "boolean",
            "defaultValue": true,
            "label": "Show Days"
          },
          "weeks": {
            "manifestpath": "/sap.card/configuration/parameters/weeks/value",
            "type": "boolean",
            "defaultValue": false,
            "label": "Show Weeks"
          },
          "months": {
            "manifestpath": "/sap.card/configuration/parameters/months/value",
            "type": "boolean",
            "defaultValue": false,
            "label": "Show Months"
          },
          "years": {
            "manifestpath": "/sap.card/configuration/parameters/years/value",
            "type": "boolean",
            "defaultValue": false,
            "label": "Show Years"
          },
          "showCircles": {
            "manifestpath": "/sap.card/configuration/parameters/showCircles/value",
            "type": "boolean",
            "defaultValue": true,
            "label": "Display Circles"
          },
          "filledStyle": {
            "manifestpath": "/sap.card/configuration/parameters/filledStyle/value",
            "type": "boolean",
            "defaultValue": true,
            "label": "Filled Style",
            "visible": "{items>showCircles/value}"
          },
          "color": {
            "manifestpath": "/sap.card/configuration/parameters/color/value",
            "values": {
              "data": {
                "json": [
                  { "text": "Black", "key": "#000000" },
                  { "text": "Grey", "key": "#40484F" },
                  { "text": "Red", "key": "#FF0000" },
                  { "text": "Green", "key": "#00FF00" },
                  { "text": "Blue", "key": "#0000FF" },
                  { "text": "Yellow", "key": "#FFFF00" },
                  { "text": "Cyan", "key": "#00FFFF" },
                  { "text": "Magenta", "key": "#FF00FF" }
                ]
              },
              "item": {
                "text": "{text}",
                "key": "{key}"
              }
            },
            "defaultValue": "",
            "label": "Circles Color",
            "type": "string"
          },
          "circlesHeight": {
            "manifestpath": "/sap.card/configuration/parameters/circlesHeight/value",
            "type": "integer",
            "defaultValue": 120,
            "label": "Circles Height in Pixels"
          },
          "url": {
            "manifestpath": "/sap.card/configuration/parameters/url/value",
            "type": "string",
            "defaultValue": "",
            "label": "Read More URL"
          },
          "startDate": {
            "manifestpath": "/sap.card/configuration/parameters/startDate/value",
            "type": "datetime",
            "defaultValue": new Date(),
            "visible": false
          },
          "endMessage": {
            "manifestpath": "/sap.card/configuration/parameters/endMessage/value",
            "type": "string",
            "defaultValue": "",
            "label": "Countdown End Message"
          },
          "height": {
            "manifestpath": "/sap.card/configuration/parameters/height/value",
            "type": "integer",
            "defaultValue": 570,
            "label": "Height in pixels",
            "visualization": {
              "type": "sap/m/Slider",
              "settings": {
                "value": "{currentSettings>value}",
                "min": 30,
                "max": 600,
                "width": "80%",
                "showAdvancedTooltip": true,
                "showHandleTooltip": false,
                "inputsAsTooltips": true,
                "enabled": "{currentSettings>editable}"
              }
            }
          }
        }
      },
      preview: {
        modes: "Live"
      }
    };
  };
  return Configuration;
});


