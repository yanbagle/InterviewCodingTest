var mainApp = angular.module("mainApp");
mainApp.factory('filterTransactions', function() {
   var service = {};
   
   service.filterByMerchants = function(transactionsData, merchants){
       var dataCopy = JSON.parse(JSON.stringify(transactionsData));
       for(var i = 0; i < dataCopy.data.transactions.length; i++){
           for(var j = 0; j < merchants.length; j++){
               if(dataCopy.data.transactions[i] !== undefined && 
                  dataCopy.data.transactions[i].merchant == merchants[j]){
                   delete dataCopy.data.transactions[i];
                   break;
               }
           }
       }
       return dataCopy;
   };
    
   service.noCreditPayments = function(transactionData){
       var date1,date2,date1String,date2String;
       var hourDifference = 0;//for keeping track of hour difference between 2 transactions 
       var amount;
       var dataCopy = JSON.parse(JSON.stringify(transactionsData));
       for(var i = 0; i < dataCopy.length; i++){
            if(dataCopy.data.transactions[i] !== undefined){
                date1String = dataCopy.data.transactions[i]['transaction-time']
                while(hourDifference <= 24){
                
                }       
            }
       }
       
   };    
    
   return service;
}); 