
//function to change size
function changeSize (event) {
	
	$('.panel').parent().attr("class", 'col-md-' + event.data.panel + ' md-margin-bottom-40 col-md-offset-' + event.data.panelOffset);

	l = 'col-sm-' + event.data.label + ' control-label';
	f = 'col-sm-' + event.data.formControl;

	$('.form-group > label').attr("class", l);
	$('.form-group > div').attr("class", f);
	
	$('.form-group').last().children().first().attr("class", 'col-sm-offset-' + event.data.buttonOffset + ' '+  f);
}

$(document).ready(function () {
	$('#panel_minimun').on('click', {panel: '4', panelOffset: '4', label: '3', formControl: '7', buttonOffset: '3'}, changeSize);
	$('#panel_medium').on('click', {panel: '6', panelOffset: '3', label: '2', formControl: '9', buttonOffset: '2'},  changeSize);
	$('#panel_large').on('click', {panel: '8', panelOffset: '2', label: '1', formControl: '11', buttonOffset: '1'}, changeSize);

	$('#panel_medium').click();
});