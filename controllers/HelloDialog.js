sap.ui.define(['sap/ui/base/ManagedObject'], function(ManagedObject) {
  'use strict';

  return ManagedObject.extend(
    'sap.ui.demo.walkthrough.controllers.HelloDialog',
    {
      constructor: function(oView) {
        this._oView = oView;
      },

      exit: function() {
        delete this._oView;
      },

      open: function() {
        let oView = this._oView;
        let oDialog = oView.byId('helloDialog');

        if (!oDialog) {
          let oFragmentController = {
            onCloseDialog: function() {
              oDialog.close();
            }
          };

          oDialog = sap.ui.xmlfragment(
            oView.getId(),
            'sap.ui.demo.walkthrough.views.HelloDialog',
            oFragmentController
          );

          oView.addDependent(oDialog);
        }
        oDialog.open();
      }
    }
  );
});
