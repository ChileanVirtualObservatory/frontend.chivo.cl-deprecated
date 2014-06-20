$(document).ready(function () {	

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