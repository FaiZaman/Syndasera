class PagesController < ApplicationController

  before_action :authenticate_user!, only: [:make_request]

  def home
    @observations = PrismObservation.paginate(page: params[:page])
  end

  def about
  end

  def our_methods
  end

  def make_request
  end

  def prism_dashboard
  end

end
