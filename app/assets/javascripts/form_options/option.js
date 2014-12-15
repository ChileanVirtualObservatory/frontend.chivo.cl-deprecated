

// if validation fields is activated
var validationState = false;
var tooltipControlLabelColor = 'just red';

var popBoxStatic = true;
var pbColor = 'default';

var multiselect_catalogs = false;

//function that will be listener for checkboxs change
function validateStateCheckBoxs () {
	if (validationState){
		count = 0;
		parent = $('#check_cats');
		parent.removeClass('has-error has-success');

		if ($('#c1').is(':checked')){
			count = count + 1;
		}
		if ($('#c2').is(':checked')){
			count = count + 1;
		}

		if (count == 0){
			parent.addClass('has-error');
		}
		else {
			if (tooltipControlLabelColor == 'red, green and yellow'){
				parent.addClass('has-success');
			}
			
		}

		count = 0;
		parent = $('#check_cats_type1');
		parent.removeClass('has-error has-success');

		if ($('#c1_type1').is(':checked')){
			count = count + 1;
		}
		if ($('#c2_type1').is(':checked')){
			count = count + 1;
		}

		if (count == 0){
			parent.addClass('has-error');
		}
		else {
			if (tooltipControlLabelColor == 'red, green and yellow'){
				parent.addClass('has-success');
			}
			
		}
		count = 0;
		parent = $('#check_cats_type2');
		parent.prev().removeClass('has-error has-success');

		if ($('#c1_type2').is(':checked')){
			count = count + 1;
		}
		if ($('#c2_type2').is(':checked')){
			count = count + 1;
		}

		if (count == 0){
			parent.prev().addClass('has-error');
		}
		else {
			if (tooltipControlLabelColor == 'red, green and yellow'){
				parent.prev().addClass('has-success');
			}			
		}

		count = 0;
		parent = $('#check_cats_type3');
		parent.removeClass('has-error has-success');

		if ($('#c1_type3').is(':checked')){
			count = count + 1;
		}
		if ($('#c2_type3').is(':checked')){
			count = count + 1;
		}

		if (count == 0){
			parent.addClass('has-error');
		}
		else {
			if (tooltipControlLabelColor == 'red, green and yellow'){
				parent.addClass('has-success');
			}			
		}	
	}		
}

//function that will be listener for text field change
function validateStateTextField () {
	if (validationState){
		parent = $(this).parent();
		parent.removeClass('has-error has-success');

    	if (isNaN(this.value)){    		
    		parent.addClass('has-error');
    	}
    	else if (this.value =='') {
    		parent.addClass('has-error');
    	} 
    	else {   		
    		if (tooltipControlLabelColor == 'red, green and yellow'){
				parent.addClass('has-success');
			}
    	}	
	}		
}

var moveLeft = 0;
var moveDown = 0;
//function to display pop box
function popEnable (argument) {
	if (validationState){
		target = $('#' + ($(this).attr('data-popbox')));
		target.removeClass('alert-success alert-warning alert-danger alert-info');

		if (pbColor == 'dependent'){
			if ($(this).hasClass('has-warning') && tooltipControlLabelColor == 'red, green and yellow'){
				target.addClass('alert-warning');
			}
			else if ($(this).hasClass('has-error')){
				target.addClass('alert-danger');
			}	
			else {
				if (tooltipControlLabelColor == 'red, green and yellow'){
					target.addClass('alert-success');
				}
				else if (tooltipControlLabelColor == 'just red'){
					target.addClass('alert-info');
				}				
			}
		}
		else if (pbColor == 'default'){
			target.addClass('alert-info');
		}

		if (popBoxStatic){
			position = $(this).offset();
		    target.css('top', position.top).css('left', position.left + $(this).innerWidth());	
		}
		else { //dinamic
			moveLeft = $(this).innerWidth() / 3;
        	moveDown = target.innerHeight() / 4;
        }
	    target.show();
	}
}

function popEnable_check_cats_type1 (argument) {
	if (validationState){
		target = $('#' + ($(this).attr('data-popbox')));
		target.removeClass('alert-success alert-warning alert-danger alert-info');

		if (pbColor == 'dependent'){
			if ($(this).hasClass('has-warning') && tooltipControlLabelColor == 'red, green and yellow'){
				target.addClass('alert-warning');
			}
			else if ($(this).hasClass('has-error')){
				target.addClass('alert-danger');
			}	
			else {
				if (tooltipControlLabelColor == 'red, green and yellow'){
					target.addClass('alert-success');
				}
				else if (tooltipControlLabelColor == 'just red'){
					target.addClass('alert-info');
				}				
			}
		}
		else if (pbColor == 'default'){
			target.addClass('alert-info');
		}

		if (popBoxStatic){
			position = $(this).offset();
		    target.css('top', position.top).css('left', position.left + $(this).innerWidth());	
		}
		else { //dinamic
			moveLeft = $(this).innerWidth() / 3;
        	moveDown = target.innerHeight() / 4;
        }
	    target.show();
	}
}

function popEnable_check_cats_type2 (argument) {
	if (validationState){
		target = $('#' + ($(this).attr('data-popbox')));
		target.removeClass('alert-success alert-warning alert-danger alert-info');

		if (pbColor == 'dependent'){
			if ($(this).hasClass('has-warning') && tooltipControlLabelColor == 'red, green and yellow'){
				target.addClass('alert-warning');
			}
			else if ($(this).hasClass('has-error')){
				target.addClass('alert-danger');
			}	
			else {
				if (tooltipControlLabelColor == 'red, green and yellow'){
					target.addClass('alert-success');
				}
				else if (tooltipControlLabelColor == 'just red'){
					target.addClass('alert-info');
				}				
			}
		}
		else if (pbColor == 'default'){
			target.addClass('alert-info');
		}

		if (popBoxStatic){
			position = $(this).offset();
		    target.css('top', position.top).css('left', position.left + $(this).innerWidth() + 15);	
		}
		else { //dinamic
			moveLeft = $(this).innerWidth() / 3;
        	moveDown = target.innerHeight() / 4;
        }
	    target.show();
	}
}


function popMove (e) {
	if (validationState && popBoxStatic == false ){
		target = $('#' + ($(this).attr('data-popbox')));
		
		leftD = e.pageX + parseInt(moveLeft);
        maxRight = leftD + target.outerWidth();
        windowLeft = $(window).width() - 10;
        windowRight = 0;
        maxLeft = e.pageX - (parseInt(moveLeft) + target.outerWidth() - 20);
         
        if(maxRight > windowLeft && maxLeft > windowRight)
        {
            leftD = maxLeft;
        }
     
        topD = e.pageY - parseInt(moveDown);
        maxBottom = parseInt(e.pageY + parseInt(moveDown) + 20);
        windowBottom = parseInt(parseInt($(document).scrollTop()) + parseInt($(window).height()));
        maxTop = topD;
        windowTop = parseInt($(document).scrollTop());
        if(maxBottom > windowBottom)
        {
            topD = windowBottom - target.outerHeight() - 20;
        } else if(maxTop < windowTop){
            topD = windowTop + 20;
        }
     
        target.css('top', topD).css('left', leftD);
	}
}

//function to hide pop box
function popDisable (argument) {		   
    var target = '#' + ($(this).attr('data-popbox'));      
    $(target).hide();
}


$(document).ready(function () {

	validationState = true
	//listtener to toggle settings
	$('#form_settings').click( function (event){
		$('#settings').slideToggle();
		$('#info').slideToggle();
	});

	//change the tool tip type
	$("#cl_red__green_and_yellow, #cl_just_red").change( function (event) {
		tooltipControlLabelColor = $(this).attr('value');
		if (validationState){
			$('#form_info').click();
			$('#form_info').click();
		}
		else{
			$('#form_info').click();
		}
	});
	$("#cl_just_red").click();
	
	//change how the popbos is shown
	$("#pb_static, #pb_dinamic").change( function (event) {
		value = $(this).attr('value');
		if (value == 'static'){
			popBoxStatic = true;
		}
		else {
			popBoxStatic = false;
		}
	});

	$("#pb_dinamic").click();

	//change the popbox color
	$("#pb_color_dependent, #pb_color_default").change( function (event) {
		pbColor = $(this).attr('value');
	});

	$("#pb_color_default").click();

	$('#multi_select_test').click(function (event){

		target = $('#check_cats_type2');
		target.css('width', $(this).outerWidth() + 1);
		target.slideToggle(100);
	});

	$('#check_cats_type2').mouseleave(function (event){
		$(this).slideToggle(100);
	});

	$('#select_test').click(function (event){
		target = $('#select_default');
		target.css('width', $(this).outerWidth() + 1);
		target.slideToggle(100);
	});

	function select_default (event) {
		selected = $(this).parent().next().text();
		$('#select_test').find('span').text(selected);
		$('#format_type2').val(selected);
	}

	$('#format_fits, #format_votable, #format_jpg, #format_all, #format_metadata').change(select_default);
	$('#format_fits').click();
	$('#select_type2').hide();
	$('#catalogs_type2, #catalogs_type3').hide();

	$('#select_default_type').click();
	$('#catalogs_input_group_type').click();

	$('#select_default_type').click(function (event) {
		$('#select_type2').hide();
		$('#select_type1').show();
	});

	$('#select_personalized_type').click(function (event) {
		$('#select_type1').hide();
		$('#select_type2').show();
	});

	$('#catalogs_input_group_type').click(function (event) {
		multiselect_catalogs = false;
		$('#catalogs_type2, #catalogs_type3').hide();
		$('#catalogs_type1').show();
	});

	$('#catalogs_multiselect_type').click(function (event) {
		multiselect_catalogs = true;
		$('#catalogs_type1, #catalogs_type3').hide();
		$('#catalogs_type2').show();
	});

	$('#catalogs_default_type').click(function (event) {
		multiselect_catalogs = false;
		$('#catalogs_type1, #catalogs_type2').hide();
		$('#catalogs_type3').show();
	});
	//listeners for validate state
	$('#display_panel').change(function (event){

		if ($(this).is(':checked')){
			$('.panel-body').parent().attr('class', 'margin-bottom-40');
			$('.panel-title').children().first().hide();
		}
		else {
			$('.panel-body').parent().addClass('panel panel-default');
			$('.panel-title').children().first().show();
		}
	});

	//when info in clicked. Show fields states.
	$('#form_info').on('click', function (event){
		if (validationState){
			validationState = false;			
			$('#ra, #dec, #diameter, #sr, #size, #format_type1, #select_test  #data_type').map(function (event){
				$(this).parent().removeClass('has-error has-success has-warning');
			})
			$('#check_cats').removeClass('has-error has-success has-warning');

			$(this).children().removeClass("icon-color-yellow");	

		}
		else{
			validationState = true;			
			$('#ra, #dec, #sr, #size, #diameter').map(validateStateTextField);
			if (tooltipControlLabelColor == 'red, green and yellow'){
				$('#format_type1, #select_test, #data_type, #verbose').parent().addClass('has-warning');
			}
			validateStateCheckBoxs();
			$(this).children().addClass("icon-color-yellow");
		}
	});	

	//listeners for validate state
	$('#ra, #dec, #sr, #size, #diameter').change(validateStateTextField);

	//always warning. Just It will show info about select
	$('#format_type1, #select_test, #verbose, #data_type').change( function (event){
		if (tooltipControlLabelColor == 'red, green and yellow'){
			$(this).parent().addClass('has-warning');
		}
	});	

	$('#c1_type2, #c2_type2').change(function (event){
		if ($(this).is(':checked')){
			id = $(this).parent().next().text();
			n = $('#multi_select_test').children().length
			if (n > 1){
				$('#multi_select_test').find('span').last().append(', ');
			}

			$('#multi_select_test').append($("<span id="+id+">"+id+"</span>"));			
		}
		else{
			id ='#' + $(this).parent().next().text();
			$('#multi_select_test').find(id).remove();

		}
		if (validationState){
			validateStateCheckBoxs();
		}
	});

	//listeners for validate state
	$('#c1_type1, #c1, #c2_type1,  #c2, #c1_type3, #c2_type3').change(validateStateCheckBoxs);

	$('#multi_select_test').parent().parent().mouseleave(function  (event) {
		$('#check_cats_type2').slideUp(150);
		
	});
	$('#select_test').parent().parent().mouseleave(function  (event) {
		$('#select_default').slideUp(150);
	});
	

	//show and hide the pop box for #ra, #dec, #diameter text labels and #format select, form controls
	$('#ra, #source_name_sesame, #file, #dec, #diameter, #format_type1, #data_type, #sr, #size, #verbose').map(function (event){
		$(this).parent().on({
			mouseenter: popEnable,
			mouseleave: popDisable, 
			mousemove: popMove
		});
	});

	$('#select_test').map(function (event){
		$(this).parent().on({
			mouseenter: popEnable_check_cats_type2,
			mouseleave: popDisable, 
			mousemove: popMove
		});
	});

	//show and hide the pop box for #check-cats chech boxes, form controls
	$('#check_cats_type1, #check_cats, #check_cats_type3').on({
			mouseenter: popEnable_check_cats_type1,
			mouseleave: popDisable,
			mousemove: popMove
	});

	//show and hide the pop box for #check-cats chech boxes, form controls
	$('#check_cats_type2').prev().on({
			mouseenter: popEnable_check_cats_type2,
			mouseleave: popDisable,
			mousemove: popMove
	});

	$('#check_cats_type2, #select_default').on({
			mouseenter: function  (event) {
				if (validationState){
					target = $('#' + ($(this).attr('data-popbox')));
					target.removeClass('alert-success alert-warning alert-danger alert-info');

					if (pbColor == 'dependent'){
						if ($(this).prev().hasClass('has-warning') && tooltipControlLabelColor == 'red, green and yellow'){
							target.addClass('alert-warning');
						}
						else if ($(this).prev().hasClass('has-error')){
							target.addClass('alert-danger');
						}	
						else {
							if (tooltipControlLabelColor == 'red, green and yellow'){
								target.addClass('alert-success');
							}
							else if (tooltipControlLabelColor == 'just red'){
								target.addClass('alert-info');
							}				
						}
					}
					else if (pbColor == 'default'){
						target.addClass('alert-info');
					}

					if (popBoxStatic){
						position = $(this).prev().children().offset();
					    target.css('top', position.top).css('left', position.left + $(this).prev().innerWidth() + 15);	
					}
					else { //dinamic
						moveLeft = $(this).prev().innerWidth() / 3;
			        	moveDown = target.innerHeight() / 4;
			        }
				    target.show();
				}
			},
			mouseleave: popDisable,
			mousemove: popMove
	});

	//popbox will not disappear when the mouse is over it
    $('#default').on({
		mouseenter: function (event) {
			$(this).show();
		},
		mouseleave: function (event) {
			$(this).hide();	
		}
	});

	//function to change color
	function changeColor (event) {
		$('.panel').attr("class", event.data.panel);
		$('.form-group').last().find('.btn').attr("class", event.data.button);
		$('.form-group').last().find('.btn-u').attr("class", event.data.button);
	}

	//listeners for change color state
	$('#panel_color_info').on('click', { panel: 'panel panel-info margin-bottom-40', button: 'btn btn-info btn-block'}, changeColor );
	$('#panel_color_default1').on('click', {panel: 'panel panel-default margin-bottom-40', button: 'btn btn-default btn-block'}, changeColor);
	$('#panel_color_default2').on('click', {panel: 'panel panel-grey margin-bottom-40', button: 'btn-u btn-u-default btn-block'}, changeColor);
	$('#panel_color_blue').on('click',  {panel: 'panel panel-blue margin-bottom-40', button: 'btn-u btn-u-blue btn-block'}, changeColor);
	$('#panel_color_green').on('click', {panel: 'panel panel-green margin-bottom-40', button: 'btn-u btn-u-green btn-block'}, changeColor);
	$('#panel_color_sea').on('click', {panel: 'panel panel-sea margin-bottom-40', button: 'btn-u btn-u-sea btn-block'}, changeColor);
	$('#panel_color_orange').on('click', {panel: 'panel panel-orange margin-bottom-40', button: 'btn-u btn-u-orange btn-block'}, changeColor);
	$('#panel_color_red').on('click', {panel: 'panel panel-red margin-bottom-40', button: 'btn-u btn-u-red btn-block'}, changeColor);

	$('#panel_color_default1').click();
});