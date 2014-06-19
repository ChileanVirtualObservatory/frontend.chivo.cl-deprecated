
var isTooLtipaCtivated = false; /* var to know if the user activate tooltip */
var isStateInfoActivated = true; /* var to know if the user activate state info */
var delayTime = 300; /* delay time to slide down all the form controls */

/* function that make visible the container-tooltip class of an determinated gropu if is activated */
function showToolTipRightSide() {			
	if (isTooLtipaCtivated){
		var $this = $(this).closest(".group");
		var $popBox = $this.find(".container-tooltip");
		var position = $this.find(".control-label").position();
    	$popBox.css('left', $this.find(".control-label").innerWidth() + position.left- 5 ).css('top', position.top -  $this.find(".control-label").innerHeight());
    	$popBox.clearQueue().finish().delay(delayTime).show();
	}
}

function showToolTipLeftSide() {			
	if (isTooLtipaCtivated){
		var $this = $(this).closest(".group");
		var $popBox = $this.find(".container-tooltip");
		var position = $this.find(".control-label").position();
    	$popBox.css('left', - $popBox.innerWidth() + position.left - 1).css('top', position.top -  $this.find(".control-label").innerHeight());
    	$popBox.clearQueue().finish().delay(delayTime).show();
	}
}
$(document).ready(function () {	
	/* hide all the form controls by default */
	$(".tab-v2").css('position', 'absolute').css("width", 1019); /* sol to resizing form */
	$("table#table_query").find(".form-control").not("#search_radius").hide();
	$("table#table_query").find(".container-input").find(".form-control").show();
	$(".container-input").hide();
	$("#search_radius").val('0:10:00'); /* #search_radio contron form w text by default */
	//$("table#table_query").find("#flag").children().first().css("border", "none").addClass("icon-color-blue");
	$("table#table_query").find("#flag").children().first().css("border", "none");
	$("table#table_query").find("#flag").click(function (event) {
		event.preventDefault();
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
		mouseenter: function (event) {
			var $this = $(this);
			var id = $this.children("label").attr("for");
			/* if the mouse is enter on a grupo that have a multiselect */
			if (id == 'scan_intent'  || id =='band'){
				var $multiselectDiv = $this.children("div[class|='multiselect']");
				var $button = $multiselectDiv.children("button");
				var $ul = $multiselectDiv.children("div").children("ul");
				/* if nothing is has been selected then slide down the multiselect container and his child button */
				if ($button.children("span").length == 0){					
					$multiselectDiv
						.clearQueue().finish()
						.slideDown("fast");
					$button
						.clearQueue().finish().delay(delayTime)
						.slideDown("fast");
				}
				/* slide down the options of the multiselect */
				$ul
					.clearQueue().finish().delay(delayTime)
					.slideDown("fast", showToolTipRightSide);
			}
			else if (id == 'polarisation_type'){
				var $multiselectDiv = $this.children("div[class|='multiselect']");
				var $button = $multiselectDiv.children("button");
				var $ul = $multiselectDiv.children("div").children("ul");
				/* if nothing is has been selected then slide down the multiselect container and his child button */
				if ($button.children("span").length == 0){					
					$multiselectDiv
						.clearQueue().finish()
						.slideDown("fast");
					$button
						.clearQueue().finish().delay(delayTime)
						.slideDown("fast");
				}
				/* slide down the options of the multiselect */
				$ul
					.clearQueue().finish().delay(delayTime)
					.slideDown("fast", showToolTipLeftSide);
			}
			/* this form controls are always show. Just show tooltip if is activated */
			else if (id == 'release_status' || id == 'result_view'){
				if (isTooLtipaCtivated){
					var $this = $(this).closest(".group");
					var $popBox = $this.find(".container-tooltip");
					var position = $this.find(".control-label").position();
			    	$popBox.css('left', - $popBox.innerWidth() + position.left ).css('top', position.top -  $this.find(".control-label").innerHeight());
			    	$popBox.clearQueue().finish().delay(delayTime).show();
				}				
			}
			else if (id == 'search_radius'){
				if (isTooLtipaCtivated){
					var $this = $(this).closest(".group");
					var $popBox = $this.find(".container-tooltip");
					var position = $this.find(".control-label").position();
			    	$popBox.css('left', $this.find(".control-label").innerWidth() + position.left- 5 ).css('top', position.top -  $this.find(".control-label").innerHeight());
			    	$popBox.clearQueue().finish().delay(delayTime).show();
				}				
			}
			else {
				/* slide down the form control */
				$this.find(".container-input").clearQueue().finish()
					.delay(delayTime).slideDown("fast", showToolTipRightSide);
			}			
		},
		mouseleave: function (event) {
			var $this = $(this);
			var id = $this.children("label").attr("for");
			
			/* if the mouse is leave on a grupo that have a multiselect */
			if (id == 'scan_intent' || id == 'polarisation_type' || id =='band'){
				var $multiselectDiv = $this.children("div[class|='multiselect']");
				var $button = $multiselectDiv.children("button");
				var $ul = $multiselectDiv.children("div").children("ul");

				/* slide up the options of the multiselect */
				$ul
					.clearQueue().finish()
					.slideUp("fast");

				/* if nothing is has been selected then slide up the multiselect container and his child button */
				if ($button.children("span").length == 0){
					$button
						.clearQueue().finish()
						.slideUp("fast");					
					$multiselectDiv
						.clearQueue().finish().delay(delayTime)
						.slideUp("fast");					
				}
			}
			/* this form controls are hide by default */
			else if (id == 'scan_intent' || id == 'polarisation_type') {
				//nothing to do
			}
			/* this form controls are always show. Just hide tooltip is required but is activated at the end of this func */
			else if (id == 'release_status' || id == 'result_view' || id == 'search_radius'){
				/* hide tooltip will be activated at the end of this func */
			}
			else {
				/* slide up the form control */
				if (!$this.find(".container-input").find("input").val()){
					$this.find(".container-input").clearQueue().finish()
						.slideUp("fast");
				}
			}

			/* hide the tooltip of whatever form control  if is activated*/
			if (isTooLtipaCtivated){
				$this.find(".container-tooltip").clearQueue().finish().hide();
			}	    							
		}
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

	/* check box of multiselect listener to select on the determinated select */
	$(".multiselect-scan-intent, .multiselect-polarisation-type, .multiselect-band")
		.children("div").children("ul").find("input:checkbox").on({

		change: function (event) {
			event.preventDefault();
			var $this = $(this);

			/* multiselect container */
			var $multiselectDiv = $this.closest("div[class|='multiselect']");

			/* select type multiple */
			var $multiselect = $multiselectDiv.prev();

			/* button of the multiselect container */
			var $button = $multiselectDiv.children("button");
			
			var labelText = $this.parent().text();
			var textLength = labelText.split(" ").length;
			if ($this.is(":checked")) {				
				var span;

				/* differentiating between band and scan-intent, polarisation-type multiselect */
				if (textLength > 2){
					/* meaning checkbox of band multiselect */
					span = "<span id=" + labelText.split(" ")[0] + "_" + ">" + labelText.split(" ")[0] + "</span>";
					$multiselect.children("option[value="+ labelText.split(" ")[0] +"]")
						.attr("selected", true);
				}
				else{
					/* meaning checkbox of scan intent or polarisation type multiselect */
					span = "<span id=" + labelText.split(" ")[0] + "_" + ">" + labelText + "</span>";
					$multiselect.children("option[value="+ labelText.split(" ").join("_").toLowerCase() +"]")
						.attr("selected", true);
				}
				if($button.children("span").length == 0)  $button.append($(span));
				else {
					$button.children("span").last().append(", ");
					$button.append($(span));
				}

				/* if is the firs span on the button to make it visible */
				if($button.children("span").length == 1){
					$multiselectDiv
						.clearQueue().finish()
						.slideDown("fast");
					$button
						.clearQueue().finish().delay(delayTime)
						.slideDown("fast");
				}				
			}	
			else{
				/* detele span on button selected */
				$button.children("#" + labelText.split(" ")[0] + "_").remove();
				if ($button.children("span").length == 1){
					/* modify the last span remaining, deletin the comma*/
					var valueToModify = $button.children("span").text().split(",")[0];
					$button.children("#" + valueToModify.split(" ")[0] + "_").remove();

					var spanModified = "<span id=" + valueToModify.split(" ")[0] + "_" + ">" +valueToModify + "</span>";
					$button.append($(spanModified));
				}
				if (textLength > 2){
					/* meaning checkbox of band multiselect */
					$multiselect.children("option[value="+ labelText.split(" ")[0] +"]")
						.attr("selected", false);
				}
				else{
					/* meaning checkbox of scan intent or polarisation type multiselect */
					span = "<span id=" + labelText.split(" ")[0] + "_" + ">" + labelText + "</span>";
					$multiselect.children("option[value="+ labelText.split(" ").join("_").toLowerCase() +"]")
						.attr("selected", false);
				}
			}
		}
	});
	
	/* by default Observe target on the multiselect is selected */
	$("table#table_query").find(".multiselect-scan-intent")
 		.children("div").children("ul").children("li").find("#observe_target")
 		.click();

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

 	/* change the sumbit button */
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

		$position = $(this).closest("#position")
		$ra_dec = $position.find("#ra_dec");
		$search_radius = $position.find("#search_radius");
		$source_name_sesame = $position.find("#source_name_sesame");

		if ( !$ra_dec.val()){
			$actions_state.removeClass(" alert-warning alert-success alert-danger alert-info");
			$actions_state.addClass("alert-danger");
			$actions_state.text(" ");
			$actions_state.append("<strong></strong>");
			$actions_state.find("strong").text("Oh snap!");
			$actions_state.append(" cordinates not added to the query list by empty RA Dec field ");
			return false;
		}
		else if (!$search_radius.val()){
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
				id = tr_amount
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
			delete_button.prepend(trash_icon)
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

	$("#query_list_table").find("tr").on({
		mouseenter: function (event) {
			$(this).find(".multiselect-resource").children("div").children("ul").slideDown()
			//$button = $multiselectDiv.children("button");
			//$ul = $multiselectDiv.children("div").children("ul");
			/* if nothing is has been selected then slide down the multiselect container and his child button */
			/*if ($button.children("span").length == 0){					
				$multiselectDiv
					.clearQueue().finish()
					.slideDown("fast");
				$button
					.clearQueue().finish().delay(delayTime)
					.slideDown("fast");
			}*/
			/* slide down the options of the multiselect */
			//$ul
			//	.clearQueue().finish().delay(delayTime)
			//	.slideDown("fast");
		}
	});

 	/*
	function windowResize () {
		$table = $("table#table_query");
		width = $table.outerWidth(); // 686
		height = $table.outerHeight();
		var trAmount = $table.children("tbody").children("tr").length;
		if (width <= 686 && trAmount == 2){
			$tbody = $table.children("tbody");

			$td1 = $tbody.children("tr").first().children("td").eq(2);
			$td2 = $tbody.children("tr").first().children("td").eq(3);

			$td3 = $tbody.children("tr").last().children("td").eq(2);
			$td4 = $tbody.children("tr").last().children("td").eq(3);

			$tbody.append("<tr></tr>");
			$tr3 = $tbody.find("tr").last();

			$td1.prependTo($tr3);
			$td2.prependTo($tr3);

			$tbody.append("<tr></tr>");
			$tr4 = $tbody.find("tr").last();

			$td3.prependTo($tr4);
			$td4.prependTo($tr4);
		}
		else if (width <= 686 && width > 490 && trAmount == 8){
			$tbody = $table.children("tbody");

			$tr1 = $tbody.find("tr").eq(0);
			$tr2 = $tbody.find("tr").eq(1);

			$tr3 = $tbody.find("tr").eq(2);
			$tr4 = $tbody.find("tr").eq(3);

			$tr5 = $tbody.find("tr").eq(4);
			$tr6 = $tbody.find("tr").eq(5);

			$tr7 = $tbody.find("tr").eq(6);
			$tr8 = $tbody.find("tr").eq(7);

			$td8 = $tr8.children("td").eq(0);
			$td7 = $tr7.children("td").eq(0);
			$td6 = $tr6.children("td").eq(0);
			$td5 = $tr5.children("td").eq(0);

			$td8.appendTo($tr4);
			$td7.appendTo($tr3);

			$td6.appendTo($tr2);
			$td5.appendTo($tr1);

			$tr5.remove();
			$tr6.remove();

			$tr7.remove();
			$tr8.remove();
			
		}
		else if (width >= 906 && trAmount == 4){
			$tbody = $table.children("tbody");

			$td1 = $tbody.children("tr").eq(3).children("td").eq(0);
			$td2 = $tbody.children("tr").eq(3).children("td").eq(1);

			$td3 = $tbody.children("tr").eq(2).children("td").eq(0);
			$td4 = $tbody.children("tr").eq(2).children("td").eq(1);

			$tr1 = $tbody.find("tr").eq(0);
			$tr2 = $tbody.find("tr").eq(1);

			$td2.appendTo($tr2);
			$td1.appendTo($tr2);

			$td4.appendTo($tr1);
			$td3.appendTo($tr1);

			$tbody.children("tr").eq(3).remove();
			$tbody.children("tr").eq(2).remove();
		}
		else if (width < 490 && trAmount == 4 ){
			$tbody = $table.children("tbody");

			$td1 = $tbody.children("tr").eq(0).children("td").eq(1);
			$td2 = $tbody.children("tr").eq(1).children("td").eq(1);

			$td3 = $tbody.children("tr").eq(2).children("td").eq(1);
			$td4 = $tbody.children("tr").eq(3).children("td").eq(1);

			$tbody.append("<tr></tr>");
			$tr5 = $tbody.find("tr").last();
			$td1.prependTo($tr5);

			$tbody.append("<tr></tr>");
			$tr6 = $tbody.find("tr").last();
			$td2.prependTo($tr6);

			$tbody.append("<tr></tr>");
			$tr7 = $tbody.find("tr").last();
			$td3.prependTo($tr7);

			$tbody.append("<tr></tr>");
			$tr8 = $tbody.find("tr").last();
			$td4.prependTo($tr8);
		}			
	}
 	windowResize();
 	$(window).resize(windowResize);
 	*/
});
	
		
	