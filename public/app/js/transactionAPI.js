var mainApp = angular.module("mainApp");
mainApp.factory('transactionApi', function($http) {
   var service = {};
   
   service.getAllTransactions = function(payload) {
       $http({
            method : 'POST',
            url : 'https://2016.api.levelmoney.com/api/v2/core/get-all-transactions',
            data: {"args": {"uid":  1110590645, "token":  "3C9D5CBC670ADF29BE22E752398AED7E", "api-token":  "AppTokenForInterview", "json-strict-mode": false, "json-verbose-response": false}}, 
            headers:  {
                'Content-Type' : 'application/json',
                'Accept': 'application/json'
            }
        }).then(function successCallback(response) {
            console.log(JSON.stringify(response));
        }, function errorCallback(response) {
            console.log(response.statusText);
        });
   };
   
   return service;
}); 