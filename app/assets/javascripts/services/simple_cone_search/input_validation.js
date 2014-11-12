$(document).ready(function () {	
	/**/
	var typewatch = (function(){
 		var timer = 0;
  		return function(callback, ms){
    	clearTimeout(timer);
    	timer = setTimeout(callback, ms);
  		};  
	})();
	/**/
	function validateQueryFormat(target,re)
	{
		target.closest(".container-input").removeClass('has-error');
		if(!re.test(target.val()) && target.val().length != 0)
 		{
 			target.closest(".container-input").addClass('has-error');
 		}
	} 
 	$("#ra").on("keyup",function (event) {
 		$this = $(this);
 		typewatch(function () {
 		var re=	new RegExp(/^((\+|-)?([0-9]+)(((:[0-5][0-9]:[0-5][0-9]((.([0-9]+))?))|(.([0-9]+)))?))$/);
 		validateQueryFormat($this,re);
 	}, 1000);
 	});
 	$("#dec").on("keyup",function (event) {
 		$this = $(this);
 		typewatch(function () {
 		var re=	new RegExp(/^((\+|-)?([0-9]+)(((:[0-5][0-9]:[0-5][0-9]((.([0-9]+))?))|(.([0-9]+)))?))$/);
 		validateQueryFormat($this,re);
 	}, 1000);
 	});
 	$("#search_radius").on("keyup",function (event) {
 		$this = $(this);
 		typewatch(function () {
 		var re=	new RegExp(/^([0-9]+)(((.([0-9]+))|(:[0-5][0-9]:[0-5][0-9]((.([0-9]+))?)))?)$/);
 		validateQueryFormat($this,re);
 	}, 1000);
 	});
 		
 	

});