var mainApp = angular.module('mainApp');

mainApp.factory('transaction', function(){
    
    var service = {};
    var precision = 100;
    
    //returns an array of all the transactions based on API response 
    service.getTransactions = function(transactionData){
       var transactions = transactionData.data.transactions;
       var transactionsArray = [];
       var transactionsArrayIndex = 0;
       var date,year,month,amount,spent,income,merchant,spend; 
       for(var i = 0; i < transactions.length; i++) {
           if(transactions[i] !== undefined){
               date = transactions[i]['transaction-time'];
               year = getYear(date);
               month = getMonth(date);
               amount = getAmount(transactions[i].amount);
               merchant = transactions[i].merchant;
               spent = 0;
               income = 0;
               if(amount < 0){//if amount is spend
                   spent = amount * -1;
               }
               else{//if amount is income
                   income = amount;
               }
               spend = new Spend(year, month, spent, income, merchant);
               transactionsArray[transactionsArrayIndex++] = spend;
           }
       }
        return transactionsArray;
    };
    
    //returns accumulated spend info for a specific month of the year 
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
                 totalSpent = roundUp(totalSpent,precision);
                 totalIncome = roundUp(totalIncome,precision);
             }
         }
        return new Spend(year, month, totalSpent, totalIncome, null);
    };
    
    //returns every months' spend info so far
    service.getAllTimeSpendByMonthYear = function(transactionData){
        var transactionsArray = service.getTransactions(transactionData);
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
    
    service.getAvgIncome = function(monthSpendArray){
        var incomeArr = [];
        for(var i = 0; i < monthSpendArray.length; i++){
            incomeArr[i] = monthSpendArray[i].income;
        }
        return getAverage(incomeArr);
    };
    
    service.getAvgSpend = function(monthSpendArray){
        var spendArr = [];
        for(var i = 0; i < monthSpendArray.length; i++){
            spendArr[i] = monthSpendArray[i].spent;
        }
        return getAverage(spendArr);
    };
    
    var getAverage = function(data){
        var avg = 0;
        var dataPoints = data.length;
        for(var i = 0; i < data.length; i++){
            avg += data[i];    
        }
        avg /= dataPoints;
        return roundUp(avg, precision);
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