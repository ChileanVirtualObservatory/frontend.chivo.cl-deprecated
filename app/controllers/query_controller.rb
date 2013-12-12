require 'nokogiri'
require 'net/http'

class QueryController < ApplicationController
  def index
    
  end

  def conesearch
    url = URI.parse('http://dachs.lirae.cl:5000/alma/scs')
    
    url.query = URI.encode_www_form(params)

    vo = Nokogiri::XML(Net::HTTP.get(url))
    vos = vo.xpath("//TABLEDATA")
    logger.debug "DATA: #{vos}"
  end
end
