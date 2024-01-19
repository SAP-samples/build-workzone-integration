function getPressItemIndex(e) {
  let element = e.getSource();

  do {
    if (typeof element.getBindingContextPath === 'function') {
      const path = element.getBindingContextPath();
      const index = path.split('/').pop();
      return index;
    }

    element = element.getParent();
  } while (element);

  return -1;
}

sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'sap/ui/model/json/JSONModel',
  'sap/m/MessageBox',
  'sap/m/MessageToast',
  'sap/ui/model/Filter',
  'sap/ui/model/FilterOperator'
], function (Controller, JSONModel, MessageBox, MessageToast, Filter, FilterOperator) {
  return Controller.extend('sap.workzone.samples.todo.controller.Widget', {
    tabFilters: [],

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

      if (!context.todos) {
        context.todos = [];
      }

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

    getData() {
      const view = this.getView();
      const contextModel = view.getModel('context');
      const context = contextModel.getData();

      return context;
    },

    doValidate() {
      const context = this.getData();
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
      const context = this.getData();
      const oCard = this.getCard();

      oCard.triggerAction({
        type: 'Custom',
        parameters: [{
          actionType: 'UpdateHostContext',
          content: context
        }]
      });
    },

    updateTodoList() {
      const context = this.getData();
      const { todos = [] } = context;

      todos.forEach(function (item) {
        if (item.completed) {
          if (!item.completedAt) {
            item.completedAt = new Date().toLocaleString();
          }
        } else if (item.completedAt) {
          delete item.completedAt;
        }
      });

      this.persistToDoList();
    },

    addTodo() {
      const context = this.getData();
      const { todos = [], newTodo } = context;

      todos.push({
        title: newTodo,
        completed: false
      });

      context.newTodo = '';

      this.persistToDoList();
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
      const index = getPressItemIndex(e);

      if (index === -1) {
        return;
      }

      const context = this.getData();
      const { todos = [] } = context;

      todos.splice(index, 1);

      this.persistToDoList();
    },

    onFilter(event) {
      // First reset current filters
      this.tabFilters = [];

      // add filter for search
      this.filterKey = event.getParameter("item").getKey();

      // eslint-disable-line default-case
      switch (this.filterKey) {
        case "active":
          this.tabFilters.push(new Filter("completed", FilterOperator.EQ, false));
          break;
        case "completed":
          this.tabFilters.push(new Filter("completed", FilterOperator.EQ, true));
          break;
        case "all":
        default:
        // Don't use any filter
      }

      this._applyListFilters();
    },

    _applyListFilters() {
      const list = this.byId("todoList");
      const binding = list.getBinding("items");

      binding.filter(this.tabFilters, "todos");
    }
  });
});
