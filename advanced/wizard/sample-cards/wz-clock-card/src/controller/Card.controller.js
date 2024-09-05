/*
 * ! ${copyright}
 */

sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";

  return Controller.extend("sap.it.wz.cards.clock.controller.Card", {
    onInit: function () {
      if (!this.getOwnerComponent().card) {
        return;
      }
      let oCard = this.getOwnerComponent().card;
      let mParameters = oCard.getCombinedParameters();

      let backgroundColor = mParameters.backgroundColor
      let clockColor = mParameters.clockColor
      let fontSize = mParameters.fontSize
      let offset = mParameters.offset
      let showSeconds = mParameters.showSeconds
      let digit24Mode = mParameters.digit24Mode

      let content = this._getIframeDigitalClock(backgroundColor, clockColor, fontSize, offset, digit24Mode,showSeconds);


      var src = URL.createObjectURL(new Blob([content], { type: "text/html" }));
      var oFrame = this.byId("frame");
      oFrame.setSrc(src);

      if (oCard.editor) {
        oFrame.setPreview(oCard.editor.preview);
      }

      var iPixelHeight = Math.max(mParameters.height, oCard.getCardContent().getDomRef().offsetHeight);
      this.getView().setHeight(iPixelHeight + "px");
    },
    _getIframeDigitalClock: function (backgroundColor, clockColor, fontSize, offset, digit24Mode, showSeconds) {
      return `<!DOCTYPE HTML>
      <html id="card_body">
      <head>
       <style>
       #container{
        min-height: 50px;
        position: relative;
      }
      #clock{
        width : 100%
        text-align: center;
        font-size:${fontSize}px;
        min-width: 100px;
        background-color: ${backgroundColor};
        color: ${clockColor};
        padding: 10px;
        font-family: Arial,Helvetica,sans-serif;
        border-radius: 10px;
        margin: 0 auto;
        position: absolute;
      }
        </style>
      </head>
      <body >
      <div id="container">
        <p id="clock"></p>
      </div>
      </body>
      <script>
    function showTime(){
    var date = new Date();
    var offset = ${offset}
    var h = date.getUTCHours();
    var m = date.getUTCMinutes();
    var s = date.getUTCSeconds();

    h=h+offset
    var calculate
    if(${digit24Mode}){
      calculate = ${calculate24time}
    }else{
      calculate = ${calculate12time}
    }
    if(!${showSeconds}){
      s=0
    }

    var time = calculate(h,m,s)
    document.getElementById("clock").innerText = time;
    document.getElementById("clock").textContent = time;
    
    setTimeout(showTime, 1000);
    }

    showTime();
    </script>
    </html>`;
    }

  });
});


function calculate12time(h, m, s) {
  var session = "AM";
  if(h>24){
    h= h-24
  }
  if(h<0){
    session = "PM"
    h+=12
  }
  if(h == 12){
    session = "PM"
  }
    if(h == 0){
        h = 12;
    }
    if(h > 12){
        h = h - 12;
        if(h==12){
          session=="AM"
        }
        else{
        session = "PM"
        }
    }


  h = (h < 10) ? "0" + h : h;
  m = (m < 10) ? "0" + m : m;
  s = (s < 10) ? "0" + s : s;

  return s == 0 ? h + ":" + m + " " + session : h + ":" + m + ":" + s + " " + session
}


function calculate24time(h, m, s) {
  if (h >= 24) {
    h = h - 24
  }
  if (h < 0) {
    h = h + 24
  }
  h = (h < 10) ? "0" + h : h
  m = (m < 10) ? "0" + m : m
  s = (s < 10) ? "0" + s : s
  return s == 0 ? h + ":" + m : h + ":" + m + ":" + s
}

