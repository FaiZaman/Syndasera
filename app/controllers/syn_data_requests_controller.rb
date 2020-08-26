class SynDataRequestsController < ApplicationController

  before_action :authenticate_user!

  def index
    @requests = current_user.syn_data_requests.all
  end

  def show
    @request = SynDataRequest.find(params[:id])
  end

  def new
    @request = SynDataRequest.new
  end

  def create
    @request = current_user.syn_data_requests.create(request_params)
    if @request.save
      redirect_to user_syn_data_request_path(current_user, @request)
    else
      render 'new'
    end
  end

  def destroy
    @request = SynDataRequest.find(params[:id])
    @request.destroy
    redirect_to user_syn_data_requests_path(current_user)
  end

  private
    def request_params
      params.require(:syn_data_request).permit(:first_name, :last_name,
                                                :company_name, :dataset_name, :dataset_type)
    end

end
