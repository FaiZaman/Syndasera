class SynDataRequestsController < ApplicationController

  before_action :authenticate_user!

  def index
    @requests = current_user.syn_data_requests.all
  end

  def new
    @syn_data_request = SynDataRequest.new
  end

  def show
  end

  def create
    @syn_data_request = current_user.syn_data_requests.create(request_params)
    if @syn_data_request.save
      redirect_to user_syn_data_requests_path(current_user)
    else
      render 'new'
    end
  end

  private
    def request_params
      params.require(:syn_data_request).permit(:first_name, :last_name,
                                                :company_name, :dataset_name, :dataset_type)
    end

end
