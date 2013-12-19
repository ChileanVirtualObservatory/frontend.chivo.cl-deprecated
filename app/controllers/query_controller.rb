class QueryController < ApplicationController
  
  def conesearch
    
    @votable = RestClient.get(
      "http://dachs.lirae.cl:5000/alma/scs",{ 
        params: { 
          ra: params[:ra], 
          dec: params[:dec], 
          sr: params[:sr]
        }
      }).html_safe

    respond_to do |format|
      format.html
      format.js
    end
    
  end
  
  def imagesearch 
    
    @votable = RestClient.get(
      "http://dachs.lirae.cl:5000/alma/scs",{ 
        params: { 
          POS: "#{params[:ra]},#{params[:dec]}",
          size: params[:size]
        }
      }).html_safe

    respond_to do |format|
      format.html
      format.js
    end
    
  end


  def spectralsearch
    
    @votable = RestClient.get(
      "http://dachs.lirae.cl:5000/alma/ssa",{ 
        params: { 
          pos: "#{params[:ra]},#{params[:dec]}",
          size: params[:diameter],
          # format: params[:formato]
        }
      }).html_safe

      p @votable
      
    respond_to do |format|
      format.html
      format.js
    end
    
  end
  
  def tablesearch
  end
  
  def advancesearch
  end
  
end
