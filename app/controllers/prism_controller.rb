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

  def get_data_500
    @prism_data = PrismObservation.first(500).to_json()
    render json: @prism_data
  end

end
