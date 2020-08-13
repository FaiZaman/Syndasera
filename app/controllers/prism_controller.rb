class PrismController < ApplicationController

  protect_from_forgery with: :null_session
  respond_to :js, :json, :html

  def get_data
    @prism_data = PrismObservation.all.to_json()
    render json: @prism_data
  end

  def get_subset
    @subset = PrismObservation.select(params[:cols])
    render json: @subset
  end

end
