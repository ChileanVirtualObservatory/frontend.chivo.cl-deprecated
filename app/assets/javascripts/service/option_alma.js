
var isTooLtipaCtivated = true; /* var to know if the user activate tooltip */
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
	$("table#table_query").find("#flag").children().first().css("border", "none").addClass("icon-color-blue");
	$("table#table_query").find("#flag").click(function (event) {
		event.preventDefault();
		(isTooLtipaCtivated) ? isTooLtipaCtivated = false: isTooLtipaCtivated = true;
		var $divColor = $(this).children().first();
		(isTooLtipaCtivated) ? $divColor.addClass("icon-color-blue"): $divColor.removeClass("icon-color-blue");
	});
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
				$this.find(".container-input").clearQueue().finish()
					.slideUp("fast");
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

 	/* listener to the source name sesame for resolver*/
 	$("#source_name_sesame").keyup(function (event) {
 		if (!this.value){
 			$(this).closest(".container-input").removeClass("has-error has-success");
 			$(this).closest(".container-input").find("#sesame_search")
 				.removeClass("btn-u btn-u-default btn btn-danger btn-success")
 				.addClass("btn-u btn-u-default");
 			/*
 			$ra_dec = $("#ra_dec");
 			$ra_dec.val("");
 			$("#ra_dec").closest(".container_input").slideUp("fast");
 			*/
 		}
 	})
 	/* when is needed sesame resolver */
 	$("#sesame_search").on('click', function (event) {
 		$this = $(this);
 		$ra_dec = $("#ra_dec");
 		$container_input = $(this).closest(".container-input");
		$input = $container_input.find("#source_name_sesame");

 		if (!$input.val()){ /*if is empty cancel the submit*/
 			$container_input.removeClass("has-error has-success").addClass("has-error"); /* make it visible */
 			$this.removeClass("btn-u btn-u-default btn btn-danger btn-success").addClass("btn btn-danger");
 			$ra_dec.val(" ");
 			event.preventDefault(); /* cancel submit */
 			return false;
 		}
 		$this.find("i").removeClass("fa fa-angle-right fa-lg").addClass("fa fa-spinner fa-spin"); /* change the icon */
 		$input.css('width', "144px");
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
	
		
	