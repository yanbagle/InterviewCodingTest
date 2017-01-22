var mainApp = angular.module("mainApp");
mainApp.factory('filterTransactions', function() {
   var service = {};
   
   var ccPayments;
    
   //used to filter by donuts merchants 
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
    
    
   //find cc payments that have opposite amounts AND are within 24 hours of each other     
   service.noCreditPayments = function(transactionsData){
       var date1,date2;
       var hourDifference = 0;//for keeping track of hour difference between 2 transactions 
       var amount,currentTrans,currIndex;
       var dataCopy = JSON.parse(JSON.stringify(transactionsData));
       var ccPayments = [];//for displaying found cc payments 
       var ccPaymentsIndex = 0;
       for(var i = 0; i < dataCopy.data.transactions.length; i++){
            if(dataCopy.data.transactions[i] !== undefined){
                currentTrans = dataCopy.data.transactions[i];
                //start looking for cc payment starting from 1 ahead of current index
                currIndex = i + 1;
                //saves the date for current transaction
                date1 = new Date(currentTrans['transaction-time']);
                //the negation of the amount is the amount we want to find for cc payment
                matchingAmount = currentTrans.amount * -1;
                while(currIndex < dataCopy.data.transactions.length){
                    currentTrans = dataCopy.data.transactions[currIndex];
                    if(currentTrans !== undefined){
                        date2 = new Date(currentTrans['transaction-time']);
                        hourDifference = Math.abs(date2 - date1) / 36e5;
                        //moving on to match new transactions if difference is greater than 24 hours
                        if(hourDifference > 24){
                            break;
                        }
                        //found a cc payment
                        else if(currentTrans.amount == matchingAmount){
                            ccPayments[ccPaymentsIndex++] = dataCopy.data.transactions[i];
                            ccPayments[ccPaymentsIndex++] = dataCopy.data.transactions[currIndex];
                            delete dataCopy.data.transactions[i];
                            delete dataCopy.data.transactions[currIndex];
                            break;
                        }
                    }
                    currIndex++;
                }       
            }
       }
       setCCPayments(ccPayments);          
       return dataCopy;
       
   };    
    
   var setCCPayments = function(array){
       ccPayments = array;
   }
    
   service.getCCPayments = function(){
       return ccPayments;
   };
    
   return service;
}); 