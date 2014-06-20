var isActiveEmpty= false
$(document).ready(function () {	

	if (!isActiveEmpty) {
		$empty_td = $("table#table_query").find("#empty_td")
		$empty_td.css('background-color', '#FDFDFD');
		$empty_td.find('label').css('color', '#D5D5D5');
		$empty_td.find('h2').css('color', '#C2C2C2');
	}
});