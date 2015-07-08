/**
 * Created by muyz on 15/6/27.
 */
define(['jquery','angular','angularMocks','angularRoute',
    'services/HealthDBService',
    'govmanage/govEditController'
], function($) {
    describe('govCtrl.spec:' , function(){
        beforeEach(module("services"));
        describe("services" , function(){
            var hisService;
            beforeEach(inject( function(_HealthDBService_){
                hisService = _HealthDBService_;
            }))
            it("HealthDBService:", function(){
                expect(hisService.httpPostForm).toBeDefined();
            })
        });
        describe('govEditController:',function(){
            var $controller,$scope;
            var $httpBackend;
            beforeEach(module("app.govEdit"));
            beforeEach(inject(function(_$controller_, $rootScope,_$httpBackend_){
                $scope = $rootScope.$new();
                $controller = _$controller_;
                $httpBackend = _$httpBackend_;
            }));

            afterEach(function() {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });
            it ('Controller Init:' , function(){
                $httpBackend.expect("POST", 'getGovList4Tree.do')
                    .respond(200,{list:[{id:"001",text:"省"}]});

                $scope.$apply(function() {
                    ctrl = $controller('govEditController',{ $scope: $scope });
                });

                $httpBackend.flush();

                expect($scope.govTree).toEqual({id:"001",text:"省"});
            });
        })
    });
});