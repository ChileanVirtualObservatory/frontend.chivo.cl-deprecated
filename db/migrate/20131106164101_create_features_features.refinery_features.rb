# This migration comes from refinery_features (originally 1)
class CreateFeaturesFeatures < ActiveRecord::Migration

  def up
    create_table :refinery_features do |t|
      t.string :title
      t.text :description
      t.integer :photo_id
      t.string :video_url
      t.integer :position

      t.timestamps
    end

  end

  def down
    if defined?(::Refinery::UserPlugin)
      ::Refinery::UserPlugin.destroy_all({:name => "refinerycms-features"})
    end

    if defined?(::Refinery::Page)
      ::Refinery::Page.delete_all({:link_url => "/features/features"})
    end

    drop_table :refinery_features

  end

end
