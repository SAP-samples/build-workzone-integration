/*
 * ! ${copyright}
 */

sap.ui.define([
  "sap/ui/core/Control",
  "sap/ui/core/Core",
  "sap/m/MessageStrip"
], function (
  Control,
  Core,
  MessageStrip
) {
  "use strict";

  var oStaticArea = Core.getStaticAreaRef();

  function getScrollTop() {
    var B = document.body;
    var D = document.documentElement;
    D = (D.clientHeight) ? D : B;
    return D.scrollTop;
  }

  function getScrollLeft() {
    var B = document.body;
    var D = document.documentElement;
    D = (D.clientWidth) ? D : B;
    return D.scrollLeft;
  }

  function getZIndex(e) {
    var z = window.getComputedStyle(e).getPropertyValue('z-index');
    if (isNaN(z)) {
      if (e.parentNode && e.parentNode.nodeType === 1) {
        return getZIndex(e.parentNode);
      } else {
        return "auto";
      }
    } else {
      return z;
    }
  }

  //Registers an animation frame timer to check whether the position of oDomRef changed
  //and calls the handler if it did
  var VisibleRectObserver = function (oDomRef, fnHandler) {
    if (!VisibleRectObserver._instance) {
      VisibleRectObserver._instance = this;
      this._elements = [];
      this._sizes = [];
      this._handlers = [];
      this._frame = window.requestAnimationFrame(this.checkAll.bind(this));
    }

    if (oDomRef && fnHandler) {
      VisibleRectObserver._instance.register(oDomRef, fnHandler);
    }
    return VisibleRectObserver._instance;
  };

  //loops over the elements and checks for size and position changes
  VisibleRectObserver.prototype.checkAll = function () {
    for (var i = 0; i < this._elements.length; i++) {
      this.check(i);
    }
    this._frame = window.requestAnimationFrame(this.checkAll.bind(this));
  };

  //checks size and position changes for an element and calls the handler
  VisibleRectObserver.prototype.check = function (i) {
    var el = this._elements[i];
    var size = el.getBoundingClientRect(),
      s = JSON.stringify(size);
    if (this._sizes[i] !== s) {
      this._sizes[i] = s;
      this._handlers[i](el, size);
    }
  };

  //registers a dom element and handler to be observed for size and position changes
  VisibleRectObserver.prototype.register = function (oDomElement, fnHandler) {
    if (this._elements.indexOf(oDomElement) > -1) {
      return;
    }
    this._elements.push(oDomElement);
    this._sizes.push("");
    this._handlers.push(fnHandler);
    this.check(VisibleRectObserver._instance._sizes.length - 1);
  };

  //deregisters a dom element from observation
  VisibleRectObserver.prototype.deregister = function (oDomElement) {
    var iIndex = this._elements.indexOf(oDomElement);
    if (iIndex === -1) {
      return;
    }
    this._elements.splice(iIndex, 1);
    this._sizes.splice(iIndex, 1);
    this._handlers.splice(iIndex, 1);
  };


  var Frame = Control.extend("sap.it.wz.cards.flip_card.control.Frame", {
    metadata: {
      properties: {
        src: {
          type: "string"
        },
        preview: {
          type: "object",
          defaultValue: null
        }
      }
    },
    renderer: function (oRm, oControl) {
      oRm.openStart("div");
      oRm.addStyle("min-width", "100%");
      oRm.addStyle("min-height", "100%");
      oRm.addStyle("padding", "1rem");
      oRm.addStyle("box-sizing", "border-box");
      oRm.writeStyles();
      oRm.writeElementData(oControl);
      oRm.openEnd();

      oRm.openStart("div");
      oRm.writeAttribute("tabindex", "0");
      oRm.writeAttributeEscaped("id", oControl.getId() + "-before");
      oRm.openEnd();
      oRm.close("div");

      oRm.openStart("div");
      oRm.addStyle("min-width", "100%");
      oRm.addStyle("min-height", "100%");
      oRm.addStyle("padding", "1rem");
      oRm.writeAttributeEscaped("id", oControl.getId() + "-content");
      oRm.writeStyles();
      oRm.openEnd();
      oRm.close("div");

      oRm.openStart("div");
      oRm.writeAttribute("tabindex", "0");
      oRm.writeAttributeEscaped("id", oControl.getId() + "-after");
      oRm.openEnd();
      oRm.close("div");

      oRm.close("div");

    }
  });

  Frame.prototype.setSrc = function (vValue) {
    if (vValue === this.getSrc()) {
      return this;
    }
    //avoid re-rendering
    this.setProperty("src", vValue, true);

    this._sRealSource = vValue;

    if (this._oFrameDomRef) {
      this._oFrameDomRef.src = this._sRealSource;
    }
    return this;
  };

  Frame.prototype.init = function () {
    this._oVisibleRectObserver = new VisibleRectObserver();
  };

  Frame.prototype.onBeforeRendering = function () {
    this._oVisibleRectObserver.deregister(this.getDomRef());
    this._hideFrame();
  };

  Frame.prototype.onAfterRendering = function () {
    if (this._sRealSource && this._sRealSource.length < 5) {
      this._showMessage("Information", this.getModel("i18n").getProperty("FRAMECONFIGUREURL"));
      this._sRealSource = "";
      return this;
    }
    if (false && this._sRealSource.indexOf("http:") === 0) {
      this._showMessage("Error", this.getModel("i18n").getProperty("FRAMEHTTPERROR"));
      this._sRealSource = "";
      return this;
    }
    if (this._sRealSource && this._sRealSource.indexOf("https://") !== 0) {
      //this._sRealSource = "https://" + this._sRealSource;
    }
    if (this._sRealSource) {
      this._iErrorTimer = window.setTimeout(this._handleError.bind(this), 1000 * 20);
      if (!this._oFrameDomRef) {
        this._initFrame();
      }
    } else {
      this._showMessage("Information", this.getModel("i18n").getProperty("FRAMECONFIGUREURL"));
    }
  };

  Frame.prototype.exit = function () {
    this._oVisibleRectObserver.deregister(this.getDomRef());
    return this;
  };

  Frame.prototype.destroy = function () {
    if (this._oFrameDomRef) {
      this._oFrameDomRef.parentNode.removeChild(this._oFrameDomRef);
      this._oFrameDomRef.src = "";
    }
    if (this._oFrameBlockerDomRef) {
      this._oFrameBlockerDomRef.parentNode.removeChild(this._oFrameBlockerDomRef);
      this._oFrameBlockerDomRef.src = "";
    }
    return Control.prototype.destroy.apply(this, arguments);
  };

  Frame.prototype._hideFrame = function () {
    //hide the frame until it is loaded
    if (!this._oFrameDomRef) {
      return;
    }
    this._oFrameDomRef.style.top = "-10000px";
    this._oFrameDomRef.style.left = "50px";
  };

  Frame.prototype._initFrame = function () {
    var oFrame = document.getElementById("id", this.getId() + "-frame");
    if (oFrame) {
      this._oFrameDomRef = oFrame;
      return;
    }
    var iTab = this.getPreview() ? -1 : 0;
    this._oFrameDomRef = this._createFrame(this.getId() + "-frame", this._sRealSource, iTab);
    oStaticArea.insertBefore(this._oFrameDomRef, oStaticArea.firstChild);
    if (this.getPreview()) {
      this._oFrameBlockerDomRef = this._createFrame(this.getId() + "-frameblocker", "", iTab);
      oStaticArea.insertBefore(this._oFrameBlockerDomRef, oStaticArea.firstChild);
    }
  };

  Frame.prototype._createFrame = function (sId, sSource, iTab) {
    var oLocalRM = Core.getRenderManager();
    oLocalRM.openStart("iframe");
    oLocalRM.addStyle("position", "absolute");
    oLocalRM.addStyle("border", "none");
    oLocalRM.addStyle("top", "-10000px");
    oLocalRM.addStyle("left", "20px");
    oLocalRM.addStyle("margin", "1px");
    oLocalRM.writeStyles();
    oLocalRM.writeAttribute("tabIndex", "" + iTab);
    oLocalRM.writeAttributeEscaped("id", sId);
    oLocalRM.writeAttributeEscaped("scrolling", "auto");
    if (sSource) {
      oLocalRM.writeAttributeEscaped("src", sSource);
    }
    oLocalRM.openEnd();
    oLocalRM.close("iframe");
    var div = document.createElement("div");
    oLocalRM.flush(div);
    var oFrame = div.firstChild;
    oFrame.addEventListener("load", this._handleLoad.bind(this));
    return oFrame;
  };

  Frame.prototype._handleLoad = function () {
    if (this._iErrorTimer) {
      clearTimeout(this._iErrorTimer);
    }
    this._oVisibleRectObserver.register(this.getDomRef(), this._syncFramePosition.bind(this));
  };

  Frame.prototype._handleError = function () {
    if (this._iErrorTimer) {
      clearTimeout(this._iErrorTimer);
    }
    //this._showMessage("Error", this.getModel("i18n").getProperty("FRAMEERROR15SEC"));
  };

  Frame.prototype._applyFramePosition = function (oFrame, oElement, oRect) {
    if (!oFrame) {
      return;
    }
    if (oRect.height === 0 || oRect.width === 0) {
      this._hideFrame();
      return;
    }
    var iZIndex = getZIndex(oElement);
    oFrame.style.zIndex = iZIndex === "auto" ? 2 : iZIndex;
    oFrame.style.left = (oRect.left + getScrollLeft()) + "px";
    oFrame.style.top = (oRect.top + getScrollTop()) + "px";

    if (this.getPreview()) {
      var oPreviewInfo = this.getPreview().getTransformContentInfo();
      oFrame.style.width = ((oRect.width - 2) / oPreviewInfo.transformFactor) + "px";
      oFrame.style.height = ((oRect.height - 2) / oPreviewInfo.transformFactor) + "px"
      oFrame.style.transform = oPreviewInfo.transformStyle;
      oFrame.style.transformOrigin = oPreviewInfo.transformOriginStyle;
      oFrame.style.zIndex = oPreviewInfo.zIndex;
    } else {
      oFrame.style.width = (oRect.width - 2) + "px";
      oFrame.style.height = (oRect.height - 2) + "px";
    }
  };

  Frame.prototype._syncFramePosition = function (oElement, oRect) {
    this._applyFramePosition(this._oFrameDomRef, oElement, oRect);
    this._applyFramePosition(this._oFrameBlockerDomRef, oElement, oRect);
  };

  Frame.prototype._showMessage = function (sType, sText) {
    if (this._oMessage) {
      this._oMessage.destroy();
    }
    this._oMessage = new MessageStrip(this.getId() + "-message", {
      text: sText,
      type: sType,
      showIcon: true
    });
    var oDomRef = this.getDomRef();
    if (oDomRef) {
      this._oMessage.placeAt(oDomRef);
    }
  };
  function focusAfter() {
    this.getDomRef("after").focus();
    window.removeEventListener("focus", focusAfter);
  }
  Frame.prototype.onsaptabnext = function (oEvent) {
    if (oEvent.target === this.getDomRef("before")) {
      if (this._oFrameDomRef && !this.getPreview()) {
        setTimeout(function () {
          this._oFrameDomRef.contentWindow.focus();
        }.bind(this), 20);

      }
    }
  };

  Frame.prototype.onsaptabprevious = function (oEvent) {
    if (oEvent.target === this.getDomRef("after")) {
      if (this._oFrameDomRef && !this.getPreview()) {
        setTimeout(function () {
          this._oFrameDomRef.contentWindow.focus();
        }.bind(this), 20);
      }
    }
  };
  return Frame;

});
