class PrismController < ApplicationController

  def get_data
    @prism_data = PrismObservation.all.to_json()
    render json: @prism_data
  end

end
