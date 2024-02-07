sap.ui.define(["sap/ui/integration/Designtime"
], function (Designtime) {
  "use strict";

/* 
  This is description of configuration ui. Here you can provide your values
  to customize your card configuration
*/

  var Configuration = Designtime.extend("sap.workzone.cpkg.card.sample.Configuration");
  Configuration.prototype.create = function () {
    return {
      form: {
        items: { 
          "group1": {
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
            "defaultValue": "Stack",
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
          "group2": {
            "label": "Body options",
            "type": "group"
          },
          "tagged": {
            "manifestpath": "/sap.card/configuration/parameters/tagged/value",
            "type": "string",
            "defaultValue": "stack-overflow-for-teams",
            "label": "Tags divided by semicolon"
          },          
          "sort": {
            "manifestpath": "/sap.card/configuration/parameters/sort/value",
            "values": {
              "data": {
                "json": [
                  { "key": "activity", "text": "activity" },
                  { "key": "creation", "text": "creation" },
                  { "key": "votes", "text": "votes" },
                  { "key": "relevance", "text": "relevance" }
                ]
              },
              "item": {
                "text": "{text}",
                "key": "{key}"
              }
            },
            "defaultValue": "activity",
            "label": "Sort Type",
            "type": "string"
          },
          "order": {
            "manifestpath": "/sap.card/configuration/parameters/order/value",
            "values": {
              "data": {
                "json": [
                  { "key": "desc", "text": "descending" },
                  { "key": "asc", "text": "ascending" }
                ]
              },
              "item": {
                "text": "{text}",
                "key": "{key}"
              }
            },
            "defaultValue": "desc",
            "label": "Sort Order",
            "type": "string"
          },
          "date": {
            "manifestpath": "/sap.card/configuration/parameters/date/value",
            "values": {
              "data": {
                "json": [
                  { "key": "last_activity", "text": "Last activity" },
                  { "key": "creation", "text": "Creation" }
                ]
              },
              "item": {
                "text": "{text}",
                "key": "{key}"
              }
            },
            "defaultValue": "creation",
            "label": "Date to show",
            "type": "string"
          },
          "maxItems": {
            "manifestpath": "/sap.card/configuration/parameters/maxItems/value",
            "type": "integer",
            "defaultValue": 5,
            "label": "Number of Questions",
            "visualization": {
              "type": "sap/m/Slider",
              "settings": {
                "value": "{currentSettings>value}",
                "min": 1,
                "max": 10,
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


