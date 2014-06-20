//= require services/type_alma/input_validation
//= require services/type_alma/display_form_input
//= require services/type_alma/multiselect_dropdown


var isTooLtipaCtivated = false; /* var to know if the user activate tooltip */
var isStateInfoActivated = true; /* var to know if the user activate state info */
var delayTime = 300; /* delay time to slide down all the form controls */

$(document).ready(function () {	
	/* hide all the form controls by default */
	$(".tab-v2").css('position', 'absolute').css("width", 1019); /* sol to resizing form */
	$("table#table_query").find(".form-control").not("#search_radius").hide();
	$("table#table_query").find(".container-input").find(".form-control").show();
	$(".container-input").hide();
	$("#search_radius").val('0:10:00'); /* #search_radio contron form w text by default */
	$("#search_radius").closest(".container-input").slideDown();

	//$("table#table_query").find("#flag").children().first().css("border", "none").addClass("icon-color-blue");
	$("table#table_query").find("#flag").children().first().css("border", "none");
	$("table#table_query").find("#flag").click(function (event) {
		(isTooLtipaCtivated) ? isTooLtipaCtivated = false: isTooLtipaCtivated = true;
		var $divColor = $(this).children().first();
		(isTooLtipaCtivated) ? $divColor.addClass("icon-color-blue"): $divColor.removeClass("icon-color-blue");
	});
	$("table#table_query").find("#info_states").children().first().css("border", "none").addClass("icon-color-blue");
	$("table#table_query").find("#info_states").click(function (event) {
		(isStateInfoActivated) ? isStateInfoActivated = false: isStateInfoActivated = true;
		var $divColor = $(this).children().first();
		(isStateInfoActivated) ? $divColor.addClass("icon-color-blue"): $divColor.removeClass("icon-color-blue");
		
		$("#actions_states").slideToggle("fast");
	})
 	/* listener for class name group */
	$("table#table_query").find(".group").on({
		mouseenter: showFormInputs,
		mouseleave: hideFormInputs
	});
	
	$("div[class|='multiselect']").children("div").children("ul").find("input:checkbox").on({change: multiselect });

	/* available only for display */
	var boxes_estate = {"#position":true, "#energy":false, "#time":false, "#polarisation":false,
						"#observation":false, "#proyect":false, "#empty_td":false, "#options":false}
	$.each(boxes_estate, function (k, v) {
		if (!v){
			$td = $("table#table_query").find(k)
			$td.css('background-color', '#FDFDFD');
			$td.find('label').css('color', '#D5D5D5');
			$td.find('h2').css('color', '#C2C2C2');	
		}		
	});
	
	/* by default Observe target on the multiselect is selected 
	$("table#table_query").find(".multiselect-scan-intent")
 		.children("div").children("ul").children("li").find("#observe_target")
 		.click();
	*/
 	$("button[type='reset']").click(function (event) {
 		event.preventDefault();
 		$table = $(this).closest("table");
 		$table.find(".form-control")
 			.not("#search_radius, #band, #polarisation_type, #scan_intent")
 			.val(" ");
 		$table.find("#band, #polarisation_type, #scan_intent")
 			.children().attr("selected", false);

 		$table.find("div[class|='multiselect']")
 			.find("input[type='checkbox']").prop("checked", false);

		$table.find("div[class|='multiselect']")
			.find("button").children("span").remove();

		$table.find("div[class|='multiselect']")
			.find("button").clearQueue().finish()
			.slideUp("fast"); 
			
		$table.find("div[class|='multiselect']").clearQueue().finish()
			.slideUp("fast");
		/* by default Observe target on the multiselect is selected */
		$table.find(".multiselect-scan-intent")
 			.children("div").children("ul").children("li").find("#observe_target")
 			.click();
 	});

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

	/* change the sumbit button to just resolve sesame */
 	$("#source_name_sesame").keydown(function (event) {
 		if (event.keyCode==13) {
    		$(this).closest(".container-input").find("#sesame_search").click();
    	}
    	else {
    		$("#ra_dec").val("");
			$("#ra_dec").closest(".container-input").slideUp();
    	}
 	});

 	/* when is needed sesame resolver */
 	$("#sesame_search").on('click', function (event) {
 		$this = $(this);
 		$ra_dec = $("#ra_dec");
 		$container_input = $(this).closest(".container-input");
		$input = $container_input.find("#source_name_sesame");
		
		$actions_state = $("#actions_states");

 		if (!$input.val()){ /*if is empty cancel the submit*/
 			$actions_state.removeClass(" alert-warning alert-success alert-danger alert-info");
			$actions_state.addClass("alert-danger");
			$actions_state.text(" ");
			$actions_state.append("<strong></strong>");
			$actions_state.find("strong").text("Oh snap!");
			$actions_state.append("empty source name sesame field");
			
 			$ra_dec.val(""); 			
			$ra_dec.closest(".container-input").slideUp();
 			event.preventDefault(); /* cancel submit */
 			return false;
 		}
 		var isAdded = false;
 		$("#query_list").find("td").each(function (event) {
 			if($(this).text() == $input.val()){
 				isAdded = true;
 			}
 		});
 		if (isAdded){
 			$actions_state.removeClass(" alert-warning alert-success alert-danger alert-info");
			$actions_state.addClass("alert-danger");
			$actions_state.text(" ");
			$actions_state.append("<strong></strong>");
			$actions_state.find("strong").text("Oh snap!");
			$actions_state.append("the sesame name source is added");
			event.preventDefault(); /* cancel submit */
 			return false;
 		}
 		$this.find("i").removeClass("fa fa-angle-right fa-lg").addClass("fa fa-spinner fa-spin"); /* change the icon */
 		$input.css('width', "144px");
 	});

 	$("table#table_query").find("#position").on({
		mouseenter: function (event) {
			$this = $(this);
			$this.find("#plus_position").clearQueue().finish()
					.delay(delayTime).show("slow");
		},
		mouseleave: function (event) {
			$this.find("#plus_position").clearQueue().finish().hide();
		}
	});
 	
	$("#plus_position").on("click", function (event) {
		$actions_state = $("#actions_states");		

		$position = $(this).closest("#position");
		$ra_dec = $position.find("#ra_dec");
		$search_radius = $position.find("#search_radius");
		$source_name_sesame = $position.find("#source_name_sesame");

		if ( !$ra_dec.val() ) {
			$actions_state.removeClass(" alert-warning alert-success alert-danger alert-info");
			$actions_state.addClass("alert-danger");
			$actions_state.text(" ");
			$actions_state.append("<strong></strong>");
			$actions_state.find("strong").text("Oh snap!");
			$actions_state.append(" cordinates not added to the query list by empty RA Dec field ");
			return false;
		}
		else if ( !$search_radius.val() ){
			$actions_state.removeClass(" alert-warning alert-success alert-danger alert-info");
			$actions_state.addClass("alert-danger");
			$actions_state.text(" ");
			$actions_state.append("<strong></strong>");
			$actions_state.find("strong").text("Oh snap!");
			$actions_state.append(" cordinates not added to the query list by empty Search Radius field ");
			return false;
		}
		else {
			tr_amount = $("#query_list_table").find("tr").size();
			id = 0;
			if (tr_amount == 1){
				id = tr_amount;
			}
			else {
				id = parseInt($("#query_list_table").find("input[type=checkbox]").last().attr('value')) + 1;	
			}
			$tr = 	$("<tr>" +
						"<td class='selected_td'><input name='checkbox_"+id+"' type='checkbox' value='"+ id +"'></td>" + 
						"<td class='sesame_td'><input name='source_name_sesame_"+id+ "' type='text' class='form-control' value='" + $source_name_sesame.val() + "' style='border:0px;background-color:white;height:20px'/></td>" +
						"<td class='ra_dec_td'><input name='ra_dec_"+id+ "' type='text' class='form-control' value='" + $ra_dec.val() + "' style='border:0px;background-color:white;height:20px'/></td>" +
						"<td class='search_td'><input name='search_radius_"+id+ "' type='text' class='form-control' value='" + $search_radius.val() + "'style='border:0px;background-color:white;height:20px'/></td>" +
						"<td class='resource_td'></td>" + 
						"<td class='action_td'></td>" +					
					"</tr>");
			
			var $div_multiselect_resource = $('<div/>',{
					class: "multiselect-resource",
					mouseenter: function (event) {
						$(this).find("ul").clearQueue().finish().delay(delayTime).slideDown("fast");
					}, 
					mouseleave: function (event) {
						$(this).find("ul").clearQueue().finish().delay(delayTime).slideUp("fast");
					}
				});
			$button_multiselect = $('<button type="button" id="multi_select_resource_button" style="height:20px;" class="form-control">' +            
										'<i class="fa fa-angle-down"></i>' +  
									'</button>' + 
									'<div>' +					    				
										'<ul>' +
											'<li>' +
												'<label for="dachs'+id+'"><input id="dachs'+id+'" name="dachs'+id+'" type="checkbox">Dachs</label>' +
											'</li>' +
										'</ul>' +
									'</div>');
			$div_multiselect_resource.append($button_multiselect);
			var multi_select = $('<select/>',{
					id: 'multi_select_resource'+id,
					class: 'form-control',
					style: 'display:none;',
					multiple: 'multiple',
					name: 'resource_'+id+'[]'
				});
			var option_default = $('<option/>',{
				value:'dachs',
				text: 'Dachs',
				selected: 'selected'
			});
			multi_select.append(option_default);
			var delete_button = $('<a/>',
			    {
			        class: 'btn btn-danger btn-xs',
			        style: 'height:20px',
			        text: '',
			        click: function () {
			        	$(this).closest("tr").remove();
			         }
			    });
			
			var trash_icon = $('<i/>',{class: 'fa fa-trash-o fa-fw '});
			delete_button.prepend(trash_icon);
			$tr.find("td").last().append(delete_button);
			$tr.find("td").last().prev().append(multi_select);
			$tr.find("td").last().prev().append($div_multiselect_resource);
			$("#query_list_table").find("tbody").append($tr);
			$actions_state.removeClass(" alert-warning alert-success alert-danger alert-info");
			$actions_state.addClass("alert-success");
			$actions_state.text(" ");
			$actions_state.append("<strong></strong>");
			$actions_state.find("strong").text("Well done!");
			$actions_state.append(" cordinates added to the query list");
			$ra_dec.val("");
			$ra_dec.closest(".container-input").slideUp();

			$source_name_sesame.val("");
			$source_name_sesame.closest(".container-input").slideUp();
		}
	});

});
	
		
	