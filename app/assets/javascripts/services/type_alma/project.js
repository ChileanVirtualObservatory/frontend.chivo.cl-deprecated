var isActiveProject= false
$(document).ready(function () {	

	if (!isActiveProject) {
		$project = $("table#table_query").find("#project")
		$project.css('background-color', '#FDFDFD');
		$project.find('label').css('color', '#D5D5D5');
		$project.find('h2').css('color', '#C2C2C2');
	}
});