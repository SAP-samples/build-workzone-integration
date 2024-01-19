sap.ui.define([
  "sap/ui/integration/Extension",
  'sap/ui/model/json/JSONModel',
  'sap/m/MessageBox'
], function (Extension, JSONModel, MessageBox) {
  "use strict";

  // mock of database entries
  var aData = {
    products: [{
      "Id": "HT-1000",
      "Name": "Notebook Basic 15",
      "Description": "Notebook Basic 15 with 2,80 GHz quad core, 15\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro",
      "CurrencyCode": "USD",
      "Price": "956.00"
    },
    {
      "Id": "HT-1001",
      "Name": "Notebook Basic 17",
      "Description": "Notebook Basic 17 with 2,80 GHz quad core, 17\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro",
      "CurrencyCode": "USD",
      "Price": "1249.00"
    },
    {
      "Id": "HT-1002",
      "Name": "Notebook Basic 18",
      "Description": "Notebook Basic 18 with 2,80 GHz quad core, 18\" LCD, 8 GB DDR3 RAM, 1000 GB Hard Disc, Windows 8 Pro",
      "CurrencyCode": "USD",
      "Price": "1570.00"
    },
    {
      "Id": "HT-1003",
      "Name": "Notebook Basic 19",
      "Description": "Notebook Basic 19 with 2,80 GHz quad core, 19\" LCD, 8 GB DDR3 RAM, 1000 GB Hard Disc, Windows 8 Pro",
      "CurrencyCode": "USD",
      "Price": "1650.00"
    },
    {
      "Id": "HT-1004",
      "Name": "ITelO Vault",
      "Description": "Digital Organizer with State-of-the-Art Storage Encryption",
      "CurrencyCode": "USD",
      "Price": "299.00"
    },
    {
      "Id": "HT-1005",
      "Name": "Notebook Professional 15",
      "Description": "Notebook Professional 15 with 2,80 GHz quad core, 15\" Multitouch LCD, 8 GB DDR3 RAM, 500 GB SSD - DVD-Writer (DVD-R/+R/-RW/-RAM),Windows 8 Pro",
      "CurrencyCode": "USD",
      "Price": "1999.00"
    },
    {
      "Id": "HT-1006",
      "Name": "Notebook Professional 17",
      "Description": "Notebook Professional 17 with 2,80 GHz quad core, 17\" Multitouch LCD, 8 GB DDR3 RAM, 500 GB SSD - DVD-Writer (DVD-R/+R/-RW/-RAM),Windows 8 Pro",
      "CurrencyCode": "USD",
      "Price": "2299.00"
    }
    ],
    count: 7
  };

  return Extension.extend("sap.wz.cards.samples.quickActions", {
    init: function () {
      Extension.prototype.init.apply(this, arguments);

      this.attachAction(this._handleAction.bind(this));
    },

    onCardReady() {
      this.setupContextModel();
      this.setupSubmitEvent();
      this.refreshData();
    },

    setupSubmitEvent: function () {
      const oCard = this.getCardInstance();

      oCard.attachEvent('Page:SubmitWizard', oEvent => {
        const promise = new Promise((resolve, reject) => {
          const validatedResult = this.doValidate();

          if (validatedResult) {
            MessageBox.error(validatedResult.title);
            reject(validatedResult);
            return;
          }

          setTimeout(() => {
            resolve('submission is done')
          }, 500);
        });

        oEvent.mParameters.submitPromise = promise;
      });
    },

    getCardContext() {
      const oCard = this.getCardInstance();
      const parameters = oCard.getCombinedParameters();

      return parameters['host.context'];
    },

    async setupContextModel() {
      const { context, flow } = this.getCardContext();
      const contextModel = new JSONModel(context);
      const flowModel = new JSONModel(flow);

      this.setModel(contextModel, 'context');
      this.setModel(flowModel, 'flow');
    },

    getData: function () {
      const context = this.getWizardContext();
      const favoriteIds = context.favoriteIds || [];
      const mergedData = {
        ...aData,
        products: aData.products.map(item => {
          return {
            ...item,
            isFavorite: favoriteIds.includes(item.Id)
          }
        })
      }

      return Promise.resolve(mergedData);
    },

    getCardInstance: function () {
      return this._oCard;
    },

    doValidate: function () {
      const context = this.getWizardContext();
      const { favoriteIds } = context;

      if (!favoriteIds || favoriteIds.length < 1) {
        return {
          title: 'Please favorite at least one item',
          level: 'Error'
        };
      }

      return null;
    },

    getWizardContext() {
      const model = this.getModel('context');
      const context = model.getData();

      return context;
    },

    refreshData() {
      const oCard = this.getCardInstance();
      oCard.refreshData();
    },

    _handleAction: function (oEvent) {
      const oParameters = oEvent.getParameter("parameters");

      if (oParameters.method === "addToFavorites") {
        // add this item to favorite
        this._addToFavorites(oParameters.id)
          .then(() => {
            this.refreshData();
          });
      }
    },

    _addToFavorites: async function (sId) {
      const context = this.getWizardContext();
      const oCard = this.getCardInstance();

      const favoriteIds = context.favoriteIds || [];

      var index = favoriteIds.indexOf(sId);

      if (index === -1) {
        favoriteIds.push(sId);
      } else {
        favoriteIds.splice(index, 1);
      }

      context.favoriteIds = favoriteIds;

      // emit UpdateHostContext to persistent this favorite ids to DWS
      oCard.triggerAction({
        type: 'Custom',
        parameters: [{
          actionType: 'UpdateHostContext',
          content: {
            ...context,
            favoriteIds
          }
        }]
      });
    }
  });
});