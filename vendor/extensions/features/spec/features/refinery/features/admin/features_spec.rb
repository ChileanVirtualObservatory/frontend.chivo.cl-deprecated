# encoding: utf-8
require "spec_helper"

describe Refinery do
  describe "Features" do
    describe "Admin" do
      describe "features" do
        refinery_login_with :refinery_user

        describe "features list" do
          before do
            FactoryGirl.create(:feature, :title => "UniqueTitleOne")
            FactoryGirl.create(:feature, :title => "UniqueTitleTwo")
          end

          it "shows two items" do
            visit refinery.features_admin_features_path
            page.should have_content("UniqueTitleOne")
            page.should have_content("UniqueTitleTwo")
          end
        end

        describe "create" do
          before do
            visit refinery.features_admin_features_path

            click_link "Add New Feature"
          end

          context "valid data" do
            it "should succeed" do
              fill_in "Title", :with => "This is a test of the first string field"
              click_button "Save"

              page.should have_content("'This is a test of the first string field' was successfully added.")
              Refinery::Features::Feature.count.should == 1
            end
          end

          context "invalid data" do
            it "should fail" do
              click_button "Save"

              page.should have_content("Title can't be blank")
              Refinery::Features::Feature.count.should == 0
            end
          end

          context "duplicate" do
            before { FactoryGirl.create(:feature, :title => "UniqueTitle") }

            it "should fail" do
              visit refinery.features_admin_features_path

              click_link "Add New Feature"

              fill_in "Title", :with => "UniqueTitle"
              click_button "Save"

              page.should have_content("There were problems")
              Refinery::Features::Feature.count.should == 1
            end
          end

        end

        describe "edit" do
          before { FactoryGirl.create(:feature, :title => "A title") }

          it "should succeed" do
            visit refinery.features_admin_features_path

            within ".actions" do
              click_link "Edit this feature"
            end

            fill_in "Title", :with => "A different title"
            click_button "Save"

            page.should have_content("'A different title' was successfully updated.")
            page.should have_no_content("A title")
          end
        end

        describe "destroy" do
          before { FactoryGirl.create(:feature, :title => "UniqueTitleOne") }

          it "should succeed" do
            visit refinery.features_admin_features_path

            click_link "Remove this feature forever"

            page.should have_content("'UniqueTitleOne' was successfully removed.")
            Refinery::Features::Feature.count.should == 0
          end
        end

      end
    end
  end
end
