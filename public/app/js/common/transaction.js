var mainApp = angular.module('mainApp');

mainApp.factory('transaction', function(){
    
    var service = {};
    
    service.getTransactions = function(transactionData){
       var transactions = transactionData.data.transactions;
       var transactionsArray = [];
       var date,year,month,amount,spent,income,spend; 
       for(var i = 0; i < transactions.length; i++) {
           date = transactions[i]['transaction-time'];
           year = getYear(date);
           month = getMonth(date);
           amount = getAmount(transactions[i].amount);
           spent = 0;
           income = 0;
           if(amount < 0){//if amount is spend
               spent = amount * -1;
           }
           else{//if amount is income
               income = amount;
           }
           spend = new Spend(year, month, spent, income);
           transactionsArray[i] = spend;
       }
        return transactionsArray;
    };
    
    service.getSpendAmountBySpecificMonthYear = function(year, month, transactionsArray){
         var current; 
         var totalSpent = 0;
         var totalIncome = 0;
         for(var i = 0; i < transactionsArray.length; i++){
             current = transactionsArray[i];
             if(current.year == year && current.month == month){
                 //need to round up the decimals
                 totalSpent += current.spent;
                 totalIncome += current.income;
                 totalSpent = roundUp(totalSpent,100);
                 totalIncome = roundUp(totalIncome,100);
             }
         }
        return new Spend(year, month, totalSpent, totalIncome);
    };
    
    service.getAllTimeSpendByMonthYear = function(transactionData){
        var transactionsArray = service.getTransactions(transactionData);
        /*
        for(var i  = 0 ; i < transactionsArray.length; i++){
            console.log(transactionsArray[i].year + " " + transactionsArray[i].month + " " + transactionsArray[i].spent + " " + transactionsArray[i].income);
        }
        */
        var currentMonth, currentYear;
        var monthSpendArray = [];
        var spendIndex = 0;
        for(var i = 0; i < transactionsArray.length; i++){
            if(currentMonth != transactionsArray[i].month){
                //set new currentMonth and currentYear
                currentMonth = transactionsArray[i].month;
                currentYear = transactionsArray[i].year;
                monthSpendArray[spendIndex++] = service.getSpendAmountBySpecificMonthYear(currentYear,currentMonth,transactionsArray);
            }
        }
        return monthSpendArray;
    };
    
    var roundUp = function(num, precision) {
        return Math.ceil(num * precision) / precision;
    };
    
    var getYear = function(date){
        return date.substring(0,4);
    };
    
    var getMonth = function(date){
        return date.substring(5,7);
    };
    
    var getAmount = function(amount){
        return amount / 10000;
    };
    
    return service;
    
});