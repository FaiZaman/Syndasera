class SynDataRequestsController < ApplicationController

  before_action :authenticate_user!, only: [:new, :show]

  def index
  end

  def new
    #@synthetic_request = SynDataRequest.new
  end

  def show
  end

  def create
    @syn_data_request = current_user.syn_data_request.create(request_params)
    redirect_to user_path(@user)
  end

  private
    def request_params
      params.require(:syn_data_request).permit(:first_name, :last_name, :company_name, :dataset_type)
    end

end
