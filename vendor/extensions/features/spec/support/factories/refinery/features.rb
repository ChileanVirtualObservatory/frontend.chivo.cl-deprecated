
FactoryGirl.define do
  factory :feature, :class => Refinery::Features::Feature do
    sequence(:title) { |n| "refinery#{n}" }
  end
end

