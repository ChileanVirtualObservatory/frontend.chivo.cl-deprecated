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


$(document).ready(function () {	
	/**/
	var typewatch = (function(){
 		var timer = 0;
  		return function(callback, ms){
    	clearTimeout(timer);
    	timer = setTimeout(callback, ms);
  		};  
	})();
	/**/
	function validateQueryFormat(target,re)
	{
		target.closest(".container-input").removeClass('has-error');
		if(!re.test(target.val()) && target.val().length != 0)
 		{
 			target.closest(".container-input").addClass('has-error');
 		}
	} 
 	$("#ra").on("keyup",function (event) {
 		$this = $(this);
 		typewatch(function () {
 		var re=	new RegExp(/^((\+|-)?([0-9]+)(((:[0-5][0-9]:[0-5][0-9]((.([0-9]+))?))|(.([0-9]+)))?))$/);
 		validateQueryFormat($this,re);
 	}, 1000);
 	});
 	$("#dec").on("keyup",function (event) {
 		$this = $(this);
 		typewatch(function () {
 		var re=	new RegExp(/^((\+|-)?([0-9]+)(((:[0-5][0-9]:[0-5][0-9]((.([0-9]+))?))|(.([0-9]+)))?))$/);
 		validateQueryFormat($this,re);
 	}, 1000);
 	});
 	$("#search_radius").on("keyup",function (event) {
 		$this = $(this);
 		typewatch(function () {
 		var re=	new RegExp(/^([0-9]+)(((.([0-9]+))|(:[0-5][0-9]:[0-5][0-9]((.([0-9]+))?)))?)$/);
 		validateQueryFormat($this,re);
 	}, 1000);
 	});
 		
 	

});
