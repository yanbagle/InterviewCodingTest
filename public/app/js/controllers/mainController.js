'use strict';

var mainApp = angular.module('mainApp',[]);

mainApp.controller('mainController', function(transactionApi,transaction,$scope) {
    
    $scope.data = {};
    $scope.loading = true;
    $scope.loadingMessage = "Loading data...";
    
    transactionApi.getAllTransactions().then(function(res,err){
        if(res){
            $scope.data.response = res;      
            getMonthlySpend(res);
            $scope.loading = false;
        }
        else{
            $scope.loadingMessage = "Error loading transactions. Try refreshing.";
        }
    });
    
    var getMonthlySpend = function(data){ 
        $scope.data.monthlySpend = transaction.getAllTimeSpendByMonthYear(data);
    };
    
});