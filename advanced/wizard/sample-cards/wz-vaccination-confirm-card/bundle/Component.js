sap.ui.define([
	"sap/ui/core/UIComponent"
], function (UIComponent) {
	"use strict";

	var Component = UIComponent.extend("sap.workzone.samples.component.vaccinationStatus", {
		onCardReady: function (oCard) {
			this.oCard = oCard;
		}
	});

	return Component;
});
