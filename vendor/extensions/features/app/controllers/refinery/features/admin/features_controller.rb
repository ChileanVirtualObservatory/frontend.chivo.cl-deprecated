module Refinery
  module Features
    module Admin
      class FeaturesController < ::Refinery::AdminController

        crudify :'refinery/features/feature',
                :xhr_paging => true

      end
    end
  end
end
