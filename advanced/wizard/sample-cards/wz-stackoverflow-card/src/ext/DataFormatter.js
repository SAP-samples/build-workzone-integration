sap.ui.define(["sap/ui/integration/Extension"], function (Extension) {
  "use strict";

  var DataFormatter = Extension.extend("sap.it.wz.cards.stackoverflow.extension");
  /*
    Here is Extension class which is used to receive data to display on card.
   */
  DataFormatter.prototype.init = function () {
    Extension.prototype.init.apply(this, arguments);
    this.attachAction(this._handleAction.bind(this));
  };



  // CAN BE REPLACED: Name of the function that used as Extension (getData)
  DataFormatter.prototype.getData = function () {

    let oCard = this.getCard();
    let oParameters = oCard.getCombinedParameters();
    let url = oParameters.url;
    url += "&tagged="+oParameters.tagged
    url += "&sort="+oParameters.sort
    url += "&order="+oParameters.order
    url += "&pagesize="+(oParameters.maxItems)

    return this.getCard().request({     // sending of request with url and dataType parameters
      "url": url,
      "dataType": "json"
    }).then(function (oXMLDocument) {
      let aItems = Array.prototype.map.call(oXMLDocument.items, function (oItem) {

        let numberDate
        if (oParameters.date == "creation") {
          numberDate = oItem.creation_date * 1e3
        } else {
          numberDate = oItem.last_activity_date * 1e3
        }
        let date = new Date(numberDate)
        let highlight
        if (oItem.answer_count == 0) {
          highlight = "Error"
        }
        if (oItem.answer_count > 0) {
          highlight = "Warning"
        }
        if (oItem.accepted_answer_id != null) {
          highlight = "Success"
        }

        oItem.title = replaceAllSymbols(oItem.title)
        oItem.owner.display_name = replaceAllSymbols(oItem.owner.display_name)
        return {
          title: oItem.title.trim(),
          link: oItem.link,
          pubDate: date,
          owner: oItem.owner.display_name,
          highlight: highlight
        };
      });

   
      return aItems
    });
  };

 
  DataFormatter.prototype._handleAction = function (oEvent) {
    console.log("handler");
		var sActionType = oEvent.getParameter("type"),
			mParams = oEvent.getParameter("parameters");

		if (sActionType !== "Custom") {
			return;
		}

		switch (mParams.method) {
			case "askQuestion":
				this._askQuestion();
				break;
      case "goToFeed":
				this._goToFeed();
				break;
			default:
				Log.error("Method" + mParams.method + " not recognized");
		}
	};

  DataFormatter.prototype._askQuestion = function () {
    var oCard = this.getCard();
    var params = oCard.getCombinedParameters();
    oCard.triggerAction({
      type: "Navigation",
      parameters: {
        "url": "https://stackoverflow.com/questions/ask?tags=" + params.tagged
      }
    });
	};

  DataFormatter.prototype._goToFeed = function () {
    var oCard = this.getCard();
    var params = oCard.getCombinedParameters();
    var tags = params.tagged.split(";").join(" ");
    oCard.triggerAction({
      type: "Navigation",
      parameters: {
        "url": "https://stackoverflow.com/questions/tagged/" + tags
      }
    });
	};

  return DataFormatter;


});


function replaceAllSymbols(string){
  string = string.replaceAll('&quot;','\"')
  string = string.replaceAll('&#39;','\'')
  string = string.replaceAll('&gt;','>')
  string = string.replaceAll('&lt;','<')
  string = string.replaceAll('&amp;','&')
  let regexp = /&#\d\d\d;/g
  var newString = string.replace(regexp, (match, $1) => {
    return String.fromCharCode(match.substring(2,5))
  });
  return newString
}

