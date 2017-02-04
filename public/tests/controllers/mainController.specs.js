describe('Controllers', function(){ 
    beforeEach(module('mainApp'));
    describe('mainController',function(){ 
        var myctrl;
        var scope;
        beforeEach(inject(function($controller, $rootScope){ 
            scope = $rootScope.$new();
            myctrl = $controller('mainController', {
                scope : scope
            });
        }));
        it('Starting page transaction should be All transactions', function(){  
            expect(myctrl.scope.transactionMessage).toBe("All Transactions");
        });
        it('Loading message', function(){  
            expect(myctrl.scope.loadingMessage).toBe("Loading data...");
        });
    });
});