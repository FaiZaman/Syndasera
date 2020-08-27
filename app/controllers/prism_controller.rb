class PrismController < ApplicationController

  protect_from_forgery with: :null_session
  respond_to :js, :json, :html

  def get_data
    @prism_data = PrismObservation.all.to_json()
    render json: @prism_data
  end

  def filter_data
    column = params[:column]
    start = params[:filter]['0']['value']
    final = params[:filter]['1']['value']

    @filtered = PrismObservation.where(column => start..final)
    render json: @filtered
  end

  def get_data_500
    @prism_data = PrismObservation.first(500).to_json()
    render json: @prism_data
  end

  def get_data_1000
    @prism_data = PrismObservation.first(1000).to_json()
    render json: @prism_data
  end

end
