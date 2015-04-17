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
	$("table#table_query").find(".form-control").hide();
	$("table#table_query").find(".container-input").find(".form-control").show();
	$("table#table_query").find(".container-input").hide();

	

	$("#generated").val("SELECT * FROM table WHERE search_radius='0:10:00'");
	$("#generated").closest(".container-input").slideDown();

	$("#search_radius").val('0:10:00'); /* #search_radio contron form w text by default */
	$("#search_radius").closest(".container-input").slideDown();

	$("table#table_query").find("#flag").children().first().css("border", "none").addClass("icon-color-blue");
	$("table#table_query").find("#flag").click(function (event) {
		event.preventDefault();
		(isTooLtipaCtivated) ? isTooLtipaCtivated = false: isTooLtipaCtivated = true;
		var $divColor = $(this).children().first();
		(isTooLtipaCtivated) ? $divColor.addClass("icon-color-blue"): $divColor.removeClass("icon-color-blue");
	});

	$("table#table_query").find(".form-control").not("#generated").on({
		change: function (event) {
			event.preventDefault();
			$this = $(this);
			var field = $this.attr("name");
			var fieldValue = $this.val()
			var condition = field + "='" + fieldValue + "'";

			var sentece = $("#generated").val();
			var newSentence = "";

			var splitBySpace = sentece.split(" ");
			var amountWords = splitBySpace.length;

			if (amountWords == 4){
				newSentence = "SELECT * FROM table WHERE " + condition;
			}
			else {
				var notAdded = true;
				for (var i = 0; i < splitBySpace.length; i++) {
					var splitByField = splitBySpace[i].split(field);
					if (i == 0){
						newSentence += splitBySpace[i];
						continue;
					}
					else if (i <= 4){
						newSentence+= " ";
						newSentence += splitBySpace[i];
						continue;
					}
					else if (splitByField.length == 2 && fieldValue != ''){
						newSentence += condition;
						notAdded = false;
					}
					else if (splitByField.length == 1){
						newSentence += " ";
						newSentence += splitBySpace[i];
						continue;
					}
				};

				if (notAdded && fieldValue != ''){
					newSentence += " AND " + condition;
				}
				
				splitBySpace = newSentence.split(" ");
				newSentence = "SELECT * FROM table WHERE";
				var count = 0;
				for (var i = 5; i < splitBySpace.length; i++) {
					var actual = splitBySpace[i];
					var prev = splitBySpace[i - 1];
					if (actual == "AND" && prev == "WHERE"){
						
					}
					else if (actual == "AND" && i == splitBySpace.length - 1){

					}
					else if (actual == "AND" && prev == "AND"){

					}
					else if (actual == " " && prev == " "){

					}
					else{

						newSentence += " ";
						newSentence += splitBySpace[i];

					}
				};

			}
			$("#generated").val(newSentence);
		}
	});
	$("#search_radius").val('0:10:00'); /* #search_radio contron form w text by default */
	$("#search_radius").closest(".container-input").slideDown();

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
			else if (id == 'generated'){

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
			else if (id == 'generated'){

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
	
		
	
