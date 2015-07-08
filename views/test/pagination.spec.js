/**
 * Created by muyz on 15/6/27.
 */
define(['jquery','angular','angularMocks','angularRoute','directives/burkPagination'], function($ , angular) {

    //describe('just checking', function() {
    //
    //    it('works for app', function() {
    //        expect($).toBeDefined();
    //        expect(1+2).toEquals(3);
    //    });
    //
    //    it('works for moive type', function () {
    //        //expect(movie.type).toEqual('comedy')
    //    });
    //
    //    it('works for movie name', function () {
    //        //expect(movie.name).toEqual('500 days with summer');
    //    });
    //
    //});

    describe('pagination checking' , function(){
        var $scope;
        beforeEach(module("directives"));
        beforeEach(inject(function ($rootScope) {
            $scope = $rootScope;
        }));
        it ('pageitems checking' ,function(){
            expect("1").toEqual("1");
        });
    });
});