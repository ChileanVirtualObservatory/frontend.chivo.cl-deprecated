/* 
 * This file is part of ChiVO, the Chilean Virtual Observatory
 * A project sponsored by FONDEF (D11I1060)
 * Copyright (C) 2015 Universidad Tecnica Federico Santa Maria
 *                    Universidad de Chile
 *                    Pontificia Universidad Catolica
 *                    Universidad de Concepcion
 *                    Universidad de Santiago
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


function multiselect () {
	//event.preventDefault();
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
