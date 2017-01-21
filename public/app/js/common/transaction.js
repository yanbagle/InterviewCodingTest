var mainApp = angular.module('mainApp');

mainApp.factory('util', function(){
    
    var service = {};
    
    service.getTransactions = function(transactionData){
       var transactions = transactionData.data.transactions;
       var transactionsArray = [];
       var transaction,date,year,month,amount,spent,income,spend; 
       for(var i = 0; i < transactions.length; i++) {
           transaction = transactions[i];
           date = transaction['transaction-time'];
           year = date.substring(0,4);
           month = date.substring(5,7);
           amount = transaction.amount / 10000;
           spent = 0;
           income = 0;
           if(amount < 0){//if amount is spend
               spent = amount;
           }
           else{//if amount is income
               income = amount;
           }
           spend = new Spend(year, month, spent, income);
           transactionsArray[i] = spend;
       }
        return transactionsArray;
    };
    
    service.getSpendAmountByMonthYear = function(year, month, transactionData){
         var transactionsArray = service.getTransactions(transactionData);
         var currentTrans; 
         var totalSpent = 0;
         var totalIncome = 0;
         for(var i = 0; i < transactionsArray.length; i++){
             current = transactionsArray[i];
             if(current.year == year && current.month == month){
                 totalSpent += current.spent;
                 totalIncome += current.income;
             }
         }
        console.log(year + " " + month + " " + totalSpent + " " + totalIncome);
        return new Spend(year, month, totalSpent, totalIncome);
    };
    
    
    
    return service;
    
});