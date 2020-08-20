class SynDataRequestController < ApplicationController

  before_action :authenticate_user!, only: [:make_request]

  def make_request
  end

end
