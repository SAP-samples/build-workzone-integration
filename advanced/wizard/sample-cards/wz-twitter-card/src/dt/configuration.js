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
            "defaultValue": "Chatbot",
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
          "widgetType": {
            "manifestpath": "/sap.card/configuration/parameters/widgetType/value",
            "values": {
              "data": {
                "json": [
                  { "key": "profile", "text": "User Timeline" },
                  { "key": "list", "text": "List Timeline" },
                  { "key": "tweet", "text": "Embedded Tweet" }
                ]
              },
              "item": {
                "text": "{text}",
                "key": "{key}"
              }
            },
            "defaultValue": "",
            "label": "Select Twitter Type",
            "type": "string"
          },
          "userName": {
            "manifestpath": "/sap.card/configuration/parameters/userName/value",
            "type": "string",
            "defaultValue": "",
            "placeholder": "e.g. @twitter",
            "label": "Twitter Username (e.g @twitter)",
            "visible": "{= ${items>widgetType/value} !== 'tweet' && ${items>widgetType/value} !== 'moment' && ${items>widgetType/value} !== 'collection'}"
          },
          "listName": {
            "manifestpath": "/sap.card/configuration/parameters/listName/value",
            "type": "string",
            "defaultValue": "",
            "label": "List Name",
            "visible": "{= ${items>widgetType/value} === 'list'}"
          },
          "tweetId": {
            "manifestpath": "/sap.card/configuration/parameters/tweetId/value",
            "type": "string",
            "defaultValue": "",
            "label": "Tweet ID",
            "visible": "{= ${items>widgetType/value} === 'tweet'}"
          },
          "collectionId": {
            "manifestpath": "/sap.card/configuration/parameters/collectionId/value",
            "type": "string",
            "defaultValue": "",
            "label": "Collection ID",
            "visible": "{= ${items>widgetType/value} === 'collection'}"
          },
          "theme": {
            "manifestpath": "/sap.card/configuration/parameters/theme/value",
            "values": {
              "data": {
                "json": [
                  { "key": "light", "text": "Light" },
                  { "key": "dark", "text": "Dark" },
                  { "key": "auto", "text": "Automatic" }
                ]
              },
              "item": {
                "text": "{text}",
                "key": "{key}"
              }

            },
            "defaultValue": "",
            "label": "Color Theme",
            "type": "string"
          },
          "header": {
            "manifestpath": "/sap.card/configuration/parameters/header/value",
            "type": "boolean",
            "defaultValue": false,
            "label": "Show Header",
            "visible": "{= ${items>widgetType/value} !== 'tweet'}"
          },
          "footer": {
            "manifestpath": "/sap.card/configuration/parameters/footer/value",
            "type": "boolean",
            "defaultValue": false,
            "label": "Show Footer",
            "visible": "{= ${items>widgetType/value} !== 'tweet'}"
          },
          "setTweetsLimit": {
            "manifestpath": "/sap.card/configuration/parameters/setTweetsLimit/value",
            "type": "boolean",
            "defaultValue": false,
            "label": "Limit Number of Tweets",
            "visible": "{= ${items>widgetType/value} !== 'tweet' && ${items>widgetType/value} !== 'list'}"
          },
          "numberOfTweets": {
            "manifestpath": "/sap.card/configuration/parameters/numberOfTweets/value",
            "type": "integer",
            "defaultValue": 20,
            "label": "Number of Feeds",
            "visible": "{= ${items>setTweetsLimit/value}}",
            "visualization": {
              "type": "sap/m/Slider",
              "settings": {
                "value": "{currentSettings>value}",
                "min": 1,
                "max": 20,
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


