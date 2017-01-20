'use strict';

var mainApp = angular.module('mainApp',[]);

mainApp.controller('mainController', function(transactionApi) {
    transactionApi.getAllTransactions();
});