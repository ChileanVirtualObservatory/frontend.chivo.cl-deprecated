var isActiveOptions= false
$(document).ready(function () {	

	if (!isActiveOptions) {
		$options = $("table#table_query").find("#options")
		$options.css('background-color', '#FDFDFD');
		$options.find('label').css('color', '#D5D5D5');
		$options.find('h2').css('color', '#C2C2C2');
		$options.find('input[type=radio]').attr('disabled', 'true');
	}
});