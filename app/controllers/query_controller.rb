class QueryController < ApplicationController
  def index
    
  end

  def conesearch
    @votable = RestClient.get(
      "http://dachs.lirae.cl:5000/alma/scs",
      { 
        params: { 
          ra: params[:ra], 
          dec: params[:dec], 
          sr: params[:sr]}
        }
      }
      ).html_safe

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
