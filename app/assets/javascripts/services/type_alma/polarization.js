//= require services/type_alma/multiselect_dropdown
var isActivePolarisation = false
$(document).ready(function () {	

	if (!isActivePolarisation) {
		$polarisation = $("table#table_query").find("#polarisation")
		$polarisation.css('background-color', '#FDFDFD');
		$polarisation.find('label').css('color', '#D5D5D5');
		$polarisation.find('h2').css('color', '#C2C2C2');
	}

	/* check box of multiselect listener to select on the determinated select */
	$(".multiselect-polarisation-type").children("div").children("ul").find("input:checkbox").on({change: multiselect});
});