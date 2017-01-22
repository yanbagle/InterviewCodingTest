'use strict';

var mainApp = angular.module('mainApp',[]);

mainApp.controller('mainController', function(transactionApi,transaction,filterTransactions,$scope) {
    
    $scope.data = {};
    $scope.data.transactionResponse;
    $scope.data.monthlySpend;
    $scope.data.avgIncome;
    $scope.data.avgSpend;
    $scope.loading = true;
    $scope.loadingMessage = "Loading data...";
    $scope.transactionMessage = "All Transactions";
    
    transactionApi.getAllTransactions().then(function(res,err){
        if(res){
            $scope.data.transactionResponse = res;      
            $scope.getMonthlySpend(res);
            $scope.loading = false;
        }
    });
    
    var getAvg = function(monthlySpend){
        $scope.data.avgIncome = transaction.getAvgIncome(monthlySpend);
        $scope.data.avgSpend = transaction.getAvgSpend(monthlySpend);
    };
    
    $scope.getMonthlySpend = function(data){ 
        $scope.data.monthlySpend = transaction.getAllTimeSpendByMonthYear(data);
        getAvg($scope.data.monthlySpend);
        $scope.transactionMessage = "All Transactions";
    };
    
    $scope.showNoDonuts = function(){
        var noDonutsTransactions = filterTransactions.filterByMerchants($scope.data.transactionResponse, ['Krispy Kreme Donuts','Dunkin #336784']);
        $scope.data.monthlySpend = transaction.getAllTimeSpendByMonthYear(noDonutsTransactions);
        getAvg($scope.data.monthlySpend);
        $scope.transactionMessage = "No Donuts";
    };
    
    $scope.showNoCreditPayments = function(){
        var noCCTransactions = filterTransactions.filterBy($scope.data.transactionResponse, ['CC Payment','Credit Card Payment']);
        $scope.data.monthlySpend = transaction.getAllTimeSpendByMonthYear(noCCTransactions);
        getAvg($scope.data.monthlySpend);
        $scope.transactionMessage = "No CC Payments";
    };
    
    
});