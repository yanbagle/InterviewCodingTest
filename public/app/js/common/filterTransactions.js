var mainApp = angular.module("mainApp");
mainApp.factory('filterTransactions', function() {
   var service = {};
   
   service.noDonuts = function(transModelArray, transSpendArray){
       var donutMerchants = ['Krispy Kreme Donuts','DUNKIN #336784'];
       for(var i = 0; i < transSpendArray.length; i++){
           for(var j = 0; j < donutMerchants.length; j++){
               if(transModelArray[i].merchant == donutMerchants[j]){
                   transSpendArray[i].splice(i,1); 
                   break;
               }
           }
       }
       return transSpendArray;
   };
    
   service.noCreditPayments = function(transModelArray, transSpendArray){
       
   };
    
   return service;
}); 