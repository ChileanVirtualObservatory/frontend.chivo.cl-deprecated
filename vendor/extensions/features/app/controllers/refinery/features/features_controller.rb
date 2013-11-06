module Refinery
  module Features
    class FeaturesController < ::ApplicationController

      before_filter :find_all_features
      before_filter :find_page

      def index
        # you can use meta fields from your model instead (e.g. browser_title)
        # by swapping @page for @feature in the line below:
        present(@page)
      end

      def show
        @feature = Feature.find(params[:id])

        # you can use meta fields from your model instead (e.g. browser_title)
        # by swapping @page for @feature in the line below:
        present(@page)
      end

    protected

      def find_all_features
        @features = Feature.order('position ASC')
      end

      def find_page
        @page = ::Refinery::Page.where(:link_url => "/features").first
      end

    end
  end
end
