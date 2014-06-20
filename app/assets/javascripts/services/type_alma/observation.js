//= require services/type_alma/multiselect_dropdown

var isActiveObservation = false;
$(document).ready(function () {	

	if (!isActiveObservation) {
		$observation = $("table#table_query").find("#observation")
		$observation.css('background-color', '#FDFDFD');
		$observation.find('label').css('color', '#D5D5D5');
		$observation.find('h2').css('color', '#C2C2C2');
	}
	/* check box of multiselect listener to select on the determinated select */
	$(".multiselect-scan-intent").children("div").children("ul").find("input:checkbox").on({change: multiselect});

	/* listener to dropdown-header class of the multiselect ul to click at the determinated checkbox */
	$(".multiselect-scan-intent").children("div").children("ul")
		.find(".dropdown-header").on({

		click: function (event) {
			event.preventDefault();
			if ($(this).text()=='Science'){
				$("#observe_target").click();
			}
			else if ($(this).text()=='Standar Calibration'){
				var amount_checked = 0;
				var amount_checkboxs = 0
				$(this).closest("ul").find("#amplitude, #bandpass, #phase, #pointing")
					.map(function (event) {						
						amount_checkboxs += 1;
						if ($(this).is(':checked')){
							amount_checked += 1;
						}
						else{
							$(this).click();
						}
					});
				if (amount_checked == amount_checkboxs){
					$(this).closest("ul").find("#amplitude, #bandpass, #phase, #pointing")
						.click();
				}
			}
		}
	});
});