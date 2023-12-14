sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'sap/ui/model/json/JSONModel'
], function (Controller, JSONModel) {
  return Controller.extend('sap.workzone.samples.component.vaccinationStatus.controller.Widget', {
    onInit() {
      this.setupContextModel();
      this.setupSubmitEvent();
    },

    async setupContextModel() {
      const view = this.getView();
      const { context, flow } = this.getCardContext();
      const contextModel = new JSONModel(context);
      const flowModel = new JSONModel(flow);

      view.setModel(contextModel, 'context');
      view.setModel(flowModel, 'flow');
    },

    setupSubmitEvent() {
      console.log('vaccinationStatus::setupSubmitEvent');

      const oCard = this.getCard();

      oCard.attachEvent('Page:SubmitWizard', (oEvent) => {
        console.log(oEvent);

        const promise = new Promise((resolve, reject) => {
          this.doSubmit();

          setTimeout(() => {
            resolve('vaccinationStatus is done');
          }, 1000);
        });

        oEvent.mParameters.submitPromise = promise;
      });
    },

    getCard() {
      const component = this.getOwnerComponent();
      // eslint-disable-next-line no-underscore-dangle
      const oCard = component.card || component.oCard || component.oComponentData.__sapUiIntegration_card;

      return oCard;
    },

    getCardContext() {
      const parameters = this.getCombinedParameters();

      return parameters['host.context'];
    },

    getCombinedParameters() {
      const oCard = this.getCard();

      return oCard.getCombinedParameters();
    },

    getConfiguration() {
      let oParentManifest = this.getOwnerComponent().getManifestEntry('sap.card');

      if (!oParentManifest) {
        oParentManifest = this.getOwnerComponent().getManifestEntry('sap.widget');
      }

      return oParentManifest.configuration;
    },

    getDestinationUrl(name, endpoint) {
      const hostId = this.getOwnerComponent().oContainer.getParent().getParent().getHost();
      const oHost = sap.ui.getCore().byId(hostId);

      return oHost.getDestination(name).then((destinationUrl) => `${destinationUrl}/${endpoint}`);
    },

    doSubmit() {
      const oCard = this.getCard();

      oCard.triggerAction({
        type: 'Custom',
        parameters: [{
          actionType: 'UpdateHostContext',
          content: {
            confirmed: true
          }
        }]
      });
    },

    press() {
      this.doSubmit();
    }
  });
});
