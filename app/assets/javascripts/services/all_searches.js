//= require services/type_alma/input_validation
//= require services/type_alma/position
//= require services/type_alma/observation
//= require services/type_alma/energy
//= require services/type_alma/polarization
//= require services/type_alma/time
//= require services/type_alma/project
//= require services/type_alma/options
//= require services/type_alma/empty


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
		mouseenter: function (event) {
			var $this = $(this);
			var id = $this.children("label").attr("for");
			/* if the mouse is enter on a grupo that have a multiselect */
			if (/* id == 'scan_intent'  || id =='band' */ false){
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
			else if (/*id == 'polarisation_type'*/ false){
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
			else if (/*id == 'release_status' || id == 'result_view'*/ false){
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
				$this.find(".container-input").clearQueue().finish()
					.delay(delayTime).slideDown("fast", showToolTipRightSide);				
			}
			else if (id == 'ra_dec' || id =='source_name_sesame' || id == 'source_name_alma') {
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
			else if (id == 'release_status' || id == 'result_view'){
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

 	

});
	
		
	