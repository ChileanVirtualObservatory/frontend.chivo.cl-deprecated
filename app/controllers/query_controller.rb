class QueryController < ApplicationController
  
  def conesearch

    responses = Array.new # => []  

    if params[:c1]
      responses << RestClient.get(
        "http://dachs.lirae.cl:5000/alma/scs", {
          params: {
            RA: params[:ra],
            DEC: params[:dec],
            SR: params[:sr]
            }
      }).html_safe
    end

    if params[:c2]
      responses << RestClient.get(
        "wfaudata.roe.ac.uk/twomass-dsa/DirectCone", {
          params: {
            DSACAT: "TWOMASS",
            DSATAB: "twomass_psc",
            RA: params[:ra], 
            DEC: params[:dec], 
            RADIUS: params[:sr]
          }
      }).html_safe
    end

    @votable =  gotVotable(responses)

    respond_to do |format|
      format.html
      format.js
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
        format.js { render 'all_in_one/sesame_resolver' }
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
