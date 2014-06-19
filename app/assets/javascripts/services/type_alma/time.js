
var isActiveTime= false
$(document).ready(function () {	

	if (!isActiveTime) {
		$time = $("table#table_query").find("#time")
		$time.css('background-color', '#FDFDFD');
		$time.find('label').css('color', '#D5D5D5');
		$time.find('h2').css('color', '#C2C2C2');
	}
});