class QueryController < ApplicationController
	
	def conesearch
		if params[:commit] == "sesame_search"
			sesame_response = Array.new # => []

			sesame = params[:source_name_sesame].split(" ").join("+")
			sesame_response << RestClient.get("http://cdsweb.u-strasbg.fr/cgi-bin/nph-sesame/-olfx/NSV?" + sesame)

			xml_response = Nokogiri.XML(sesame_response[0])
			ra = xml_response.xpath("//jradeg").children.text
			dec = xml_response.xpath("//jdedeg").children.text

			@ra = ra
			@dec= dec
			
			if ra.empty? || dec.empty?
				@ra = "ERROR"
				@dec= "ERROR"           
			end

			respond_to do |format|
				format.js { render 'query/sesame_resolver'}
			end

		elsif params[:commit] == "process_position_query_list"
			responses_dic = Hash.new
			
			params.delete("utf8")
			params.delete("commit")
			
			last_source_name_sesame = String.new
			last_ra = String.new
			last_dec = String.new
			last_search_radius = String.new

			params.each_with_index {|(key, value), index|
				case index%5
				when 0 # => source name sesame          
					last_source_name_sesame = value
				when 1 # => ra          
					last_ra = value
				when 2 # => dec          
					last_dec = value        
				when 3 # => search_radius          
					last_search_radius = value
				when 4 # => resource          
					
					value.each {|resource|
						short_name = resource.split("_")[0]
						access_url = resource.split("_")[1]    
						sr = last_search_radius.split(":")[0].to_f + last_search_radius.split(":")[1].to_f/60 + last_search_radius.split(":")[2].to_f/3600
						response = RestClient.get(access_url + "RA=" + last_ra + "&DEC=" + last_dec + "&SR=" + sr.to_s)
						if responses_dic[short_name] == nil 
							responses_dic[short_name] = [response]
						else
							responses_dic[short_name] << response
						end
					}
				end # => end case
			}

			responses_dic.each {|key, value|
				responses_dic[key] = gotVotable(value)
			}
			@votables = responses_dic

			respond_to do |format|
				format.js { render 'query/simple_cone_search/result_tab' }
			end
		end # => end process_position_query_list
	end


	def imagesearch
		
		@errors = []
		if params[:commit] == "sesame_search"
			sesame_response = Array.new # => []

			sesame = params[:source_name_sesame].split(" ").join("+")
			sesame_response << RestClient.get("http://cdsweb.u-strasbg.fr/cgi-bin/nph-sesame/-olfx/NSV?" + sesame)

			xml_response = Nokogiri.XML(sesame_response[0])
			ra = xml_response.xpath("//jradeg").children.text
			dec = xml_response.xpath("//jdedeg").children.text

			@ra = ra
			@dec= dec
			
			if ra.empty? || dec.empty?
				@ra = "ERROR"
				@dec= "ERROR"           
			end

			respond_to do |format|
				format.js { render 'query/sesame_resolver'}
			end

		elsif params[:commit] == "Add Query"

			query_url = ""

			params.delete("utf8")
			params.delete("commit")
			params.delete("controller")
			params.delete("action")
			params.delete("query")

			if params[:ra].match(/\A[+-]?\d+?(\.\d+)?\Z/) == nil || params[:ra].to_f() < 0 || params[:ra].to_f() > 360
				@errors << "ra"
			end
			if params[:dec].match(/\A[+-]?\d+?(\.\d+)?\Z/) == nil || params[:dec].to_f() < -90 || params[:dec].to_f() > 90
				@errors << "dec"
			end
			if params[:size].match(/\A[+-]?\d+?(\.\d+)?\Z/) == nil || params[:size].to_f() < 0 || params[:size].to_f() > 8.5
				@errors << "size"
			end

			if @errors == []

				cacheTime = Rails.cache.read("sia_sources_time") 
				tooOld = true
				if cacheTime != nil
					tooOld = Time.now < (cacheTime + 1800)
				end

				if Rails.cache.read("sia_sources") == nil || tooOld == true #=> If there isn't sources on cache or the cache is too old, load them again

					raw_sources = RestClient.get('http://dachs.lirae.cl:80/external/sia')
					sources_url = raw_sources.scan(/accessurl": "(.*?)"/)
					sources_name = raw_sources.scan(/title": "(.*?)"/)

					sources = Hash[sources_name.zip sources_url]

					Rails.cache.write("sia_sources", sources)
					Rails.cache.write("sia_sources_time", Time.now)
					
				end # end unless cache

				url_params = "POS=#{params[:ra]},#{params[:dec]}"
				params.each do |key, value|
					if value == ""
						params.delete(key)
					else key != 'ra' && key != 'dec'
						url_params += "&#{key.upcase}=#{value}"
					end
				end

			end # end if @errors

			@url_params = url_params
			@params = params  

			respond_to do |format|
				format.js { render 'query/simple_image_search/add_query' }
			end

		# end Add Query
		elsif params[:commit] == "Process"

			params.delete("utf8")
			params.delete("commit")
			params.delete("action")

			responses_dic = Hash.new

			url_params = ""
			query_source_url = ""
			query_source_name = ""

			params.each_with_index {|(key, value), index|

				if index%2 == 0
					url_params = value
					next
				end

				value.each do | source | 
					query_source_name = source.split("*@*")[0]
					query_source_url = source.split("*@*")[1]
					response = RestClient.get(query_source_url+url_params)
					if responses_dic[query_source_name] == nil 
						responses_dic[query_source_name] = [response]
					else
						responses_dic[query_source_name] << response
					end
				end
			}

			responses_dic.each do |key, value|
				responses_dic[key] = gotVotable(value)
			end

			@votables = responses_dic

			respond_to do |format|
				format.js { render 'query/simple_image_search/results_panel' }
			end

		# end Process
		else
			respond_to do |format|
				format.html
			end
		end
	end


	def spectralsearch

		@errors = []

		if params[:commit] == "sesame_search"
			sesame_response = Array.new # => []

			sesame = params[:source_name_sesame].split(" ").join("+")
			sesame_response << RestClient.get("http://cdsweb.u-strasbg.fr/cgi-bin/nph-sesame/-olfx/NSV?" + sesame)

			xml_response = Nokogiri.XML(sesame_response[0])
			ra = xml_response.xpath("//jradeg").children.text
			dec = xml_response.xpath("//jdedeg").children.text

			@ra = ra
			@dec= dec
			
			if ra.empty? || dec.empty?
				@ra = "ERROR"
				@dec= "ERROR"           
			end

			respond_to do |format|
				format.js { render 'query/sesame_resolver'}
			end
			
		elsif params[:commit] == "Add Query"

			query_url = ""

			params.delete("utf8")
			params.delete("commit")
			params.delete("controller")
			params.delete("action")
			params.delete("query")

			if params[:ra].match(/\A[+-]?\d+?(\.\d+)?\Z/) == nil || params[:ra].to_f() < 0 || params[:ra].to_f() > 360
				@errors << "ra"
			end
			if params[:dec].match(/\A[+-]?\d+?(\.\d+)?\Z/) == nil || params[:dec].to_f() < -90 || params[:dec].to_f() > 90
				@errors << "dec"
			end
			if params[:size].match(/\A[+-]?\d+?(\.\d+)?\Z/) == nil || params[:size].to_f() < 0 || params[:size].to_f() > 8.5
				@errors << "size"
			end

			if @errors == []

				cacheTime = Rails.cache.read("ssa_sources_time") 
				tooOld = true
				if cacheTime != nil
					tooOld = Time.now < (cacheTime + 1800)
				end

				if Rails.cache.read("ssa_sources") == nil || tooOld == true #=> If there isn't sources on cache or the cache is too old, load them again

					raw_sources = RestClient.get('http://dachs.lirae.cl:80/external/ssa')
					sources_url = raw_sources.scan(/accessurl": "(.*?)"/)
					sources_name = raw_sources.scan(/title": "(.*?)"/)

					sources = Hash[sources_name.zip sources_url]

					Rails.cache.write("ssa_sources", sources)
					Rails.cache.write("ssa_sources_time", Time.now)
					
				end # end unless cache

				url_params = "POS=#{params[:ra]},#{params[:dec]}&SIZE=#{params[:size]}&BAND=#{params[:band]}&TIME=#{params[:time]}&FORMAT=#{params[:format]}"
				params.each do |key, value|
					if value == ""
						params.delete(key)
					elsif key != 'ra' && key != 'dec' && key != 'size' && key != 'band' && key != 'time' && key != 'format'
						url_params += "&#{key.upcase}=#{value}"
					end
				end

			end # end if @errors

			@url_params = url_params
			@params = params  

			respond_to do |format|
				format.js { render 'query/spectral_search/add_query' }
			end

		# end Add Query
		elsif params[:commit] == "Process"

			params.delete("utf8")
			params.delete("commit")
			params.delete("action")

			responses_dic = Hash.new

			url_params = ""
			query_source_url = ""
			query_source_name = ""

			params.each_with_index {|(key, value), index|

				if index%2 == 0
					url_params = value
					next
				end

				value.each do | source | 
					query_source_name = source.split("*@*")[0]
					query_source_url = source.split("*@*")[1]
					response = RestClient.get(query_source_url+url_params)
					if responses_dic[query_source_name] == nil 
						responses_dic[query_source_name] = [response]
					else
						responses_dic[query_source_name] << response
					end
				end
			}

			responses_dic.each do |key, value|
				responses_dic[key] = gotVotable(value)
			end

			@votables = responses_dic

			respond_to do |format|
				format.js { render 'query/spectral_search/results_panel' }
			end

		# end Process
		else
			respond_to do |format|
				format.html
			end
		end
	end
	
	def tablesearch
	end

	def all_searches
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
				format.js { render 'query/type_alma/sesame_resolver' }
			end
		elsif params[:commit] == "plus_position_query_list"
			resources = RestClient.get("http://dachs.lirae.cl/external/scs")
			resources_json = JSON.parse(resources)
			@datas = Array.new

			resources_json.each do |resource|
				hash = Hash.new
				hash["label"] = resource["shortname"]
				hash["value"] = resource["shortname"] + "_" + resource["accessurl"]
				@datas << hash
			end 
			respond_to do |format|
				format.js { render 'query/type_alma/plus_position' }      
			end

		elsif params[:commit] == "process_position_query_list"
			responses_dic = Hash.new
			
			params.delete("utf8")
			params.delete("commit")
			
			last_source_name_sesame = String.new
			last_ra_dec = String.new
			last_search_radius = String.new

			params.each_with_index {|(key, value), index|
				case index%4
				when 0 # => source name sesame          
					last_source_name_sesame = value
				when 1 # => ra_dec          
					last_ra_dec = value
				when 2 # => search_radius          
					last_search_radius = value
				when 3 # => resource          
					ra = last_ra_dec.split(" ")[0]
					dec = last_ra_dec.split(" ")[1]

					value.each {|resource|
						short_name = resource.split("_")[0]
						access_url = resource.split("_")[1]
						response = RestClient.get(access_url + "RA=" + ra + "&DEC=" + dec + "&SR=1000")
						if responses_dic[short_name] == nil 
							responses_dic[short_name] = [response]
						else
							responses_dic[short_name] << response
						end
					}
				end # => end case
			}

			responses_dic.each {|key, value|
				responses_dic[key] = gotVotable(value)
			}
			@votables = responses_dic

			respond_to do |format|
				format.js { render 'query/type_alma/result_tab' }
			end
		end # => end process_position_query_list

	end # => end action all_searches 
	
	def advancesearch
	end

	
	private
	
		def gotVotable(responses)

			result = Nokogiri::XML::Document.new() # => xml doc w/ cero result

			responses.each {|response|

				cat = Nokogiri.XML(response).remove_namespaces!.root
				tabledata = cat.xpath("//TABLEDATA").children

				if result.xpath("//TABLEDATA").empty?
					result = cat
				else
					result.xpath("//TABLEDATA").children.first.add_previous_sibling(tabledata)
				end
			}

			return result.to_xml.html_safe

		end
end
