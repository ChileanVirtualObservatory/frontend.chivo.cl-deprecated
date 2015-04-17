/* 
 * This file is part of ChiVO, the Chilean Virtual Observatory
 * A project sponsored by FONDEF (D11I1060)
 * Copyright (C) 2015 
 *      Universidad Tecnica Federico Santa Maria Mauricio Solar
 *                                               Marcelo Mendoza
 *      Universidad de Chile                     Diego Mardones
 *      Pontificia Universidad Catolica          Karim Pichara
 *      Universidad de Concepcion                Ricardo Contreras
 *      Universidad de Santiago                  Victor Parada
 *
 * This program is free software; you can redistribute it and/or modify 
 * it under the terms of the GNU General Public License as published by 
 * the Free Software Foundation; either version 2 of the License, or 
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 
 * 02110-1301, USA or visit <http://www.gnu.org/licenses/>.
*/


//= require services/simple_cone_search/multiselect_dropdown
//= require services/simple_cone_search/input_validation

var isTooLtipaCtivated = false; /* var to know if the user activate tooltip */
var isStateInfoActivated = true; /* var to know if the user activate state info */
var delayTime = 300; /* delay time to slide down all the form controls */

$(document).ready(function () {	
	
	/*
	function showToolTipRightSide() {			
	if (isTooLtipaCtivated){
		var $this = $(this).closest(".group");
		var $popBox = $this.find(".container-tooltip");
		var position = $this.find(".control-label").position();
    	$popBox.css('left', $this.find(".control-label").innerWidth() + position.left- 5 ).css('top', position.top -  $this.find(".control-label").innerHeight());
    	$popBox.clearQueue().finish().delay(delayTime).show();
	}
	}
	*/
	$table_query = $(".panel-body");
	$groups = $table_query.find(".form-group");

	$container_input = $groups.find("col-sm-5");	

		
	/* control form #search_radius with text by default */
	$search_radius = $groups.find("#search_radius");
	$search_radius.val('0:10:00').closest("col-sm-5");

	/*
	$table_query.find("#flag").click(function (event) {
		(isTooLtipaCtivated) ? isTooLtipaCtivated = false: isTooLtipaCtivated = true;
		var $divColor = $(this).children().first();
		(isTooLtipaCtivated) ? $divColor.addClass("icon-color-blue"): $divColor.removeClass("icon-color-blue");
	}).children().first().css("border", "none");
	*/

	$actions_state = $("#actions_states");
	$table_query.find("#info_states").click(function (event) {
		(isStateInfoActivated) ? isStateInfoActivated = false: isStateInfoActivated = true;
		var $divColor = $(this).children().first();
		(isStateInfoActivated) ? $divColor.addClass("icon-color-blue"): $divColor.removeClass("icon-color-blue");
		
		$actions_state.slideToggle("fast");
	}).children().first().css("border", "none").addClass("icon-color-blue");
 	
 	/* listener for class name group */
	$multiselect_class = $groups.find("div[class|='multiselect']");
	$checkboxes_multiple_select = $multiselect_class.children("div").children("ul").find("input:checkbox");
	$checkboxes_multiple_select.on({change: multiselect});

 	$table_query.find("button[type='reset']").click(function (event) {
 		
 		$container_input.find(".form-control").val("");
 		$select_multiple.children().attr("selected", false);

 		$checkboxes_multiple_select.prop("checked", false);
			
		$multiselect_class.clearQueue().finish()
			.slideUp("fast").find("button").clearQueue().finish()
			.slideUp("fast").children("span").remove();
 	});

 	/* listener to dropdown-header class of the multiselect ul to click at the determinated checkbox */

	$sesame_search_button = $groups.find("#sesame_search");
	$ra = $groups.find("#ra");
	$dec=$groups.find("#dec");
	$source_name_sesame = $groups.find("#source_name_sesame");
	/* change the sumbit button to just resolve sesame */
 	$source_name_sesame.keypress(function (event) {
 		if (event.keyCode==13) {
    		$sesame_search_button.click();
    	}
    	else {
    		$ra.val("");
    		$dec.val("");
    	}
 	});

 	function update_action_state (add_class, strong, text) {
 		$actions_state.removeClass("alert-warning alert-success alert-danger alert-info")
 				.addClass(add_class).text("")
 				.append("<strong></strong> " + text)
 				.find("strong").text(strong);
 	}

 	$queryListTable = $("#query_list_table");
 	/* when is needed sesame resolver */
 	$sesame_search_button.on('click', function (event) {
 		$this = $(this);
 		if (!$source_name_sesame.val()){ /*if is empty cancel the submit*/
 						
 			$ra.val("");
 			$dec.val("");
 			event.preventDefault(); /* cancel submit */
 			return false;
 		}
 		//Not used yet!

 		/*
 		var isAdded = false;
 		$queryListTable.find("td").each(function (event) {
 			if($(this).text() == $source_name_sesame.val()){
 				isAdded = true;
 			}
 		});
 		if (isAdded){
 			update_action_state("alert-danger","Oh snap!", "the sesame name source is added");
			event.preventDefault(); //Don't submit
 			return false;
 		}
 		*/
 		//Let the button spin!
 		$this.find("i").removeClass("fa fa-angle-right fa-lg").addClass("fa fa-spinner fa-spin"); 
 	});
	
	//$position = $table_query.find("#position");
	$plus_position = $(document).find("#plus_position");
	$plus_position.parent().clearQueue().finish()
					.delay(delayTime).show("slow");
	/*
 	$groups.on({
		mouseenter: function (event) {
			$this = $(this);
			$this.slideDown("fast", showToolTipRightSide);
		},
		mouseleave: function (event) {
			//$plus_position.parent().clearQueue().finish().delay(delayTime*10).hide("slow");
			if (isTooLtipaCtivated){
			$(this).find(".container-tooltip").clearQueue().finish().hide();
			}	    
		}
	});
*/
 	
	$plus_position.on('click', function (event) {
		if (!$ra.val()) {
			update_action_state("alert-danger","Oh snap!", "cordinates not added to the query list by empty Right Ascension field");
			event.preventDefault(); /* cancel submit */
			return false;
		}
		else if (!$dec.val()) {
			update_action_state("alert-danger","Oh snap!", "cordinates not added to the query list by empty Declination field");
			event.preventDefault(); /* cancel submit */
			return false;
		}
		else if (!$search_radius.val()){
			update_action_state("alert-danger","Oh snap!", "cordinates not added to the query list by empty Search Radius field");
			event.preventDefault(); /* cancel submit */
			return false;
		}
		
	});
	/* add a sesame, ra, dec and sr to the query list"*/
	$plus_position.on('click', function (event) {
		if (!$ra.val()||!$dec.val()) {
			update_action_state("alert-danger","Oh snap!", "cordinates not added to the query list by empty RA Dec field");
			//event.preventDefault(); /* cancel submit */
			return false;
		}
		else if (!$search_radius.val()){
			update_action_state("alert-danger","Oh snap!", "cordinates not added to the query list by empty Search Radius field");
			//event.preventDefault(); /* cancel submit */
			return false;
		}
		/* if all is ok */

		tr_amount = $queryListTable.find("tr").size();
		id = 0;
		if (tr_amount == 1){
			id = tr_amount;
		}
		else {
			id = parseInt($queryListTable.find("tr").last().attr('id')) + 1;	
		}
		$newTR = $("<tr id="+id+">" +
					"<td>"+$source_name_sesame.val()+"<input name='source_name_sesame_"+id+ "' type='text' class='form-control' value='"+$source_name_sesame.val()+"'style='display:none;'/></td>" +
					"<td>"+$ra.val()+"<input name='ra_"+id+"' type='text' class='form-control' value='"+$ra.val()+"'style='display:none;'/></td>" +
					"<td>"+$dec.val()+"<input name='dec_"+id+"' type='text' class='form-control' value='"+$dec.val()+"'style='display:none;'/></td>" +
					"<td>"+$search_radius.val()+"<input name='search_radius_"+id+"' type='text' class='form-control' value='"+$search_radius.val()+"' style='display:none;'/></td>" +
					"<td></td>" + 
					"<td></td>" +					
				"</tr>");

		var multi_select = $('<select/>',{
				id: 'multi_select_resource'+id,
				multiple: 'multiple',
				style: 'float:center',
				name: 'resource_'+id+'[]'
			});

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

		$newTR.find("td").last().append(delete_button)
			.prev().append(multi_select);


		var data = [
			{label: "J/ApJ/473/822", value: "J/ApJ/473/822_http://vizier.u-strasbg.fr/viz-bin/votable/-A?-source=J/ApJ/473/822&"},
		    {label: "J/AJ/136/2050", value: "J/AJ/136/2050_http://vizier.u-strasbg.fr/viz-bin/votable/-A?-source=J/AJ/136/2050&"},
		    {label: "J/AJ/124/601", value: "J/AJ/124/601_http://vizier.u-strasbg.fr/viz-bin/votable/-A?-source=J/AJ/124/601&"},
		    {label: "J/A+A/504/347", value: "J/A+A/504/347_http://vizier.u-strasbg.fr/viz-bin/votable/-A?-source=J/A+A/504/347&"},
		    {label: "J/ApJS/183/214", value: "J/ApJS/183/214_http://vizier.u-strasbg.fr/viz-bin/votable/-A?-source=J/ApJS/183/214&"},
		    {label: "J/AJ/127/2771", value: "J/AJ/127/2771_http://vizier.u-strasbg.fr/viz-bin/votable/-A?-source=J/AJ/127/2771&"},
		    {label: "J/ApJ/732/101", value: "J/ApJ/732/101_http://vizier.u-strasbg.fr/viz-bin/votable/-A?-source=J/ApJ/732/101&"},
		];
		var config = {
			buttonWidth: '400px',
			buttonClass: 'btn btn-default btn-sm',
			includeSelectAllOption: true,
			enableFiltering: true,
			maxHeight: 200,
			checkboxName: '',
			filterPlaceholder: 'Search',
			selectedClass: null,
			onChange: function(option, checked) {	                    
                    var selectedOptions = multi_select.find('option:selected');
						if (selectedOptions.length == 0) {
			        	multi_select.multiselect('select', option.val());
			     	}
	                
	            }
			}
		multi_select.multiselect(config);
		multi_select.multiselect('dataprovider', data);
		multi_select.multiselect('select', "J/ApJ/473/822_http://vizier.u-strasbg.fr/viz-bin/votable/-A?-source=J/ApJ/473/822&");
		$queryListTable.find("tbody").append($newTR);
		$ra.val("");
		$dec.val("");
		$source_name_sesame.val("");
		update_action_state("alert-success", "Well done!", "cordinates added to the query list");
		
	});
	
	$('#process_position_query_list').on('click', function (event) {
		$("#estate_process_query_list").removeClass("fa fa-spinner fa-spin fa-lg").addClass("fa fa-spinner fa-spin fa-lg"); 
	});

});
