//= require services/type_alma/multiselect_dropdown

var isActiveEnergy = false;
$(document).ready(function () {	
	/* check box of multiselect listener to select on the determinated select */
	if (!isActiveEnergy) {
		$energy = $("table#table_query").find("#energy")
		$energy.css('background-color', '#FDFDFD');
		$energy.find('label').css('color', '#D5D5D5');
		$energy.find('h2').css('color', '#C2C2C2');
	}
	$(".multiselect-band").children("div").children("ul").find("input:checkbox").on({change: multiselect });
});