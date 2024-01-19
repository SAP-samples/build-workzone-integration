sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'sap/ui/model/json/JSONModel',
  'sap/m/MessageBox',
  'sap/m/MessageToast'
], function (Controller, JSONModel, MessageBox, MessageToast) {
  return Controller.extend('sap.workzone.samples.todo.controller.Widget', {
    onInit() {
      this.setupContextModel();
      this.setupSubmitEvent();
    },

    setupSubmitEvent() {
      const oCard = this.getCard();

      oCard.attachEvent('Page:SubmitWizard', oEvent => {
        const promise = new Promise((resolve, reject) => {
          const submitResult = this.doSubmit();

          if (submitResult) {
            reject(submitResult);
          } else {
            resolve('done');
          }
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
      const { todos = [] } = context;

      const hasIncompleteItem = todos.some(item => !item.completed);

      if (hasIncompleteItem) {
        return {
          title: 'There are incomplete todo item',
          level: 'Warning'
        };
      }

      return null;
    },

    persistToDoList() {
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

    doSubmit() {
      const validatedResult = this.doValidate();

      this.persistToDoList();

      if (validatedResult) {
        MessageBox.error(validatedResult.title);
        return validatedResult;
      }

      MessageToast.show('All todos are completed');
    },

    remove(e) {
      this.persistToDoList();
    }
  });
});
