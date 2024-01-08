sap.ui.define(["sap/ui/integration/Extension"], function (Extension) {
	"use strict";

	//this extension is not used in the template.
	//please delete this file if it is not needed.
	//to enable the usage of an extenstion, add a extension entry in the manifest "sap.card": { "extension": "ext/extension", ...}

	var CardExtension = Extension.extend("sap.workzone.cpkg.card.sample.ext.extension");

	CardExtension.prototype.init = function () {
		Extension.prototype.init.apply(this, arguments);
		//set custom action
		this.setActions([{
			type: "Navigation",
			parameters: {
				url: "https://training.sap.com/"
			},
			icon: "sap-icon://learning-assistant",
			target: "_blank",
			text: "External Link"
		}]);

		//set custom formatters
		this.setFormatters({
			toUpperCase: function (sName) {
				return sName.toUpperCase();
			}
		});
	};

	// should return a promise
	CardExtension.prototype.getData = function () {

	};

	return CardExtension;
});