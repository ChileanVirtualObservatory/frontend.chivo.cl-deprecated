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
        format.js { render 'query/simple_cone_search/sesame_resolver'}
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
            response = RestClient.get(access_url + "RA=" + last_ra + "&DEC=" + last_dec + "&SR=1000")
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
    
    responses_dic = Hash.new
      
    if params[:commit] == "Process"
      
      params.delete("utf8")
      params.delete("commit")
      params.delete("controller")
      params.delete("action")
      params.delete("query")

      if params[:ra].to_f() < 0 || params[:ra].to_f() > 360
        @ra = "ERROR: Out of range"
      end
      if params[:dec].to_f() < -90 || params[:dec].to_f() > 90
        @dec = "ERROR: Out of range"
      end
      if params[:size].to_f() < 0 || params[:size].to_f() > 8.5
        @size = "ERROR: Out of range"
      end
   
      if params[:c1] and nil
        responses << RestClient.get(
          "http://dachs.lirae.cl:5000/alma/sia", {
            params: { 
              POS: "#{params[:ra]},#{params[:dec]}",
              SIZE: params[:size]
            }
          }).html_safe
      end

      if params[:c2] and nil
        responses << RestClient.get(
          "http://irsa.ipac.caltech.edu/ibe/sia/wise/prelim/p3am_cdd", {
            params: { 
              POS: "#{params[:ra]},#{params[:dec]}",
              SIZE: params[:size]
            }
          }).html_safe
      end
      

    end

    @votable =  gotVotable(responses_dic)
    @params = params  

    respond_to do |format|
      format.html
      format.js { render 'query/simple_image_search/results_panel' }
    end
  end


  def spectralsearch

    responses = Array.new # => []

    if params[:c1]
      responses << RestClient.get(
        "http://dachs.lirae.cl:5000/alma/ssa", {
          params: { 
            POS: "#{params[:ra]},#{params[:dec]}",
            SIZE: params[:size]
          }
        }).html_safe
    end

    if params[:c2]
      responses << RestClient.get(
        "http://wfaudata.roe.ac.uk/6dF-ssap", {
          params: { 
            POS: "#{params[:ra]},#{params[:dec]}",
            SIZE: params[:size]
          }
        }).html_safe
    end

    @votable =  gotVotable(responses)

    respond_to do |format|
      format.html
      format.js
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
