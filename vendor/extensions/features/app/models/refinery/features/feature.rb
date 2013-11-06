module Refinery
  module Features
    class Feature < Refinery::Core::BaseModel
      self.table_name = 'refinery_features'

      attr_accessible :title, :description, :photo_id, :video_url, :position

      validates :title, :presence => true, :uniqueness => true

      belongs_to :photo, :class_name => '::Refinery::Image'
    end
  end
end
