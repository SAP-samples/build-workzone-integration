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
            "defaultValue": "Flip Card",
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
          "url": {
            "manifestpath": "/sap.card/configuration/parameters/url/value",
            "type": "string",
            "defaultValue": "",
            "label": "Navigation URL"
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
          },
          "group1": {
            "label": "Front Side Settings",
            "type": "group"
          },
          "frontHeader": {
            "manifestpath": "/sap.card/configuration/parameters/frontHeader/value",
            "type": "string",
            "defaultValue": "",
            "label": "Header Text"
          },
          "frontDescription": {
            "manifestpath": "/sap.card/configuration/parameters/frontDescription/value",
            "type": "string",
            "defaultValue": "",
            "label": "Description Text"
          },
          "frontCaption": {
            "manifestpath": "/sap.card/configuration/parameters/frontCaption/value",
            "type": "string",
            "defaultValue": "",
            "label": "Caption Text"
          },
          "frontImage": {
            "manifestpath": "/sap.card/configuration/parameters/frontImage/value",
            "type": "string",
            "defaultValue": "",
            "label": "Background Image Link"
          },
          "frontColor": {
            "manifestpath": "/sap.card/configuration/parameters/frontColor/value",
            "type": "string",
            "defaultValue": "#EEEEEE",
            "label": "Background Color"
          },
          "frontFontSize": {
            "manifestpath": "/sap.card/configuration/parameters/frontFontSize/value",
            "type": "integer",
            "defaultValue": 16,
            "label": "Font Size in pixel"
          },
          "frontFontColor": {
            "manifestpath": "/sap.card/configuration/parameters/frontFontColor/value",
            "type": "string",
            "defaultValue": "#000000",
            "label": "Font Color"
          },
          "frontTextShadow": {
            "manifestpath": "/sap.card/configuration/parameters/frontTextShadow/value",
            "type": "string",
            "defaultValue": "",
            "label": "Text Shadow CSS",
            "placeholder": "e.g. grey 1px 1px 0px"
          },
          "group2": {
            "label": "Back Side Settings",
            "type": "group"
          },
          "backHeader": {
            "manifestpath": "/sap.card/configuration/parameters/backHeader/value",
            "type": "string",
            "defaultValue": "",
            "label": "Header Text"
          },
          "backDescription": {
            "manifestpath": "/sap.card/configuration/parameters/backDescription/value",
            "type": "string",
            "defaultValue": "",
            "label": "Description Text"
          },
          "backCaption": {
            "manifestpath": "/sap.card/configuration/parameters/backCaption/value",
            "type": "string",
            "defaultValue": "",
            "label": "Caption Text"
          },
          "backImage": {
            "manifestpath": "/sap.card/configuration/parameters/backImage/value",
            "type": "string",
            "defaultValue": "",
            "label": "Background Image Link"
          },
          "backColor": {
            "manifestpath": "/sap.card/configuration/parameters/backColor/value",
            "type": "string",
            "defaultValue": "#EEEEEE",
            "label": "Background Color"
          },
          "backFontSize": {
            "manifestpath": "/sap.card/configuration/parameters/backFontSize/value",
            "type": "integer",
            "defaultValue": 16,
            "label": "Font Size in pixel"
          },
          "backFontColor": {
            "manifestpath": "/sap.card/configuration/parameters/backFontColor/value",
            "type": "string",
            "defaultValue": "#000000",
            "label": "Font Color"
          },
          "backTextShadow": {
            "manifestpath": "/sap.card/configuration/parameters/backTextShadow/value",
            "type": "string",
            "defaultValue": "",
            "label": "Text Shadow CSS",
            "placeholder": "e.g. grey 1px 1px 0px"
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


