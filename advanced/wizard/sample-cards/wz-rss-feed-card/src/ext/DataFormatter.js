const rssList = getAllRss();
sap.ui.define(["sap/ui/integration/Extension"], function (Extension) {
  "use strict";

  var items, nodes, oCard, oParameters

  var DataFormatter = Extension.extend("sap.it.wz.cards.rss_feed.extension");

  DataFormatter.prototype.init = function () {
    Extension.prototype.init.apply(this, arguments);
  };

  DataFormatter.prototype.getRss = function () {

    oCard = this.getCard();
    oParameters = oCard.getCombinedParameters();
    var url
    var rssUrl, item, title, link, pubDate
   

    if (oParameters.useUrl) {
      rssUrl = oParameters.userUrl
      item = oParameters.itemSelector
      title = oParameters.titleSelector
      link = oParameters.linkSelector
      pubDate = oParameters.dateSelector
    } else {
      [rssUrl, item, title, link, pubDate] = oParameters.rssSelector.split(" ");
    }
    url = oParameters.url + rssUrl
    items = oCard.request({
      "url": url,
      "dataType": "xml"
    }).then(function (oXMLDocument) {

      let aItems = oXMLDocument.querySelectorAll(item);
      return Array.prototype.map.call(aItems, function (oItem) {
        let item = {};
        item.title = oItem.querySelector(title).textContent.trim()
        item.link =  oItem.querySelector(link).textContent.trim()!=""  ? oItem.querySelector(link).textContent.trim() : oItem.querySelector(link).getAttribute("href")
        if(oParameters.useUrl){
          if(oParameters.useDate){
            item.pubDate = new Date(oItem.querySelector(pubDate).textContent.trim());
          }
        }
        else{
          item.pubDate = new Date(oItem.querySelector(pubDate).textContent.trim());
        }
       
        return item
      })
    })
    return items
  };

  DataFormatter.prototype.getRssList = function () {
    return Promise.resolve(rssList);
  };

  return DataFormatter;
});


function getAllRss() {
  return [{
    "name": "NY Times",
    "url": "https://rss.nytimes.com/services/xml/rss/nyt/Travel.xml",
    "item": "item",
    "pubDate": "pubDate",
    "link": "link",
    "title": "title"
  },
  {
    "name": "AlJazeera",
    "url": "http://www.aljazeera.com/xml/rss/all.xml",
    "item": "item",
    "pubDate": "pubDate",
    "link": "link",
    "title": "title"
  },
  {
    "name": "Buzz feed",
    "url": "https://www.buzzfeed.com/world.xml",
    "item": "item",
    "pubDate": "pubDate",
    "link": "link",
    "title": "title"
  },
  {
    "name": "Spiegel",
    "url": "https://www.spiegel.de/schlagzeilen/tops/index.rss",
    "item": "item",
    "pubDate": "pubDate",
    "link": "link",
    "title": "title"
  },
  {
    "name": "Cipher",
    "url": "https://www.thecipherbrief.com/feed",
    "item": "item",
    "pubDate": "pubDate",
    "link": "link",
    "title": "title"
  },
  {
    "name": "Blogs SAP Workzone",
    "url": "https://content.services.sap.com/feed?type=blogpost&tags=73555000100800002781&title=Latest%20blog%20posts%20for%20SAP%20Work%20Zone",
    "item": "entry",
    "pubDate": "published",
    "link": "link",
    "title": "title"
  }]
}
