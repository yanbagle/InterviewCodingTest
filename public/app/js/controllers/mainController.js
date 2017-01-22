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
    };
    
    $scope.showNoDonuts = function(){
        var noDonutsTransactions = filterTransactions.noDonuts($scope.data.transactionResponse);
        $scope.data.monthlySpend = transaction.getAllTimeSpendByMonthYear(noDonutsTransactions);
        getAvg($scope.data.monthlySpend);
    };
    
    $scope.showNoCreditPayments = function(){
            
    };
    
    
});