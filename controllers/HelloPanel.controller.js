sap.ui.define(['sap/ui/core/mvc/Controller', 'sap/m/MessageToast'], function(
  Controller,
  MessageToast
) {
  'use strict';
  return Controller.extend('sap.ui.demo.walkthrough.controllers.HelloPanel', {
    onShowHello: function() {
      let oBundle = this.getView()
        .getModel('i18n')
        .getResourceBundle();
      let sRecipient = this.getView()
        .getModel()
        .getProperty('/recipient/name');
      let sMsg = oBundle.getText('helloMsg', [sRecipient]);

      MessageToast.show(sMsg);
    },
    onOpenDialog: function() {
      let oView = this.getView();
      let oDialog = oView.byId('helloDialog');

      if (!oDialog) {
        oDialog = sap.ui.xmlfragment(
          oView.getId(),
          'sap.ui.demo.walkthrough.views.HelloDialog',
          this
        );
        oView.addDependent(oDialog);
      }

      oDialog.open();
    },
    onCloseDialog: function() {
      this.getView()
        .byId('helloDialog')
        .close();
    }
  });
});
