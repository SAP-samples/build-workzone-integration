sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'sap/ui/model/json/JSONModel',
  'sap/m/MessageBox'
], function (Controller, JSONModel, MessageBox) {
  return Controller.extend('sap.workzone.samples.vaccination.controller.Widget', {
    onInit() {
      this.setupContextModel();
      this.setUpSubmitEvent();
    },

    setUpSubmitEvent() {
      const oCard = this.getCard();

      oCard.attachEvent('Page:SubmitWizard', oEvent => {
        console.log(oEvent);

        const promise = new Promise((resolve) => {
          const validatedResult = this.doValidate();
          this.doSubmit();

          if (validatedResult) {
            MessageBox.error(validatedResult.title);
            reject(validatedResult);
            return;
          }

          setTimeout(() => {
            resolve('vaccination is done')
          }, 500);
        });

        oEvent.mParameters.submitPromise = promise;
      });
    },

    setupContextModel() {
      const view = this.getView();
      const { context, flow } = this.getCardContext();
      const contextModel = new JSONModel(context);
      const flowModel = new JSONModel(flow);

      view.setModel(contextModel, 'context');
      view.setModel(flowModel, 'flow');
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

    doValidate() {
      const view = this.getView();
      const contextModel = view.getModel('context');
      const context = contextModel.getData();

      if (!context.vaccinated) {
        return {
          title: 'Please chose vaccination',
          level: 'Error'
        };
      }

      if (!context.vaccinatedStatus) {
        return {
          title: 'Please chose vaccinated status',
          level: 'Error'
        };
      }

      if (!context.firstDoesDate) {
        return {
          title: 'Please first vaccinated date',
          level: 'Error'
        };
      }

      if (!context.secondDoesDate) {
        return {
          title: 'Please second vaccinated date',
          level: 'Warning'
        };
      }

      return null;
    },

    doSubmit() {
      const view = this.getView();
      const contextModel = view.getModel('context');
      const context = contextModel.getData();
      const oCard = this.getCard();

      oCard.triggerAction({
        type: 'Custom',
        parameters: [{
          actionType: 'UpdateHostContext',
          content: context
        }]
      });
    },

    press() {
      this.doSubmit();
    }
  });
});
