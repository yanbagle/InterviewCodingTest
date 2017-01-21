'use strict';

var mainApp = angular.module('mainApp',[]);

mainApp.controller('mainController', function(transactionApi,$scope) {
    
    $scope.data = {};
    
    transactionApi.getAllTransactions().then(function(res,err){
        if(res){
            $scope.data.response = res;        
        }
    });
    
});