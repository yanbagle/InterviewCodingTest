'use strict';

var mainApp = angular.module('mainApp',[]);

mainApp.controller('mainController', function(transactionApi,transaction,$scope) {
    
    $scope.data = {};
    
    transactionApi.getAllTransactions().then(function(res,err){
        if(res){
            $scope.data.response = res;      
            getMonthlySpend(res);
        }
        else{
            //res error handling
        }
    });
    
    var getMonthlySpend = function(data){ 
        $scope.data.monthlySpend = transaction.getAllTimeSpendByMonthYear(data);
        
        for(var i  = 0 ; i < $scope.data.monthlySpend.length; i++){
            console.log($scope.data.monthlySpend[i].year + " " + $scope.data.monthlySpend[i].month + " " + $scope.data.monthlySpend[i].spent + " " + $scope.data.monthlySpend[i].income);
        }
        
    };
    
});