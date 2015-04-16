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



//function to change size
function changeSize (event) {
	
	$('.panel').parent().attr("class", 'col-md-' + event.data.panel + ' md-margin-bottom-40 col-md-offset-' + event.data.panelOffset);

	l = 'col-sm-' + event.data.label + ' control-label';
	f = 'col-sm-' + event.data.formControl;

	$('.form-group > label').attr("class", l);
	$('.form-group > div').attr("class", f);
	
	$('.form-group').last().children().first().attr("class", 'col-sm-offset-' + event.data.buttonOffset + ' '+  f);
}

$(document).ready(function () {
	$('#panel_minimun').on('click', {panel: '4', panelOffset: '4', label: '3', formControl: '7', buttonOffset: '3'}, changeSize);
	$('#panel_medium').on('click', {panel: '6', panelOffset: '3', label: '2', formControl: '9', buttonOffset: '2'},  changeSize);
	$('#panel_large').on('click', {panel: '8', panelOffset: '2', label: '1', formControl: '11', buttonOffset: '1'}, changeSize);

	$('#panel_medium').click();
});
