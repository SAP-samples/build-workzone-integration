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
            "defaultValue": "RSS Feed",
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
          "rssSelector": {
            "manifestpath": "/sap.card/configuration/parameters/rssSelector/value",
            "values": {
              "data": {
                "extension": {
                  "method": "getRssList"
                }
              },
              "item": {
                "text": "{name}",
                "key" : "{url} {item} {title} {link} {pubDate}"
              }
            },
            "defaultValue": {text : "NY Times",
                            key : "https://rss.nytimes.com/services/xml/rss/nyt/Travel.xml item title link pubDate"},
            "label": "Select rss",
            "type": "string",
          },
          "useUrl": {
						"manifestpath": "/sap.card/configuration/parameters/useUrl/value",
						"type": "boolean",
						"label": "Use url",
            "defaultValue" : false
					},
          "userUrl": {
            "manifestpath": "/sap.card/configuration/parameters/userUrl/value",
            "type": "string",
            "defaultValue": "https://rss.nytimes.com/services/xml/rss/nyt/Travel.xml",
            "label": "Url",
            "visible": "{items>useUrl/value}"
          },
          "itemSelector": {
            "manifestpath": "/sap.card/configuration/parameters/itemSelector/value",
            "type": "string",
            "defaultValue": "",
            "label": "Item selector",
            "visible": "{items>useUrl/value}"
          },
          "titleSelector": {
            "manifestpath": "/sap.card/configuration/parameters/titleSelector/value",
            "type": "string",
            "defaultValue": "",
            "label": "Title selector",
            "visible": "{items>useUrl/value}"
          },
          "linkSelector": {
            "manifestpath": "/sap.card/configuration/parameters/linkSelector/value",
            "type": "string",
            "defaultValue": "",
            "label": "Link selector",
            "visible": "{items>useUrl/value}"
          },
          "useDate": {
						"manifestpath": "/sap.card/configuration/parameters/useDate/value",
						"type": "boolean",
						"label": "Use date",
            "defaultValue" : true,
            "visible": "{items>useUrl/value}"
					},
          "dateSelector": {
            "manifestpath": "/sap.card/configuration/parameters/dateSelector/value",
            "type": "string",
            "defaultValue": "",
            "label": "Date selector",
            "visible": "{items>useUrl/value}"
          },
          "maxItems": {
            "manifestpath": "/sap.card/configuration/parameters/maxItems/value",
            "type": "integer",
            "defaultValue": 5,
            "label": "Number of Feeds",
            "visualization": {
              "type": "sap/m/Slider",
              "settings": {
                "value": "{currentSettings>value}",
                "min": 1,
                "max": 25,
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


