class PagesController < ApplicationController

  before_action :authenticate_user!, only: [:make_request]

  def home
  end

  def about
  end

  def make_request
  end

  def prism_dashboard
  end

  def present_data
    @prism_data = PrismObservation.first(500).to_json()
    render json: @prism_data
  end
end
