require 'nokogiri'
require 'net/http'
require 'rest_client'

class QueryController < ApplicationController
  def index
    
  end

  def conesearch
    # url = URI.parse('http://dachs.lirae.cl:5000/alma/scs')
    
    # url.query = URI.encode_www_form(params)
    
    # vo = Nokogiri::XML(Net::HTTP.get(url))
    # vos = vo.xpath("//TABLEDATA")
    # logger.debug "DATA: #{vos}"
    
    
    @votable_url_request = "http://dachs.lirae.cl:5000/alma/scs?ra\=#{params[:ra]}&dec\=#{params[:dec]}&sr\=#{params[:radius]}"
    @votable = (RestClient.get @votable_url_request).html_safe
    
    
    
    respond_to do |format|
      format.html
      format.js
    end
    
    
  end
  
  def imagesearch
  end
  
  def spectralsearch
  end
  
  def tablesearch
  end
  
  def advancesearch
  end
  
  
end
