class PagesController < ApplicationController

  def home
    @observations = PrismObservation.paginate(page: params[:page])
    @prism_dataset = PrismObservation.first(1000).to_json
  end

  def about
  end

  def our_methods
  end

  def prism_dashboard
  end

  def prism_evaluation
  end

end
