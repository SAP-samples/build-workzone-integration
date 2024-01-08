sap.ui.define(["sap/ui/integration/Designtime"
], function (Designtime) {
	"use strict";

	var Configuration = Designtime.extend("sap.workzone.cpkg.card.sample.Configuration");
	Configuration.prototype.create = function () {
		return {
			form: {
				items: {
					"string": {
						"manifestpath": "/sap.card/configuration/parameters/string/value",
						"defaultValue": "StringValue",
						"label": "Fixed Label Text",
						"type": "string"
					},
					"boolean": {
						"manifestpath": "/sap.card/configuration/parameters/boolean/value",
						"defaultValue": true,
						"label": "Fixed Label Text",
						"type": "boolean"
					},
					"integer": {
						"manifestpath": "/sap.card/configuration/parameters/integer/value",
						"defaultValue": 1,
						"label": "Fixed Label Text",
						"type": "integer"
					},
					"date": {
						"manifestpath": "/sap.card/configuration/parameters/date/value",
						"defaultValue": "",
						"label": "Fixed Label Text",
						"type": "date"
					}
				}
			},
			preview: {
				modes: "Abstract"
			}
		};
	};
	return Configuration;
});


