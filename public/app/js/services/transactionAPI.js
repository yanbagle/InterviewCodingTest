var mainApp = angular.module("mainApp");
mainApp.factory('transactionApi', function($http,$q) {
   var service = {};
   
   //calls API to get all transactions from user
   service.getAllTransactions = function() {
       var deferred = $q.defer();

       $http({
            method : 'POST',
            url : 'https://2016.api.levelmoney.com/api/v2/core/get-all-transactions',
            data: {"args": {"uid":  1110590645, "token":  "3C9D5CBC670ADF29BE22E752398AED7E", "api-token":  "AppTokenForInterview", "json-strict-mode": false, "json-verbose-response": false}}, 
            headers:  {
                'Content-Type' : 'application/json',
                'Accept': 'application/json'
            }
        }).then(function successCallback(response) {
           deferred.resolve(response);
        }, function errorCallback(err) {
            alert('Error calling API: ' + err.status);
            deferred.reject(err);
        });
       
       return deferred.promise;
   };
   
   return service;
}); 