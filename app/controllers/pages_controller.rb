class PagesController < ApplicationController

  def home
    @observations = PrismObservation.paginate(page: params[:page])
  end

  def about
  end

  def our_methods
  end

  def prism_dashboard
  end

end
