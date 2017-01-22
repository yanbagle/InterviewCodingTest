var mainApp = angular.module("mainApp");
mainApp.factory('filterTransactions', function() {
   var service = {};
   
   service.noDonuts = function(transactionsData){
       var donutMerchants = ['Krispy Kreme Donuts','Dunkin #336784'];
       var dataCopy = JSON.parse(JSON.stringify(transactionsData));
       var found = true;
       for(var i = 0; i < dataCopy.data.transactions.length; i++){
           for(var j = 0; j < donutMerchants.length; j++){
               if(dataCopy.data.transactions[i] !== undefined && 
                  dataCopy.data.transactions[i].merchant == donutMerchants[j]){
                   delete dataCopy.data.transactions[i];
                   break;
               }
           }
       }
       return dataCopy;
   };
    
   service.noCreditPayments = function(transModelArray, transSpendArray){
       
   };
    
   return service;
}); 