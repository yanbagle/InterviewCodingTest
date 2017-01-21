var mainApp = angular.module('mainApp');

mainApp.factory('util', function(){
    
    var service = {};
    
    service.parseResponse = function(res){
       var transactions = res.data.transactions;
       console.log("length: " + transactions.length);
       for(var i = 0; i < transactions.length; i++) {
           var obj = transactions[i];
           console.log(obj.merchant);
       }                                                                   
    };
    
    return service;
    
});