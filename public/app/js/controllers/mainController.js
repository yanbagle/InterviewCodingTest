'use strict';

var mainApp = angular.module('mainApp',[]);

mainApp.controller('mainController', function(transactionApi,transaction,filterTransactions,$scope) {
    
    $scope.data = {};
    $scope.data.transactionResponse;
    $scope.data.monthlySpend;
    $scope.data.ccPayments;
    $scope.data.avgIncome;
    $scope.data.avgSpend;
    $scope.loading = true;
    $scope.loadingMessage = "Loading data...";
    $scope.transactionMessage = "All Transactions";
    
    //makes request to get all transactions
    transactionApi.getAllTransactions().then(function(res,err){
        if(res){
            $scope.data.transactionResponse = res;      
            $scope.getMonthlySpend(res);
            $scope.loading = false;
        }
    });
    
    //gets and sets avg spend
    var getAvg = function(monthlySpend){
        $scope.data.avgIncome = transaction.getAvgIncome(monthlySpend);
        $scope.data.avgSpend = transaction.getAvgSpend(monthlySpend);
    };
    
    //gets monthly spend info to display on UI
    $scope.getMonthlySpend = function(data){ 
        $scope.data.monthlySpend = transaction.getAllTimeSpendByMonthYear(data);
        getAvg($scope.data.monthlySpend);
        $scope.transactionMessage = "All Transactions";
    };
    
    //gets transactions without donuts transactions
    $scope.showNoDonuts = function(){
        var noDonutsTransactions = filterTransactions.filterByMerchants($scope.data.transactionResponse, ['Krispy Kreme Donuts','Dunkin #336784']);
        $scope.data.monthlySpend = transaction.getAllTimeSpendByMonthYear(noDonutsTransactions);
        getAvg($scope.data.monthlySpend);
        $scope.transactionMessage = "No Donuts";
    };
    
    //get transctions without cc payments
    $scope.showNoCreditPayments = function(){
        var noCCTransactions = filterTransactions.noCreditPayments($scope.data.transactionResponse);
        $scope.data.monthlySpend = transaction.getAllTimeSpendByMonthYear(noCCTransactions);
        getAvg($scope.data.monthlySpend);
        $scope.data.ccPayments = filterTransactions.getCCPayments();
        console.log(JSON.stringify($scope.data.ccPayments,null,2));
        $scope.transactionMessage = "No CC Payments";
    };
    
    
});