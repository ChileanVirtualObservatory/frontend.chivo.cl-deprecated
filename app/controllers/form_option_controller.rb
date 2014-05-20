class FormOptionController < ApplicationController
	def option1
		# render as html
	end
	def option2
		# render as html 
	end

	def option3
		 
	end

	def alma

		if params[:commit] == "sesame_search"
			sesame_response = Array.new # => []

			sesame = params[:source_name_sesame].split(" ").join("+")
      		sesame_response << RestClient.get("http://cdsweb.u-strasbg.fr/cgi-bin/nph-sesame/-olfx/NSV?" + sesame)

      		xml_response = Nokogiri.XML(sesame_response[0])
      		ra = xml_response.xpath("//jradeg").children.text
      		dec = xml_response.xpath("//jdedeg").children.text

      		@ra_dec = ra + " " + dec
      		
      		if ra.empty? || dec.empty?
      			@ra_dec = "ERROR"      			
      		end

			respond_to do |format|
		    	format.js { render 'sesame_resolver' }
    		end
	    	
      	end

	end

	def alma2


	end

end
