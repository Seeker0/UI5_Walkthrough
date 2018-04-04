sap.ui.define(['sap/ui/core/util/MockServer'], function(MockServer) {
  'use strict';
  return {
    init: function() {
      var oMockServer = new MockServer({
        rootUri: '/'
      });

      oMockServer.simulate('../localService/metadata.xml', {
        sMockdataBaseUrl: 'localService/mockdata',
        bGenerateMissingMockData: true
      });

      var aRequests = oMockServer.getRequests();
      aRequests.push({
        method: 'GET',
        path: new RegExp('FindUpcomingMeetups(.*)'),
        response: function(oXhr, sUrlParams) {
          jQuery.sap.log.debug('Incoming request for FindUpcomingMeetups');
          var today = new Date();
          today.setHours(0);
          today.setMinutes(0);
          today.setSeconds(0);
          var oResponse = jQuery.sap.sjax({
            url:
              '/Meetups?$filter=EventDate ge ' +
              '/Date(' +
              today.getTime() +
              ')/'
          });
          oXhr.respondJSON(200, {}, JSON.stringify(oResponse.data));
          return true;
        }
      });
      oMockServer.setRequests(aRequests);

      var fnCustom = function(oEvent) {
        var oXhr = oEvent.getParameter('oXhr');
        if (oXhr && oXhr.url.indexOf('first') > -1) {
          oEvent.getParameter('oFilteredData').results.splice(3, 100);
        }
      };
      oMockServer.attachAfter('GET', fnCustom, 'Meetups');

      oMockServer.start();
      jQuery.sap.log.info('Running the app with mock data');
    }
  };
});
