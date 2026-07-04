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
            "defaultValue": "Clock",
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
          "offset": {
            "manifestpath": "/sap.card/configuration/parameters/offset/value",
            "values": {
              "data": {
                "json": [
                  { "key": "-11", "text": "-11" },
                  { "key": "-10", "text": "-10" },
                  { "key": "-9", "text": "-9" },
                  { "key": "-8", "text": "-8" },
                  { "key": "-7", "text": "-7" },
                  { "key": "-6", "text": "-6" },
                  { "key": "-5", "text": "-5" },
                  { "key": "-4", "text": "-4" },
                  { "key": "-3", "text": "-3" },
                  { "key": "-2", "text": "-2" },
                  { "key": "-1", "text": "-1" },
                  { "key": "0", "text": "0" },
                  { "key": "1", "text": "+1" },
                  { "key": "2", "text": "+2" },
                  { "key": "3", "text": "+3" },
                  { "key": "4", "text": "+4" },
                  { "key": "5", "text": "+5" },
                  { "key": "6", "text": "+6" },
                  { "key": "7", "text": "+7" },
                  { "key": "8", "text": "+8" },
                  { "key": "9", "text": "+9" },
                  { "key": "10", "text": "+10" },
                  { "key": "11", "text": "+11" },
                  { "key": "12", "text": "+12" }
                ]
              },
              "item": {
                "text": "{text}",
                "key": "{key}"
              }
            },
            "defaultValue": "1",
            "label": "Select UTC zone",
            "type": "string"
          },
          "digit24Mode": {
						"manifestpath": "/sap.card/configuration/parameters/digit24Mode/value",
						"type": "boolean",
						"label": "24h mode",
            "defaultValue" : false
					},
          "showSeconds": {
						"manifestpath": "/sap.card/configuration/parameters/showSeconds/value",
						"type": "boolean",
						"label": "Show seconds",
            "defaultValue" : false
					},
          "backgroundColor": {
            "manifestpath": "/sap.card/configuration/parameters/backgroundColor/value",
            "values": {
              "data": {
                "json": [
                  { "key": "#FFFFFF", "text": "White" },
                  { "key": "#000000", "text": "Black" },
                  { "key": "#1D2D3E", "text": "Dark" }
                ]
              },
              "item": {
                "text": "{text}",
                "key": "{key}"
              }
            },
            "defaultValue": "Dark",
            "label": "Select background color",
            "type": "string"
          },
          "clockColor": {
            "manifestpath": "/sap.card/configuration/parameters/clockColor/value",
            "values": {
              "data": {
                "json": [
                  { "key": "#FFFFFF", "text": "White" },
                  { "key": "#000000", "text": "Black" },
                  { "key": "#1D2D3E", "text": "Dark" }
                ]
              },
              "item": {
                "text": "{text}",
                "key": "{key}"
              }
            },
            "defaultValue": "White",
            "label": "Select clock color",
            "type": "string"
          },
          "fontSize": {
            "manifestpath": "/sap.card/configuration/parameters/fontSize/value",
            "type": "integer",
            "defaultValue": 45,
            "label": "Font size in pixels",
            "visualization": {
              "type": "sap/m/Slider",
              "settings": {
                "value": "{currentSettings>value}",
                "min": 5,
                "max": 100,
                "width": "80%",
                "showAdvancedTooltip": true,
                "showHandleTooltip": false,
                "inputsAsTooltips": true,
                "enabled": "{currentSettings>editable}"
              }
            }
          },
          "height": {
            "manifestpath": "/sap.card/configuration/parameters/height/value",
            "type": "integer",
            "defaultValue": 100,
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


