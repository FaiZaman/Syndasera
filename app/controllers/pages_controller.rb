class PagesController < ApplicationController

  before_action :authenticate_user!, only: [:make_request]

  def home
    @observations = PrismObservation.all
  end

  def about
  end

  def make_request
  end

  def prism_dashboard
  end
end
