// This file is part of ChiVO, the Chilean Virtual Observatory
// Copyright (C) 2015 Jonathan Antognini Cavieres <jonathan.antognini@gmail.com>
//                    Cesar Parra Moreno <cparra@csrg.cl>
//                    Constanza Soto <constanza.soto.12@sansano.usm.cl>
//                    Jose Miguel Castro <jcastro@csrg.cl>
//                    Marco Salinas <marco.salinas.12@sansano.usm.cl>
//                    Felipe Morales <felipe.moralesm.12@sansano.usm.cl>
//                    Luis E. Arevalo R. <arevalo@luchox.cl>
// 
// This program is free software; you can redistribute it and/or modify 
// it under the terms of the GNU General Public License as published by 
// the Free Software Foundation; either version 2 of the License, or 
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 
// 02110-1301, USA or visit <http://www.gnu.org/licenses/>.


function showFormInputs(event) {
			var $this = $(event.currentTarget);
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
		}
function hideFormInputs(event) {
			var $this = $(event.currentTarget);
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
