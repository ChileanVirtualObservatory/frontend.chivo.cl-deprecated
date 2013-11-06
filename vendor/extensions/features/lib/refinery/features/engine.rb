module Refinery
  module Features
    class Engine < Rails::Engine
      extend Refinery::Engine
      isolate_namespace Refinery::Features

      engine_name :refinery_features

      initializer "register refinerycms_features plugin" do
        Refinery::Plugin.register do |plugin|
          plugin.name = "features"
          plugin.url = proc { Refinery::Core::Engine.routes.url_helpers.features_admin_features_path }
          plugin.pathname = root
          plugin.activity = {
            :class_name => :'refinery/features/feature'
          }
          
        end
      end

      config.after_initialize do
        Refinery.register_extension(Refinery::Features)
      end
    end
  end
end
