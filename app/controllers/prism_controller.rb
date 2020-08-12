class PrismController < ApplicationController

  protect_from_forgery with: :null_session
  respond_to :js, :json, :html

  def get_data
    @prism_data = PrismObservation.all.to_json()
    render json: @prism_data
  end

  def get_subset
    @subset = PrismObservation.select("participant_id, household_id, visit_date").where(participant_id: params[:participant_id]).to_json()
    render json: @subset
  end

end
