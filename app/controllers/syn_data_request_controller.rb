class SynDataRequestController < ApplicationController

  before_action :authenticate_user!, only: [:new]

  def new
    #@synthetic_request = SynDataRequest.new
  end

  def show
  end

  def create
  end

end
