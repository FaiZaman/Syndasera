class SynDataRequest < ApplicationRecord
  belongs_to :user
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :company_name, presence: true
  validates :dataset_name, presence: true
  validates :dataset_type, presence: true
end
