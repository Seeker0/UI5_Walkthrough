sap.ui.define(
  [
    'sap/ui/core/UIComponent',
    'sap/ui/model/json/JSONModel',
    'sap/ui/demo/walkthrough/controllers/HelloDialog'
  ],
  function(UIComponent, JSONModel, HelloDialog) {
    'use strict';
    return UIComponent.extend('sap.ui.demo.walkthrough.Component', {
      metadata: {
        manifest: 'json'
      },

      init: function() {
        UIComponent.prototype.init.apply(this, arguments);
        let oData = {
          recipient: {
            name: 'World'
          }
        };

        let oModel = new JSONModel(oData);
        this.setModel(oModel);

        this._helloDialog = new HelloDialog(this.getRootControl());
      },

      exit: function() {
        this._helloDialog.destroy();
        delete this._helloDialog;
      },

      openHelloDialog: function() {
        this._helloDialog.open();
      }
    });
  }
);
