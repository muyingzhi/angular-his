define(['jquery'], function( ) {

	describe('test:' , function(){
		var x10=2;
		beforeEach(function () {
			var x = 10;

			for(var i=1;i<x;i++){
				x10 = 2*x10;
			}
			console.log(x10);
		});
		it("for Array...." , function(){
			var tmp = jQuery("#showX").text();
			expect(x10).toEqual(1024);
		})
	});
});
