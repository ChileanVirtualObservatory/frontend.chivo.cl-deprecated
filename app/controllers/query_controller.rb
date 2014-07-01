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
    end 
    
    else if params[:commit] == "plus_position"
      # search for resources
      #@resources
      respond_to do |format|
        format.js { render 'query/simple_cone_search/new_row_to_query_list' }
      end
    end
  end

  
  def imagesearch

    responses = Array.new # => []

    if params[:c1]
      responses << RestClient.get(
        "http://dachs.lirae.cl:5000/alma/sia", {
          params: { 
            POS: "#{params[:ra]},#{params[:dec]}",
            SIZE: params[:size]
          }
        }).html_safe
    end

    if params[:c2]
      responses << RestClient.get(
        "http://irsa.ipac.caltech.edu/ibe/sia/wise/prelim/p3am_cdd", {
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
        
    end
    if params[:commit] == "plus_position"
      # search for resources
      #@resources
      respond_to do |format|
        format.js { render 'query/type_alma/new_row_to_query_list' }
      end

    end

  end
  
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
